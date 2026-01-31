import { useState } from "react";
import { addEmployee } from "../api/employeeApi";
import { useNavigate } from "react-router-dom";


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
    <div className="employee-form-wrapper">
      <form className="employee-form" onSubmit={handleSubmit}>
        <h2 className="employee-form-title">Employee Details</h2>

        <div className="employee-form-group">
          <input
            className="employee-input"
            placeholder="Employee ID"
            onChange={(e) =>
              setForm({ ...form, employee_id: e.target.value })
            }
          />
        </div>

        <div className="employee-form-group">
          <input
            className="employee-input"
            placeholder="Full Name"
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
          />
        </div>

        <div className="employee-form-group">
          <input
            className="employee-input"
            placeholder="Email Address"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div className="employee-form-group">
          <input
            className="employee-input"
            placeholder="Department"
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          />
        </div>

        <button className="employee-submit-btn" type="submit">
          Add Employee
        </button>
      </form>
    </div>
  );

}