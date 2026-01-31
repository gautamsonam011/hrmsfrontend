import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import Navbar from "./components/Navbar";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Attendance from "./pages/Attendance";
import AddAttendance from "./pages/AddAttendance";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/attendance/add" element={<AddAttendance />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
