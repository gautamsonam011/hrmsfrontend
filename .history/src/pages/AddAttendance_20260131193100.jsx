import { useState, useEffect } from "react";
import { getEmployees } from "../api/employeeApi";
import { markAttendance } from "../api/attendanceApi";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState({
    employee_id: "",
    date: "",
    status: "present",
  });

  useEffect(() => {
    getEmployees().then((res) => {
      const empList = Array.isArray(res.data.data)
        ? res.data.data
        : [];
      setEmployees(empList);
    });
  }, []);

  const submitAttendance = async () => {
    if (!data.employee_id || !data.date) {
      alert("Please select employee and date");
      return;
    }

    try {
      await markAttendance(data);
      alert("Attendance marked successfully");

      // optional reset
      setData({
        employee_id: "",
        date: "",
        status: "present",
      });
    } catch (err) {
      console.error(err.response?.data);
      alert("Failed to mark attendance");
    }
  };

  return (
    <>
      <select
        value={data.employee_id}
        onChange={(e) =>
          setData({ ...data, employee_id: e.target.value })
        }
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.full_name}
          </option>
        ))}
      </select>
    
      <input
        type="date"
        value={data.date}
        onChange={(e) =>
          setData({ ...data, date: e.target.value })
        }
      />
     
      <select
        value={data.status}
        onChange={(e) =>
          setData({ ...data, status: e.target.value })
        }
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button onClick={submitAttendance}>Submit</button>
    </>
  );
}
