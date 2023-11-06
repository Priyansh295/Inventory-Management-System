


# import streamlit as st
# from create import create
# from database import create_table
# from delete import delete
# from read import read
# from update import update

# def main():
#     st.title("Inventory Management System")
#     menu = ["Add", "View", "Edit", "Remove"]
#     # choice = st.sidebar.selectbox("Menu", menu)
#     choice = st.sidebar.radio("Menu", menu)
#     create_table()
#     if choice == "Add":
#         st.subheader("Enter Dealer Details:")
#         create()
#     elif choice == "View":
#         st.subheader("View created tasks")
#         read()
#     elif choice == "Edit":
#         st.subheader("Update created tasks")
#         update()
#     elif choice == "Remove":
#         st.subheader("Delete created tasks")
#         delete()
#     else:
#         st.subheader("About tasks")
# if __name__ == '__main__':
#     main()