import { Route, Routes } from "react-router-dom";

import { AuthState } from "./context/AuthContext";
import { ExpenseState } from "./context/ExpenseContext";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgetPassword from "./auth/ForgetPass";
import Home from "./home/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <AuthState>
        <ExpenseState>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </ExpenseState>
      </AuthState>
    </>
  );
}

export default App;
