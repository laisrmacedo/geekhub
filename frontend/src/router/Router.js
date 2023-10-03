import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";

export const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/:user" element={<Dashboard page={'posts'}/>}/>
        <Route path="/:user/:postId" element={<Dashboard page={'comments'}/>}/>
      </Routes>
    </BrowserRouter>
  )
}