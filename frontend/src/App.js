import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path="/signUp" element={<SignUp />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
