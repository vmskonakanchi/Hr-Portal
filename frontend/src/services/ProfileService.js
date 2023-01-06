import axios from 'axios'

const URL = `http://${window.location.hostname}:5000/api/v1/users`
const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const config = {
  headers: { Authorization: `Bearer ${user.token}` },
}

export const getProfile = () => {
  return axios.get(URL)
}

export const deleteProfileById = (id) => {
  return axios.delete(`${URL}/${id}`)
}

export const searchByName = (search) => {
  return axios.get(`${URL}?q=${search}`)
}

export const sortByName = (value) => {
  return axios.get(`${URL}?_sort=${value}&_order=asc`)
}

export const addProfile = (data) => {
  return axios.post(URL, data)
}

export const getProfileById = (id) => {
  return axios.get(`${URL}/${id}`)
}

export const updateProfileById = (id, data) => {
  return axios.put(`${URL}/${id}`, data)
}

export const updatePassword = (data) => {
    return axios.post(`${URL}/changepassword`, data, config)
  }
  
