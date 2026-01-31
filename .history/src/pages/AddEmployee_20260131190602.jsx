import { useState } from "react";
import { addEmployee } from "../api/employeeApi";
import { Navigate } from "react-router-dom";


export default function AddEmployee() {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(form);
      alert("Employee added");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Employee ID" onChange={(e) => setForm({...form, employee_id: e.target.value})} />
      <input placeholder="Full Name" onChange={(e) => setForm({...form, full_name: e.target.value})} />
      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
      <input placeholder="Department" onChange={(e) => setForm({...form, department: e.target.value})} />
      <button type="submit">Add Employee</button>
    </form>
  );
}
