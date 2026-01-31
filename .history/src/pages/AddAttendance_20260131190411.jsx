import { useState, useEffect } from "react";
import { getEmployees } from "../api/employeeApi";
import { markAttendance } from "../api/attendanceApi";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState({
    employee: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    getEmployees().then(res => setEmployees(res.data));
  }, []);

  const submitAttendance = async () => {
    await markAttendance(data);
    alert("Attendance marked");
    
  };

  return (
    <>
      <select onChange={(e) => setData({...data, employee: e.target.value})}>
        <option>Select Employee</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.id}>{emp.full_name}</option>
        ))}
      </select>

      <input type="date" onChange={(e) => setData({...data, date: e.target.value})} />

      <select onChange={(e) => setData({...data, status: e.target.value})}>
        <option>Present</option>
        <option>Absent</option>
      </select>

      <button onClick={submitAttendance}>Submit</button>
    </>
  );
}
