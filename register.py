import streamlit as st
from database import add_client,add_employee

def signin_page():
    st.title(":blue[Inventory Management System]")
    st.markdown('### :green[Manage Your Inventory]')
    menu = ["SignIn as User"]
    choice = st.sidebar.radio("Signin", menu)

    if choice == "SignIn as User":
        print("User SignIn")
        res_user = Signin_user()
        if(res_user==1):
            return "user"

def Signin_user():
    st.write("## :blue[User Signin]")
    col1, col2 = st.columns(2)
    with col1:
        userid=st.text_input("User-Id")
        username = st.text_input("Username:")
        email_id=st.text_input("Email:")
        phone_no=st.text_input("Phone Number:")
    with col2:
        city=st.text_input("City:")
        pincode=st.text_input("Pincode:")
        building=st.text_input("Building:")
        floor_no=st.text_input("Floor Number")
    password = st.text_input("Password:",type="password")
    if st.button("Add Client"):
        if userid and username and email_id and phone_no and password:
            add_client(userid,username,email_id,phone_no,city,pincode,building,floor_no,password)
            st.success("Successfully added client")
            return 1
        
def Signin_Admin():
    st.write("## :blue[Employee Signin]")
    col1, col2 = st.columns(2)
    with col1:
        employee_id=st.text_input("Employee Id")
        employee_name = st.text_input("Employee Name:")
    with col2:
        phone_no=st.text_input("Phone Number:")
        Address=st.text_input("Address:")
    password = st.text_input("Password:",type="password")
    if st.button("Add Employee"):
        if employee_id and employee_name and phone_no and password:
            add_employee(employee_id,employee_name,phone_no,Address,password)
            st.success("Successfully added client")
            return 1
