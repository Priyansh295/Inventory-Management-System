DELIMITER //
CREATE TRIGGER delete_carts_after_insert
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
  DELETE FROM cart WHERE user_id = NEW.client_id;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS updateOrderParts;
DELIMITER //
CREATE PROCEDURE updateOrderParts(
    IN given_order_id VARCHAR(100),
    IN given_product_id VARCHAR(5),
    IN given_quantity INT
)
BEGIN
    DECLARE Part_ID_var VARCHAR(5);
    DECLARE Number_of_Parts INT;
    DECLARE Total_Quantity INT;
    
    DECLARE done INT DEFAULT 0;
    
    DECLARE cur CURSOR FOR
        SELECT a.Part_id, a.Number_of_Parts FROM assembled_by AS a WHERE a.Product_ID = given_product_id;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;

    AssembledByLoop: LOOP
        FETCH cur INTO Part_ID_var, Number_of_Parts;
        IF done THEN
            LEAVE AssembledByLoop;
        END IF;

        SELECT COUNT(*) INTO Total_Quantity FROM Order_Parts 
        WHERE Order_ID = given_order_id AND Part_ID = Part_ID_var;

        IF Total_Quantity > 0 THEN
            UPDATE Order_Parts
            SET Quantity = (Quantity + (Number_of_Parts*given_quantity))
            WHERE Order_ID = given_order_id AND Part_ID = Part_ID_var;
        ELSE
            INSERT INTO Order_Parts (Order_ID, Part_ID, Quantity, Timestamp_, Status)
            VALUES (given_order_id, Part_ID_var, Number_of_Parts*given_quantity, NOW(), '0');
        END IF;
    END LOOP;

    CLOSE cur;
    -- CALL checkOrderParts(given_order_id, given_product_id);
END; //
DELIMITER ;


DELIMITER //

CREATE PROCEDURE  ProcessOrderPart(
    IN given_order_id VARCHAR(100),
    IN given_part_id VARCHAR(5),
    IN given_quantity INT
)
BEGIN
    DECLARE Storage_Quantity INT;
    DECLARE Supplier_Quantity INT;

    DECLARE Supplier_Status_var enum('In Progress','Shipped','Complete','Cancelled');
    DECLARE Supplier_ID_var VARCHAR(5);
    DECLARE Supplier_Date_Time_var TIMESTAMP;

    -- Check if quantity is present in storage
    SELECT Quantity INTO Storage_Quantity
    FROM Storage
    WHERE Part_ID = given_part_id;

    IF Storage_Quantity >= given_quantity THEN
        -- Update storage table quantity
        UPDATE Storage
        SET Quantity = Quantity - given_quantity
        WHERE Part_ID = given_part_id;

        -- Update status in Order_Parts
        UPDATE Order_Parts
        SET Status = '1' WHERE Order_ID = given_order_id AND Part_ID = given_part_id;
    ELSE
        -- Quantity is insufficient, insert entry into supplier_orders table
        SELECT Supplier_ID, CURRENT_TIMESTAMP(), 'In Progress', given_quantity
        INTO Supplier_ID_var, Supplier_Date_Time_var, Supplier_Status_var, Supplier_Quantity
        FROM Supplier
        WHERE Part_ID = given_part_id;

        -- Insert entry into supplier_orders table
        INSERT INTO supplier_orders (Supplier_id, date_time, Status, Quantity)
        VALUES (Supplier_ID_var, Supplier_Date_Time_var, Supplier_Status_var, Supplier_Quantity);
    END IF;
END //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE ProcessOrderParts(
    IN given_order_id VARCHAR(100)
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE part_id_var VARCHAR(5);
    DECLARE quantity_var INT;
    DECLARE cur CURSOR FOR
        SELECT Part_id, Quantity
        FROM Order_Parts
        WHERE Order_ID = given_order_id
    ORDER BY Part_ID;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO part_id_var, quantity_var;
        IF done THEN
            LEAVE read_loop;
        END IF;
        CALL ProcessOrderPart(given_order_id, part_id_var, quantity_var);
    END LOOP;

    CLOSE cur;
END //
DELIMITER ;

