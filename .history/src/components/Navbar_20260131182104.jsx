import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Human Resource Management System (HRMS Lite)</h2>

      <div style={styles.links}>
        <NavLink to="/" style={styles.link}>
          Dashboard
        </NavLink>
        <NavLink to="/employees" style={styles.link}>
          Employees
        </NavLink>
        <NavLink to="/employees/add" style={styles.link}>
          Add Employee
        </NavLink>
        <NavLink to="/attendance" style={styles.link}>
          Attendance
        </NavLink>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    backgroundColor: "#1f2937",
    color: "#fff",
  },
  logo: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#e5e7eb",
    textDecoration: "none",
    fontSize: "15px",
  },
};
