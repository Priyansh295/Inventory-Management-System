SHOW DATABASES;
DROP DATABASE IF EXISTS Inventory_DB;
CREATE DATABASE IF NOT EXISTS Inventory_DB;
USE Inventory_DB;

CREATE TABLE Client(
    Client_ID VARCHAR(5),
    Client_Name VARCHAR(20) NOT NULL,
    Email TEXT NOT NULL,
    phone_no DECIMAL(10, 0) NOT NULL,
    City VARCHAR(20),
    PINCODE DECIMAL(6, 0),
    Building TEXT,
    Floor_no INT,
    Password_client TEXT,
    PRIMARY KEY(Client_ID)
);

CREATE TABLE Orders(
    Order_ID int auto_increment,
    Client_ID VARCHAR(5),
    Total_Payment DECIMAL(10, 2),
    Due_Date DATE,
    Order_Placement_Date DATE,
    Status ENUM("In Progress", "Shipped", "Complete", "Cancelled"),
    PRIMARY KEY(Order_ID)
);

CREATE TABLE Order_Line(
    Order_ID VARCHAR(5),
    Product_ID VARCHAR(5),
    Status ENUM("In progress", "Done"),
    Quantity INT,
    PRIMARY KEY(Order_ID, Product_ID)
);

CREATE TABLE Product(
    Product_ID VARCHAR(5),
    Product_Name TEXT,
    Product_Description TEXT,
    Category VARCHAR(10),
    Price Decimal(10, 2),
    Image TEXT,
    PRIMARY KEY (Product_ID)
);

CREATE TABLE EMPLOYEE(
	Employee_Id VARCHAR(5),
    Employee_Name VARCHAR(25),
    Phone_no DECIMAL(10,0),
    Address  VARCHAR(50),
    Password_employee TEXT,
    PRIMARY KEY(Employee_Id)
);

CREATE TABLE ASSEMBLED_BY(
	Product_Id VARCHAR(5),
    Part_id VARCHAR(5),
    Employee_id VARCHAR(5),
    Number_of_Parts INT,
    PRIMARY KEY(Product_Id,Part_id,Employee_id)
);

CREATE TABLE PART(
	Part_id VARCHAR(5),
    Part_name VARCHAR(25),
    Weight DECIMAL(12,2),
	PRIMARY KEY(Part_id)
);

CREATE TABLE RESTOCK_DETAILS(
	Store_Id VARCHAR(5),
    Employee_Id VARCHAR(5),
    Supplier_Id VARCHAR(5),
    Restock_time timestamp,
    PRIMARY KEY(Store_id,Employee_id,Supplier_id)
);

CREATE TABLE SUPPLIER(
	Supplier_id VARCHAR(5),
    Supplier_name VARCHAR(25),
    Quantity INT,
    Email TEXT,
    Phone_no DECIMAL(10,0),
    Address VARCHAR(50),
    PRIMARY KEY(Supplier_id)
);

CREATE TABLE STORAGE(
	Store_id VARCHAR(5),
    Part_id VARCHAR(5),
    Quantity INT,
    Rack_no INT,
    Block_no VARCHAR(3),
    Threshold INT,
    PRIMARY KEY(Store_id)
);

ALTER TABLE Orders ADD CONSTRAINT fk_order_client
FOREIGN KEY(Client_ID) REFERENCES Client(Client_ID);

ALTER TABLE Order_Line ADD CONSTRAINT fk_ol_order
FOREIGN KEY(Order_ID) REFERENCES Orders(Order_ID),
ADD CONSTRAINT fk_ol_product FOREIGN KEY(Product_ID)
REFERENCES Product(Product_ID);

ALTER TABLE Assembled_By ADD CONSTRAINT fk_as_emp
FOREIGN KEY(Employee_ID) REFERENCES Employee(Employee_ID),
ADD CONSTRAINT fk_as_product FOREIGN KEY(Product_ID)
REFERENCES Product(Product_ID),
ADD CONSTRAINT fk_as_part FOREIGN KEY(Part_ID)
REFERENCES Part(Part_ID);

ALTER TABLE Restock_Details ADD CONSTRAINT fk_re_emp
FOREIGN KEY(Employee_ID) REFERENCES Employee(Employee_ID),
ADD CONSTRAINT fk_re_supplier FOREIGN KEY(Supplier_ID)
REFERENCES Supplier(Supplier_ID),
ADD CONSTRAINT fk_as_store FOREIGN KEY(Store_ID)
REFERENCES Storage(Store_ID);

