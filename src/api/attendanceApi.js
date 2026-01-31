import api from "./axios";

export const markAttendance = (data) =>
  api.post("/attendance/", data);

export const getAttendanceByEmployee = (employeeId) =>
  api.get(`/attendance/${employeeId}/`);
