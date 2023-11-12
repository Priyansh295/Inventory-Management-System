import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"

// import Products from "./pages/Products"
// import Update from "./pages/Update";
// import Add from "./pages/Add";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Client from "./pages/Client";
import Admin from "./pages/Admin";
import NavbarAdmin from "./components/NavbarAdmin";
import NavbarClient from "./components/NavbarClient";
import "./App.scss"

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/login",
          element: <LoginPage/>
        },
        {
          path: "/register",
          element: <RegisterPage/>
        }
    ]
  },
  {
    path: "/admin",
    element: <>
              <NavbarAdmin/>
              <Admin/>
              <Footer/>
            </>
  },
  {
    path: "/client",
    element: <>
              <NavbarClient/>
              <Client/>
              <Footer/>
            </>
  },
  {
    path: "/admin",
    element: <>
              <NavbarAdmin/>
              <Admin/>
              <Footer/>
            </>
  }
])
function App() {
  return (
    <div className="App">
      <RouterProvider router = {router}/>
    </div>
  );
}

export default App;