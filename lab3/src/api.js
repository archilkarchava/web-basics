import axios from "axios"

export default {
  login: credentials =>
    axios.post("/users/login", { credentials }).then(res => res.data),
  register: user =>
    axios.post("/users/register", { user }).then(res => res.data)
}
