import api from "./axios";

export const getEmployees = () => api.get("/employees/");
export const addEmployee = (data) => api.post("/employees/", data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}/`);
