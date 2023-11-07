import mysql.connector
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root123",
    database="inventory_db",
    ssl_disabled=True
)
c = mydb.cursor()
def create_table():
    c.execute('CREATE TABLE IF NOT EXISTS DEALER(dealer_id TEXT, dealer_name TEXT, dealer_city TEXT, dealer_pin TEXT, dealer_street TEXT)')
def add_data(dealer_id, dealer_name, dealer_city, dealer_pin, dealer_street):
    c.execute('INSERT INTO DEALER(dealer_id, dealer_name, dealer_city, dealer_pin, dealer_street) VALUES (%s,%s,%s,%s,%s)',(dealer_id, dealer_name, dealer_city, dealer_pin, dealer_street)) 
    mydb.commit()

def add_client(userid, username, email_id, phone_no, city, pincode, building, floor_no, password):
    c.execute('INSERT INTO CLIENT (Client_ID, Client_Name, Email, phone_no, City, PINCODE, Building, Floor_no, password_client) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)', (userid, username, email_id, phone_no, city, pincode, building, floor_no, password))
    print("Hello")
    mydb.commit()

def add_employee(employee_id,employee_name,phone_no,Address,password):
    c.execute('INSERT INTO EMPLOYEE(Employee_Id, Employee_Name, Phone_no, Address, Password_Employee) VALUES (%s,%s,%s,%s,%s)',(employee_id,employee_name,phone_no,Address,password))
    print("BYE")
    mydb.commit()

def view_all_data():
    c.execute('SELECT * FROM DEALER')
    data = c.fetchall()
    return data
def view_only_dealer_names():
    c.execute('SELECT dealer_name FROM DEALER') 
    data = c.fetchall()
    return data
def get_dealer(dealer_name): 
    c.execute('SELECT * FROM DEALER WHERE dealer_name="{}"'.format(dealer_name)) 
    data = c.fetchall()
    return data

def edit_dealer_data(new_dealer_id, new_dealer_name, new_dealer_city, new_dealer_pin, new_dealer_street, dealer_id, dealer_name, dealer_city, dealer_pin, dealer_street): 
    c.execute( """UPDATE DEALER SET dealer_id=%s, dealer_name=%s, dealer_city=%s, dealer_pin=%s, dealer_street=%s WHERE dealer_id=%s and dealer_name=%s and 
    dealer_city=%s and dealer_pin=%s and dealer_street=%s""",
    (new_dealer_id, new_dealer_name, new_dealer_city,
     new_dealer_pin, new_dealer_street, dealer_id, dealer_name,
     dealer_city, dealer_pin, dealer_street))
    mydb.commit()
    data = c.fetchall()
    return data
def delete_data(dealer_name):
    c.execute('DELETE FROM DEALER WHERE dealer_name="{}"'.format(dealer_name))
    mydb.commit()

def get_user_login(username):
    c.execute(f'SELECT password_client FROM Client WHERE Client_ID="{username}"')
    data = c.fetchone()
    return data

def get_admin_login(username):
    c.execute(f'SELECT password_employee FROM employee WHERE Employee_ID="{username}"')
    data = c.fetchone()
    return data
def create_product_table():
    c.execute('''CREATE TABLE IF NOT EXISTS Product (
                Product_ID VARCHAR(5),
                Product_Name TEXT,
                Product_Description TEXT,
                Category VARCHAR(10),
                Price DECIMAL(10, 2),
                Image TEXT,
                PRIMARY KEY (Product_ID))''')
    
def add_product(product_id, product_name, product_description, category, price, image):
    c.execute('''INSERT INTO Product (Product_ID, Product_Name, Product_Description, Category, Price, Image) VALUES (%s, %s, %s, %s, %s, %s)''',(product_id, product_name, product_description, category, price, image))
    mydb.commit()

def get_products_from_database():
    c.execute('SELECT Product_ID, Product_Name, Product_Description, Category, Price, Image FROM Product')
    products = c.fetchall()
    return products
