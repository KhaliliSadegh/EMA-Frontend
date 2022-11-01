import http from "../common/http-common";
import authHeader from "./auth-header";

class employeeDataService {
  getAll() {
    return http.get("/employee", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/employee/${id}`, { headers: authHeader() });
  }

  create(data) {
    return http.post("/employee", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/employee/${id}`, data, { headers: authHeader() });
  }
  addcomment(id, data) {
    return http.put(`/employee/addcomment/${id}`, data, { headers: authHeader() });
  }
  delete(id) {
    return http.delete(`/employee/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/employee`, { headers: authHeader() });
  }


}

export default new employeeDataService();