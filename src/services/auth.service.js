import http from "../common/http-common";

const register = (username, email, password,firstname,lastname,street,nr,plz,ort,country,position,roles) => {
  return http.post("/auth/signup", {
    username,
    email,
    password,
    firstname,lastname,street,nr,plz,ort,country,position,roles
  });
};

const login = (username, password) => {
  return http
    .post( "/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