ALTER TABLE Storage ADD CONSTRAINT fk_store_part FOREIGN KEY(Part_ID)
REFERENCES Part(Part_ID);

-- Insert 10 rows into the Product table with car brand names and prices in INR
INSERT INTO Product (Product_ID, Product_Name, Product_Description, Category, Price,Image)
VALUES
    ('P0001', 'Toyota Camry', 'The Toyota Camry, a renowned car model, is the perfect blend of style and performance. This car offers a comfortable and efficient driving experience for those seeking both luxury and reliability.', 'Car', 1825000.00,'toyota-camry.jpeg'),
	('P0002', 'Ford F-150', 'The Ford F-150, is built to handle tough tasks with ease. Its robust build and powerful performance make it the ideal choice for work and adventure enthusiasts who require a dependable and rugged vehicle.', 'Truck', 2555000.00,'ford-150.jpeg');
--     ('P0003', 'Honda Civic', 'The Honda Civic, a classic car model, is synonymous with reliability and efficiency.Known for its fuel economy and sleek design, this car is a top pick for those who value practicality and style on the road.', 'Car', 1460000.00), 
--     ('P0004', 'Chevrolet Silverado', 'The Chevrolet Silverado, a versatile truck model, is designed to tackle heavy-duty jobs with finesse.With its strong performance and spacious interior, this truck is perfect for individuals who demand power and comfort.', 'Truck', 2190000.00),
--     ('P0005', 'BMW 3 Series', 'The BMW 3 Series, a luxury car model, exemplifies sophistication and performance.Featuring cutting-edge technology and a refined interior, this car caters to drivers who seek a premium driving experience with a touch of elegance.', 'Car', 2920000.00),
--     ('P0006', 'Dodge Ram', 'The Dodge Ram, a rugged truck model, is built for those who crave adventure and capability. With its aggressive design and off-road prowess, this truck is the ultimate choice for outdoor enthusiasts and thrill-seekers.', 'Truck', 2336000.00),  
--     ('P0007', 'Nissan Altima', 'The Nissan Altima, a stylish car model, offers a perfect balance of affordability and features.Its comfortable interior and advanced technology make it an excellent option for those in search of a well-rounded daily driver.', 'Car', 1606000.00), 
--     ('P0008', 'GMC Sierra', 'The GMC Sierra, a dependable truck model, is engineered for heavy lifting and durability.Its spacious cabin and innovative technology cater to those who need a reliable work companion and an elevated driving experience.', 'Truck', 2263000.00), 
--     ('P0009', 'Audi A4', 'The Audi A4, a luxury car model, defines opulence and performance.With its premium materials and cutting-edge features, this car caters to discerning drivers who demand the best in both aesthetics and technology.', 'Car', 3066000.00), 
--     ('P0010', 'Jeep Wrangler', 'The Jeep Wrangler, an iconic SUV model, is designed for off-road adventures and exploration.With its rugged build and open-air driving experience, this SUV is the top choice for outdoor enthusiasts and nature lovers.', 'SUV', 2117000.00); 
    
    
INSERT INTO Part (Part_id, Part_name, Weight) VALUES
    ('P1', 'Engine', 300.0),
    ('P2', 'Transmission', 150.0),
    ('P3', 'Brake System', 75.0),
    ('P4', 'Suspension System', 80.0),
    ('P5', 'Exhaust System', 50.0),
    ('P6', 'Air Conditioning Unit', 40.0),
    ('P7', 'Steering Wheel', 20.0),
    ('P8', 'Tire Set', 90.0),
    ('P9', 'Car Battery', 30.0),
    ('P10', 'Radiator', 60.0);

INSERT INTO EMPLOYEE (Employee_Id, Employee_Name, Phone_no, Address, Password_Employee)
VALUES
('E0001', 'John Smith', 1234567890, '123 Main Street', 'password1'),
('E0002', 'Jane Doe', 0987654321, '456 Elm Street', 'password2'),
('E0003', 'Peter Jones', 3334445555, '789 Oak Street', 'password3'),
('E0004', 'Mary Brown', 2225556666, '1011 Maple Avenue', 'password4'),
('E0005', 'David Williams', 6667778888, '1213 Pine Street', 'password5'),
('E0006', 'Sarah Miller', 5554443333, '1415 Beach Avenue', 'password6'),
('E0007', 'Michael Anderson', 4443332222, '1617 Park Avenue', 'password7'),
('E0008', 'Susan Taylor', 7778881111, '1819 Elm Street', 'password8'),
('E0009', 'James Johnson', 8889990000, '2021 Oak Street', 'password9'),
('E0010', 'Elizabeth Thomas', 9990001111, '2223 Maple Avenue', 'password10');


