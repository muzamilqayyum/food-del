import Navbar from "./components/navbar/Navbar"
import Sidebar from "./components/sidebar/Sidebar"
import { Routes, Route } from "react-router"
import Add from "../src/pages/Add/Add.jsx"
import List from "./pages/list/List.jsx"
import Orders from "./pages/Orders/Orders.jsx"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Edit from "./components/edit/Edit.jsx"
import { useState } from "react"

function App() {
  const url = "http://localhost:3000";
  const [data, setdata] = useState({});
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} setdata={setdata} />} />
          <Route path="/list/edit" element={<Edit url={url} data={data} setdata={setdata} />} />
          <Route path='/orders' element={<Orders url={url} />} />

        </Routes>
      </div>
    </div>
  )
}

export default App





