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
      setEmployees(res.data);
    } catch (err) {
      alert("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete employee?")) return;
    await deleteEmployee(id);
    fetchEmployees();
  };

  if (loading) return <Loader />;
  if (employees.length === 0) return <EmptyState text="No employees found" />;

  return (
    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Dept</th>
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
              <button onClick={() => handleDelete(emp.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
