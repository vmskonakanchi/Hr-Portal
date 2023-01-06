import axios from 'axios'

const URL = `http://${window.location.hostname}:5000/api/v1/users`

const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const config = {
  headers: { Authorization: `Bearer ${user.token}` },
}
export const getUsers = () => {
  return axios.get(URL, config)
}

export const deleteUsersById = (id) => {
  return axios.delete(`${URL}/${id}`, config)
}

export const searchByName = (search) => {
  return axios.get(`${URL}/search/${search}`, config)
}

export const sortByName = (value) => {
  return axios.get(`${URL}/sort?sort=${value}&order=asc`, config)
}

export const addUsers = (data) => {
  return axios.post(`${URL}/register`, data, config)
}

export const getUsersById = (id) => {
  return axios.get(`${URL}/${id}`, config)
}

export const updateUsersById = (id, data) => {
  return axios.put(`${URL}/${id}`, data, config)
}

export const getUsersByRoles = () => {
  return axios.get(`${URL}/roles/role`, config)
}
