import streamlit as st
import sqlite3
from database import create_product_table,add_product,get_products_from_database


def product():
    # Create the product table
    create_product_table()

    # Streamlit app
    st.title('Product Data Entry Form')

    # Input form for product details
    product_id = st.text_input('Enter Product ID')
    product_name = st.text_input('Enter Product Name')
    product_description = st.text_area('Enter Product Description')
    category = st.text_input('Enter Product Category')
    price = st.number_input('Enter Product Price', value=0.0)
    image_url = st.text_input('Enter Image URL')

    # Input form for product image upload
    uploaded_image = st.file_uploader("Upload an image for the product", type=["jpg", "jpeg", "png"])

    if st.button('Add Product'):
        if product_id and product_name and product_description and category and price:
            add_product(product_id, product_name, product_description, category, price, image_url)
            st.success('Product added successfully!')
    if st.checkbox('Show Products'):
        show_products()

def show_products():
    # Optionally, display the current products in the table
    products = get_products_from_database()
    if products:
        st.write("Current Products:")
        for product in products:
            st.write(f"Product ID: {product[0]}")
            st.write(f"Product Name: {product[1]}")
            st.write(f"Product Description: {product[2]}")
            st.write(f"Category: {product[3]}")
            st.write(f"Price: {product[4]}")
            if product[5]:
                st.image(product[5], caption=product[1], use_column_width=True)
    else:
        st.write("No products found.")


if __name__ == "__main__":
    product()
