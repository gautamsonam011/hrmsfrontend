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
    getEmployees().then((res) => {
      const empList = Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setEmployees(empList);
    });
  }, []);

  const submitAttendance = async () => {
    if (!data.employee || !data.date) {
      alert("Please select employee and date");
      return;
    }

    await markAttendance(data);
    alert("Attendance marked");
  };

  return (
    <>
      <select
        value={data.employee}
        onChange={(e) =>
          setData({ ...data, employee: e.target.value })
        }
      >
        <option value="">Select Employee</option>
        {Array.isArray(employees) &&
          employees.map((emp) => (
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
