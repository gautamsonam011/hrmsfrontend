import { useEffect, useState } from "react";
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

  /* Load employees for filter dropdown */
  useEffect(() => {
    getEmployees()
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

        setEmployees(data);
      })
      .catch(() => setError("Failed to load employees"));
  }, []);

  /* Fetch attendance when filters change */
  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line
  }, [filters]);

  const fetchAttendance = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/attendance/", {
        params: {
          employee_id: filters.employee_id || undefined,
          date: filters.date || undefined,
        },
      });

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];

      setAttendance(data);
    } catch (err) {
      setError("Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <Loader text="Loading attendance..." />;
  if (error) return <ErrorState message={error} onRetry={fetchAttendance} />;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Attendance Records</h2>

      {/* Filters */}
      <div style={styles.filters}>
        <select
          name="employee_id"
          value={filters.employee_id}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">All Employees</option>
          {Array.isArray(employees) &&
            employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}
        </select>

        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      {/* Table / Empty */}
      {attendance.length === 0 ? (
        <EmptyState text="No attendance records found" />
      ) : (
        <table style={styles.table}>
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
                <td>{record.employee_name || record.employee}</td>
                <td>{record.date}</td>
                <td
                  style={{
                    color: record.status === "Present" ? "green" : "red",
                  }}
                >
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* Styles */
const styles = {
  container: {
    padding: "24px",
  },
  title: {
    marginBottom: "16px",
  },
  filters: {
    display: "flex",
    gap: "16px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    minWidth: "180px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};
