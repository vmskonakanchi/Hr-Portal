import axios from 'axios'

const URL = `http://${window.location.hostname}:5000/api/v1/status`

const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const config = {
  headers: { Authorization: `Bearer ${user.token}` },
}

export const getStatus = () => {
  return axios.get(URL, config)
}

export const addStatus = (data) => {
  return axios.post(`${URL}/register`, data, config)
}

export const getStatusById = (id) => {
  return axios.get(`${URL}/${id}`, config)
}

export const updateStatusById = (id, data) => {
  return axios.put(`${URL}/edit/${id}`, data, config)
}

export const deleteStatusById = (id) => {
  return axios.delete(`${URL}/${id}`, config)
}
