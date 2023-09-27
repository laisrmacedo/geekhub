import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";

export const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}