import { useState, useEffect } from "react";
import { getEmployees } from "../api/employeeApi";
import { markAttendance } from "../api/attendanceApi";
import { useNavigate } from "react-router-dom";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState({
    employee_id: "",
    status: "present",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees().then((res) => {
      setEmployees(res.data.data || []);
    });
  }, []);

  const submitAttendance = async () => {
    if (!data.employee_id) {
      alert("Please select employee");
      return;
    }

    try {
      await markAttendance({
        employee_id: data.employee_id,
        status: data.status,
      });

      alert("Attendance marked successfully");

      setData({
        employee_id: "",
        status: "present",
      });
    } catch (err) {
      alert("Already marked");
    }
  };

  return (
    <div className="attendance-page">
      <div className="attendance-card">
        <h2 className="employee-form-title">Mark Attendance</h2>

        {/* Employee */}
        <div className="attendance-group">
          <label className="attendance-label">Employee</label>
          <select
            className="attendance-select"
            value={data.employee_id}
            onChange={(e) =>
              setData({ ...data, employee_id: e.target.value })
            }
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.employee_id} value={emp.employee_id}>
                {emp.employee_id} – {emp.full_name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="attendance-group">
          <label className="attendance-label">Status</label>
          <select
            className="attendance-select"
            value={data.status}
            onChange={(e) =>
              setData({ ...data, status: e.target.value })
            }
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>

        <button className="employee-submit-btn" onClick={submitAttendance}>
          Submit Attendance
        </button>
      </div>
    </div>
  );
}
