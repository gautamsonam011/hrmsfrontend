import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/employeeApi";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();

      // ✅ FIX: read correct field from backend response
      const data = Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setEmployees(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete employee?")) return;

    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  if (loading) return <Loader />;

  if (employees.length === 0) {
    return <EmptyState text="No employees found" />;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.employee_id}</td>
            <td>{emp.full_name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(emp.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