INSERT INTO STORAGE (Store_id, Part_id, Quantity, Rack_no, Block_no, Threshold)
VALUES
('S0001', 'P1', 50, 1, 'A', 25),
('S0002', 'P2', 40, 2, 'B', 20),
('S0003', 'P3', 60, 3, 'C', 30),
('S0004', 'P4', 70, 4, 'D', 35),
('S0005', 'P5', 30, 5, 'E', 15),
('S0006', 'P6', 20, 6, 'F', 10),
('S0007', 'P7', 80, 7, 'G', 40),
('S0008', 'P8', 90, 8, 'H', 45),
('S0009', 'P9', 100, 9, 'I', 50),
('S0010', 'P10', 110, 10, 'J', 55);

INSERT INTO SUPPLIER (Supplier_id, Supplier_name, Quantity, Email, Phone_no, Address)
VALUES
('S0001', 'ABC Supplier Inc.', 100, 'supplier1@email.com', 1234567890, '123 Main Street'),
('S0002', 'XYZ Supplies', 150, 'supplier2@email.com', 0987654321, '456 Elm Street'),
('S0003', 'Reliable Parts', 200, 'supplier3@email.com', 3334445555, '789 Oak Street'),
('S0004', 'Quality Components', 250, 'supplier4@email.com', 2225556666, '1011 Maple Avenue'),
('S0005', 'Premier Distributors', 300, 'supplier5@email.com', 6667778888, '1213 Pine Street'),
('S0006', 'Fast Supply', 350, 'supplier6@email.com', 5554443333, '1415 Beach Avenue'),
('S0007', 'Efficient Logistics', 400, 'supplier7@email.com', 4443332222, '1617 Park Avenue'),
('S0008', 'Reliable Sourcing', 450, 'supplier8@email.com', 7778881111, '1819 Elm Street'),
('S0009', 'Global Suppliers', 500, 'supplier9@email.com', 8889990000, '2021 Oak Street'),
('S0010', 'Trusted Partners', 550, 'supplier10@email.com', 9990001111, '2223 Maple Avenue');

INSERT INTO CLIENT (Client_ID, Client_Name, Email, phone_no, City, PINCODE, Building, Floor_no, password_client)
VALUES
('C0001', 'John Smith', 'john.smith@email.com', 1234567890, 'Bangalore', 560016, 'ABC Apartments', 2, 'password1'),
('C0002', 'Jane Doe', 'jane.doe@email.com', 0987654321, 'Mumbai', 400001, 'XYZ Towers', 5, 'password2'),
('C0003', 'Peter Jones', 'peter.jones@email.com', 3334445555, 'Chennai', 600001, 'PQR Residency', 3, 'password3'),
('C0004', 'Mary Brown', 'mary.brown@email.com', 2225556666, 'Delhi', 110001, 'LMN Apartments', 1, 'password4'),
('C0005', 'David Williams', 'david.williams@email.com', 6667778888, 'Hyderabad', 500001, 'JKL Towers', 7, 'password5'),
('C0006', 'Sarah Miller', 'sarah.miller@email.com', 5554443333, 'Ahmedabad', 380001, 'GHI Residency', 4, 'password6'),
('C0007', 'Michael Anderson', 'michael.anderson@email.com', 4443332222, 'Pune', 411001, 'DEF Apartments', 6, 'password7'),
('C0008', 'Susan Taylor', 'susan.taylor@email.com', 7778881111, 'Surat', 395001, 'CDE Towers', 2, 'password8'),
('C0009', 'James Johnson', 'james.johnson@email.com', 8889990000, 'Jaipur', 302001, 'BCA Residency', 1, 'password9'),
('C0010', 'Elizabeth Thomas', 'elizabeth.thomas@email.com', 9990001111, 'Kanpur', 208001, 'ABB Apartments', 3, 'password10');

create table cart( user_id varchar(20), product_id varchar(5));

alter table cart add foreign key(product_id) references product(product_id);









