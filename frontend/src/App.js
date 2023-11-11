import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Products from "./pages/Products"
import Update from "./pages/Update";
import Add from "./pages/Add";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path = "/" /> */}
          <Route path = "/products" element={<Products/>}/>
          <Route path = "/products/update" element={<Update/>}/>
          <Route path = "/products/add" element={<Add/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
