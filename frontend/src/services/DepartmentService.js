import axios from 'axios'

const URL = `http://${window.location.hostname}:5000/api/v1/departments`

const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const config = {
  headers: { Authorization: `Bearer ${user.token}` },
}

export const getDepartments = () => {
  return axios.get(URL, config)
}

export const addDepartment = (data) => {
  return axios.post(`${URL}/register`, data, config)
}

export const getDepartmentById = (id) => {
  return axios.get(`${URL}/${id}`, config)
}

export const updateDepartmentById = (id, data) => {
  return axios.put(`${URL}/edit/${id}`, data, config)
}

export const deleteDepartmentById = (id) => {
  return axios.delete(`${URL}/${id}`, config)
}
