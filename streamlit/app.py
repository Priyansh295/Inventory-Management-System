import streamlit as st
from create import create
from database import create_table, get_user_login, get_admin_login
from delete import delete
from read import read
from update import update
from products import product,show_products
from register import signin_page,Signin_Admin
st.set_page_config(
    page_title="Inventory Management System",
    page_icon=":bar_chart:",
    layout="wide",
    initial_sidebar_state="expanded"
)

window = st.empty()
placeholder = st.empty()
menu=["Log-In","Sign-In"]
choice = st.sidebar.radio("Login", menu)
def login_page():
    global window
    global placeholder
    window.empty()
    with window.container():
        st.title(":blue[Inventory Management System]")
        st.markdown('### :green[Manage Your Inventory]')

        menu = ["Login as User", "Login as Admin"]
        choice = st.sidebar.radio("Login", menu)

        if choice == "Login as User":
            print("User Login")
            res_user = login_user()
            if res_user == 1:
                placeholder.empty()
                return "user"
        elif choice == "Login as Admin":
            print("Admin Login")
            res_admin = login_admin()
            if res_admin == 1:
                placeholder.empty()
                return "admin"

def login_user():
    global placeholder
    with placeholder.container():
        st.write("## :blue[User Login]")
        username = st.text_input("Username (Client_ID):", 15)
        password = st.text_input("Password (Client_ID):", 15, type="password")

        pswd = get_user_login(username)
        if pswd is None:
            st.write("Invalid Username")
        else:
            pswd = pswd[0]
            if pswd != password:
                st.write("Incorrect Password")
            if pswd == password:
                username = ""
                password = ""
                return 1
        return 0

def login_admin():
    global placeholder
    with placeholder.container():
        st.write("## :orange[Admin Login]")
        username = st.text_input("Username (Client_ID):", 15)
        password = st.text_input("Password (Client_ID):", 15, type="password")

        pswd = get_admin_login(username)

        if pswd is None:
            st.write("Invalid Username")
        else:
            pswd = pswd[0]
            if pswd != password:
                st.write("Incorrect Password")
            if pswd == password:
                username = ""
                password = ""
                return 1
        return 0

def user_view():
    # st.subheader("Client View")
    # st.markdown("## :blue[Place Orders]")
    menu = ["Add", "View", "Edit", "Remove","Products"]
    choice = st.sidebar.radio("Menu", menu)
    create_table()

    if choice == "Add":
        st.subheader("Enter Dealer Details:")
        create()
    elif choice == "View":
        st.subheader("View Created Tasks")
        read()
    elif choice == "Edit":
        st.subheader("Update Created Tasks")
        update()
    elif choice == "Remove":
        st.subheader("Delete Created Tasks")
        delete()
    elif choice == "Products":
        st.subheader("Products Available")
        show_products()
    else:
        st.subheader("About Tasks")


def main():
    menu = ["Add", "View", "Edit", "Remove","Add Product","Add User"]
    choice = st.sidebar.radio("Menu", menu)
    create_table()

    if choice == "Add":
        st.subheader("Enter Dealer Details:")
        create()
    elif choice == "View":
        st.subheader("View Created Tasks")
        read()
    elif choice == "Edit":
        st.subheader("Update Created Tasks")
        update()
    elif choice == "Remove":    
        st.subheader("Delete Created Tasks")
        delete()
    elif choice =="Add Product":
        st.subheader("Add Products")
        product()
    elif choice=="Add User":
        st.subheader("Add User")
        Signin_Admin()
    else:
        st.subheader("About Tasks")

if __name__ == '__main__':
    if(choice=="Log-In"):
        ret = login_page()
        if ret == "admin":
            main()
        elif ret == "user":
            user_view()
    if(choice=="Sign-In"):
        ret1 = signin_page()
        if ret1 == "user":
            user_view()
    # print(ret1)
    # print("here")
    # print(ret)
