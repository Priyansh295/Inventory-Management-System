import streamlit as st
import sqlite3

# Function to create the product table
def create_product_table():
    conn = sqlite3.connect('products.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                name TEXT,
                price REAL,
                description TEXT)''')
    conn.commit()
    conn.close()

# Function to insert data into the product table
def add_product(name, price, description):
    conn = sqlite3.connect('products.db')
    c = conn.cursor()
    c.execute('''INSERT INTO products (name, price, description) VALUES (?, ?, ?)''', (name, price, description))
    conn.commit()
    conn.close()

# Create the product table
create_product_table()

# Streamlit app
st.title('Product Data Entry Form')

# Input form for product details
name = st.text_input('Enter Product Name')
price = st.number_input('Enter Product Price', value=0.0)
description = st.text_area('Enter Product Description')

if st.button('Add Product'):
    if name and price and description:
        add_product(name, price, description)
        st.success('Product added successfully!')

# Optionally, display the current products in the table
if st.checkbox('Show Products'):
    conn = sqlite3.connect('products.db')
    c = conn.cursor()
    c.execute('''SELECT * FROM products''')
    products = c.fetchall()
    conn.close()

    if products:
        st.write("Current Products:")
        for product in products:
            st.write(product)
    else:
        st.write("No products found.")
