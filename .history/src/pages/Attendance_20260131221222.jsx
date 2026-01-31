import { useEffect, useState, useCallback } from "react";
import { getEmployees } from "../api/employeeApi";
import api from "../api/axios";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

export default function AttendanceList() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [filters, setFilters] = useState({
    employee_id: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetchAttendance wrapped in useCallback
  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/attendance/", {
        params: {
          employee_id: filters.employee_id || undefined,
          date: filters.date || undefined,
        },
      });
      setAttendance(res.data.data || []);
    } catch {
      setError("Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  }, [filters.employee_id, filters.date]);

  // Load employees once
  useEffect(() => {
    getEmployees()
      .then((res) => setEmployees(res.data.data || []))
      .catch(() => setError("Failed to load employees"));
  }, []);

  // Fetch attendance when component loads OR filters change
  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  if (loading) return <Loader text="Loading attendance..." />;
  if (error) return <ErrorState message={error} onRetry={fetchAttendance} />;

  return (
    <div className="attendance-list-page">
      <div className="attendance-list-card">
        <h2 className="attendance-list-title">Attendance Records</h2>

        {/* Filters */}
        <div className="attendance-filters">
          <select
            name="employee_id"
            value={filters.employee_id}
            onChange={handleChange}
            className="attendance-filter"
          >
            <option value="">All Employees</option>
            {employees.map((emp) => (
              <option key={emp.employee_id} value={emp.employee_id}>
                {emp.employee_id} – {emp.full_name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="attendance-filter"
          />
        </div>

        {/* Table */}
        {attendance.length === 0 ? (
          <EmptyState text="No attendance records found" />
        ) : (
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => (
                <tr key={record.id}>
                  <td>{record.employee_code}</td>
                  <td>{record.date}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        record.status === "present"
                          ? "status-present"
                          : "status-absent"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
