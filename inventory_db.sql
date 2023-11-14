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
   Order_ID varchar(20),
   Client_ID VARCHAR(5),
   Total_Payment DECIMAL(10, 2),
   Shipment_Date timestamp,
   Order_Placement_Date timestamp default current_timestamp,
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
   Assembling_time INT,
   PRIMARY KEY (Product_ID)
);


CREATE TABLE EMPLOYEE(
   Employee_id VARCHAR(5),
   Employee_name VARCHAR(25),
   Phone_no DECIMAL(10,0),
   Email Text,
   Address  VARCHAR(50),
   PRIMARY KEY(Employee_Id)
);


CREATE TABLE ASSEMBLED_BY(
   Product_Id VARCHAR(5),
   Part_id VARCHAR(5),
   Number_of_Parts INT,
   PRIMARY KEY(Product_Id,Part_id)
);




CREATE TABLE PART(
   Part_id VARCHAR(5),
   Part_name VARCHAR(25),
   Weight DECIMAL(12,2),
   PRIMARY KEY(Part_id)
);


CREATE TABLE RESTOCK_DETAILS(
   Store_Id VARCHAR(5),
   Supplier_Id VARCHAR(5),
   Restock_time INT,
   Price decimal(10,2),
   PRIMARY KEY(Store_id,Supplier_id)
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


-- Insert 10 rows into the Product table with car brand names and prices in INR
INSERT INTO Product (Product_ID, Product_Name, Product_Description, Category, Price,Image,Assembling_time)
VALUES
   ('P0001', 'Toyota Camry', 'The Toyota Camry, a renowned car model, is the perfect blend of style and performance. This car offers a comfortable and efficient driving experience for those seeking both luxury and reliability.', 'Car', 1825000.00,'toyota-camry.jpeg',2),
   ('P0002', 'Ford F-150', 'The Ford F-150, is built to handle tough tasks with ease. Its robust build and powerful performance make it the ideal choice for work and adventure enthusiasts who require a dependable and rugged vehicle.', 'Truck', 2555000.00,'ford-150.jpeg',1),
   ('P0003', 'Honda Civic', 'The Honda Civic, a classic car model, is synonymous with reliability and efficiency.Known for its fuel economy and sleek design, this car is a top pick for those who value practicality and style on the road.', 'Car', 1460000.00,'Honda_civic.jpeg',1),
   ('P0004', 'Chevrolet Silverado', 'The Chevrolet Silverado, a versatile truck model, is designed to tackle heavy-duty jobs with finesse.With its strong performance and spacious interior, this truck is perfect for individuals who demand power and comfort.', 'Truck', 2190000.00,'chevrolet.jpeg',3);
--     ('P0005', 'BMW 3 Series', 'The BMW 3 Series, a luxury car model, exemplifies sophistication and performance.Featuring cutting-edge technology and a refined interior, this car caters to drivers who seek a premium driving experience with a touch of elegance.', 'Car', 2920000.00),
--     ('P0006', 'Dodge Ram', 'The Dodge Ram, a rugged truck model, is built for those who crave adventure and capability. With its aggressive design and off-road prowess, this truck is the ultimate choice for outdoor enthusiasts and thrill-seekers.', 'Truck', 2336000.00), 
--     ('P0007', 'Nissan Altima', 'The Nissan Altima, a stylish car model, offers a perfect balance of affordability and features.Its comfortable interior and advanced technology make it an excellent option for those in search of a well-rounded daily driver.', 'Car', 1606000.00),
--     ('P0008', 'GMC Sierra', 'The GMC Sierra, a dependable truck model, is engineered for heavy lifting and durability.Its spacious cabin and innovative technology cater to those who need a reliable work companion and an elevated driving experience.', 'Truck', 2263000.00),
--     ('P0009', 'Audi A4', 'The Audi A4, a luxury car model, defines opulence and performance.With its premium materials and cutting-edge features, this car caters to discerning drivers who demand the best in both aesthetics and technology.', 'Car', 3066000.00),
--     ('P0010', 'Jeep Wrangler', 'The Jeep Wrangler, an iconic SUV model, is designed for off-road adventures and exploration.With its rugged build and open-air driving experience, this SUV is the top choice for outdoor enthusiasts and nature lovers.', 'SUV', 2117000.00);


INSERT INTO PART (Part_id, Part_name, Weight) VALUES
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


INSERT INTO ASSEMBLED_BY (Product_Id, Part_id, Number_of_Parts)
VALUES
   ('P0001', 'P1', 2),
   ('P0001', 'P2', 1),
   ('P0002', 'P3', 1),
   ('P0003', 'P4', 3),
   ('P0004', 'P5', 2),
   ('P0004', 'P6', 1),
   ('P0004', 'P7', 4),
   ('P0004', 'P8', 4),
   ('P0004', 'P9', 1),
   ('P0004', 'P10', 2);


INSERT INTO STORAGE (Store_id, Part_id, Quantity, Rack_no, Block_no, Threshold)
VALUES
('S1', 'P1', 5, 1, 'A', 3),
('S2', 'P2', 4, 2, 'B', 2),
('S3', 'P3', 6, 3, 'C', 3),
('S4', 'P4', 7, 4, 'D', 3),
('S5', 'P5', 3, 5, 'E', 2),
('S6', 'P6', 2, 6, 'F', 1),
('S7', 'P7', 8, 7, 'G', 4),
('S8', 'P8', 9, 8, 'H', 4),
('S9', 'P9', 10, 9, 'I', 5),
('S10', 'P10', 4, 10, 'J', 5);




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




INSERT INTO RESTOCK_DETAILS (Store_Id, Supplier_Id, Restock_time, Price)
VALUES
   ('S1', 'S0001', 1, 100.00),
   ('S2', 'S0002', 2, 150.50),
   ('S3', 'S0003', 3, 200.75),
   ('S4', 'S0004', 1, 120.25),
   ('S5', 'S0005', 3, 180.00),
   ('S6', 'S0006', 2, 130.50),
   ('S7', 'S0007', 3, 210.25),
   ('S8', 'S0008', 5, 300.00),
   ('S9', 'S0009', 2, 160.75),
   ('S10', 'S0010', 1, 110.50);




INSERT INTO EMPLOYEE (Employee_Id, Employee_Name, Phone_no, Email, Address)
VALUES
('E0001', 'Alice Johnson', 1234567890, 'alice@example.com', '123 Main Street'),
('E0002', 'Bob Thompson', 0987654321, 'bob@example.com', '456 Elm Street'),
('E0003', 'Eva Rodriguez', 3334445555, 'eva@example.com', '789 Oak Street'),
('E0004', 'Maxwell Parker', 2225556666, 'maxwell@example.com', '1011 Maple Avenue'),
('E0005', 'Olivia Carter', 6667778888, 'olivia@example.com', '1213 Pine Street'),
('E0006', 'Liam Foster', 5554443333, 'liam@example.com', '1415 Beach Avenue'),
('E0007', 'Sophia Bennett', 4443332222, 'sophia@example.com', '1617 Park Avenue'),
('E0008', 'Daniel Nguyen', 7778881111, 'daniel@example.com', '1819 Elm Street'),
('E0009', 'Isabella Kim', 8889990000, 'isabella@example.com', '2021 Oak Street'),
('E0010', 'Jackson Patel', 9990001111, 'jackson@example.com', '2223 Maple Avenue');





INSERT INTO CLIENT (Client_ID, Client_Name, Email, phone_no, City, PINCODE, Building, Floor_no, password_client)
VALUES
('C0001', 'John Smith', 'john.smith@email.com', 1234567890, 'Bangalore', 560016, 'ABC Apartments', 2, '$2a$10$6fwjJFmzl/M8ZiJchrvUJurlyTbFZBqAeL8ENA5L5DuF79zSCXYMG'),
('C0002', 'Jane Doe', 'jane.doe@email.com', 9807654321, 'Mumbai', 400001, 'XYZ Towers', 5, '$2a$10$YdIOafYEWQUHi9VGmjtM8Ot21QpPe4PjB45ITHcjKvsbGfg1HJawy'),
('C0003', 'Peter Jones', 'peter.jones@email.com', 3334445555, 'Chennai', 600001, 'PQR Residency', 3, '$2a$10$9hdpZ2K.ROjqCNN4ikwkHeVhstoulv4dHtX.JInHdiWLVEUkRt8Q6'),
('C0004', 'Mary Brown', 'mary.brown@email.com', 2225556666, 'Delhi', 110001, 'LMN Apartments', 1, '$2a$10$NFvZc/nrC.sPzqrnexM/3uf3XVoJ86fPYzyA24BEUa1me8oILT56C'),
('C0005', 'David Williams', 'david.williams@email.com', 6667778888, 'Hyderabad', 500001, 'JKL Towers', 7, '$2a$10$V/qNO0QselsftJjafqIXC.4M6unXnGWnDcF4xQDoFQJIa3uAllZWS'),
('C0006', 'Sarah Miller', 'sarah.miller@email.com', 5554443333, 'Ahmedabad', 380001, 'GHI Residency', 4, '$2a$10$y1IOb5zOJ3FhHQPVG7a/yuLN6jU2dOtg9.lAkK5682a/APMVqYW3W'),
('C0007', 'Michael Anderson', 'michael.anderson@email.com', 4443332222, 'Pune', 411001, 'DEF Apartments', 6, '$2a$10$hkwuSS4RYTX0F/nQywCvIel0t2TxhjKmiMjRhMzxwlyqeMrxVe7yG'),
('C0008', 'Susan Taylor', 'susan.taylor@email.com', 7778881111, 'Surat', 395001, 'CDE Towers', 2, '$2a$10$R6ZQkLrNX7J3w9Nykn1YLeGeEL.DMRpjnuE29.wu3r.J2eqt.HxtW'),
('C0009', 'James Johnson', 'james.johnson@email.com', 8889990000, 'Jaipur', 302001, 'BCA Residency', 1, '$2a$10$M4f0B7sMbZxiUvmV0jcnLuK2dpODR2cXsi/1j9WNcycpCd552C4yK'),
('C0010', 'Elizabeth Thomas', 'elizabeth.thomas@email.com', 9990001111, 'Kanpur', 208001, 'ABB Apartments', 3, '$2a$10$74BeC/YXF/trO.Zso2vr9.BEkk7cC81aO9H//K5YWPeAYxDauWYfC');


create table cart( user_id varchar(20), product_id varchar(5));

CREATE TABLE SUPPLIER_ORDERS(
   Store_id VARCHAR(5),
   Supplier_id VARCHAR(5),
   date_time timestamp,
   Status ENUM("In Progress","Shipped", "Complete", "Cancelled")
);


CREATE TABLE Admin(Admin_ID VARCHAR(5) PRIMARY KEY, password VARCHAR(100));
INSERT INTO Admin VALUES('admin', '$2a$10$ajLYr46aHBjWhpcBV/Ng4O/2n/Anx0H2QPH09cPjPCGNqxHOEQanC');

-- ALTER TABLE SUPPLIER_ORDERS
ALTER TABLE SUPPLIER_ORDERS
ADD CONSTRAINT fk_supplier_orders
FOREIGN KEY(Store_ID) REFERENCES STORAGE(Store_ID) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_supplier_id FOREIGN KEY(Supplier_ID) REFERENCES SUPPLIER(Supplier_ID) ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE cart
ALTER TABLE cart
ADD CONSTRAINT fk_product_cart FOREIGN KEY(product_id) REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_client_cart FOREIGN KEY(user_id) REFERENCES client(client_id) ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE Orders
ALTER TABLE Orders
ADD CONSTRAINT fk_order_client
FOREIGN KEY(Client_ID) REFERENCES Client(Client_ID) ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE Order_Line
ALTER TABLE Order_Line
ADD CONSTRAINT fk_ol_order
FOREIGN KEY(Order_ID) REFERENCES Orders(Order_ID) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_ol_product FOREIGN KEY(Product_ID) REFERENCES Product(Product_ID) ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE Assembled_By
ALTER TABLE Assembled_By
-- ADD CONSTRAINT fk_as_emp FOREIGN KEY(Employee_ID) REFERENCES Employee(Employee_ID),
ADD CONSTRAINT fk_as_product FOREIGN KEY(Product_ID) REFERENCES Product(Product_ID) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_as_part FOREIGN KEY(Part_ID) REFERENCES Part(Part_ID) ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE Restock_Details
ALTER TABLE Restock_Details
-- ADD CONSTRAINT fk_re_emp FOREIGN KEY(Employee_ID) REFERENCES Employee(Employee_ID),
ADD CONSTRAINT fk_re_supplier FOREIGN KEY(Supplier_ID) REFERENCES Supplier(Supplier_ID) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_as_store FOREIGN KEY(Store_ID) REFERENCES Storage(Store_ID) ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE Storage
ALTER TABLE Storage
ADD CONSTRAINT fk_store_part FOREIGN KEY(Part_ID) REFERENCES Part(Part_ID) ON DELETE CASCADE ON UPDATE CASCADE;
