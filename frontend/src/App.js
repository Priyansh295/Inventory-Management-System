import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"

import Products from "./pages/Products"
// import Update from "./pages/Update";
// import Add from "./pages/Add";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Client from "./pages/Client";


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
          path: "/products",
          element: <Products/>
        },
        {
          path: "/client",
          element: <Client/>
        }
    ]
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
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