-- Create the trigger
DROP TRIGGER IF EXISTS checkQuantity;
DELIMITER //
CREATE TRIGGER checkQuantity
AFTER INSERT
ON Order_Line
FOR EACH ROW
BEGIN
    CALL updateOrderParts(NEW.Order_ID, NEW.Product_ID, NEW.Quantity);
END //
DELIMITER ;

DROP FUNCTION IF EXISTS AllRowsComplete;
DELIMITER //
CREATE FUNCTION AllRowsComplete(orderID VARCHAR(100)) RETURNS INT
DETERMINISTIC
BEGIN
	DECLARE Not_Complete INT DEFAULT 0;
	SELECT COUNT(*) INTO Not_Complete FROM Order_Parts WHERE Order_ID = order_ID AND Status = '0';
	RETURN Not_Complete;
END //
DELIMITER ;

SELECT COUNT(*) FROM Order_Parts WHERE Order_ID = 'C0001_2023-11-17T12:19:04.000Z' AND Status = '0';

DROP TRIGGER IF EXISTS checkOrderStatus;
DELIMITER //
CREATE TRIGGER checkOrderStatus
AFTER UPDATE
ON Order_Parts
FOR EACH ROW
BEGIN
    DECLARE Order_ID_var VARCHAR(100);
    IF NEW.Status = '1' AND OLD.Status <> '1' THEN
        SELECT NEW.Order_ID INTO Order_ID_var;

        IF AllRowsComplete(Order_ID_var) = 0 THEN
            UPDATE Orders
            SET Status = 'Complete'
            WHERE Order_ID = Order_ID_var;
        END IF;
    END IF;
END //
DELIMITER ;

DROP TRIGGER IF EXISTS checkThreshold;
DELIMITER //
CREATE TRIGGER checkThreshold
AFTER UPDATE
ON Storage
FOR EACH ROW
BEGIN
    DECLARE Part_ID_var VARCHAR(5);
    DECLARE Supplier_ID_var VARCHAR(5);
    DECLARE OrderPartsID_var VARCHAR(100);

    SELECT NEW.Part_ID INTO Part_ID_var;
    IF NEW.Quantity < OLD.Quantity THEN
        IF NEW.Quantity < NEW.Threshold THEN
            SELECT Supplier_ID INTO Supplier_ID_var
            FROM Supplier
            WHERE Supplier.Part_ID = Part_ID_var;

            INSERT INTO Supplier_Orders VALUES (Supplier_ID_var, CURRENT_TIMESTAMP(), 
            'In Progress', NEW.Threshold * 2);
        END IF;
    END IF;
END //
DELIMITER ;


DROP TRIGGER IF EXISTS updateStorageQuantity;
DELIMITER //
CREATE TRIGGER updateStorageQuantity
AFTER UPDATE
ON Supplier_Orders
FOR EACH ROW
BEGIN
    DECLARE Part_ID_var VARCHAR(5);
    DECLARE newQuantity INT;
    DECLARE OrderID_var VARCHAR(100);
    DECLARE Part_Quantity INT;

    SELECT Part_ID INTO Part_ID_var FROM Supplier WHERE Supplier_ID = NEW.Supplier_ID;
    SELECT NEW.Quantity INTO newQuantity;

    IF NEW.Status LIKE 'Complete' THEN
        SELECT Order_ID INTO OrderID_var FROM Order_Parts op WHERE Part_ID = Part_ID_var AND op.Status = '0' ORDER BY Timestamp_ LIMIT 1;
        SELECT Quantity INTO Part_Quantity FROM Order_Parts op WHERE Order_ID = OrderID_var AND Part_ID = Part_ID_var;
        -- SELECT Quantity INTO Part_Quantity
        -- FROM Order_Parts WHERE Part_ID = Part_ID_var AND Status = '0' ORDER BY Timestamp_ LIMIT 1;

        IF (Part_Quantity <= newQuantity) THEN
            UPDATE Order_Parts SET Status = '1' WHERE Order_ID = OrderID_var AND Part_ID = Part_ID_var;
            SELECT  (newQuantity - Part_Quantity) INTO newQuantity ;
        END IF;
        UPDATE Storage SET Quantity = Quantity + newQuantity WHERE Part_ID = Part_ID_var;

    END IF;

END //
DELIMITER ;