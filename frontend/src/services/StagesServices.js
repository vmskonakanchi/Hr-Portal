import axios from 'axios'

const URL = `http://${window.location.hostname}:5000/api/v1/stages`

const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const config = {
  headers: { Authorization: `Bearer ${user.token}` },
}

export const getStages = () => {
  return axios.get(URL, config)
}

export const addStages = (data) => {
  return axios.post(`${URL}/register`, data, config)
}

export const getStageById = (id) => {
  return axios.get(`${URL}/${id}`, config)
}

export const updateStageById = (id, data) => {
  return axios.put(`${URL}/edit/${id}`, data, config)
}

export const getStagescount = () => {
  return axios.get(`${URL}/count`, config)
}

export const getCandidatesCountByMonth = () => {
  return axios.get(`${URL}/search/month?sort=_id&order=asc`, config)
}

export const getCandidatesCountByDate = () => {
  return axios.get(`${URL}/search/date?sort=_id&order=asc`, config)
}

export const getCandidatesCountByYear = () => {
  return axios.get(`${URL}/search/year?sort=_id&order=asc`, config)
}

export const deleteStagesById = (id) => {
  return axios.delete(`${URL}/${id}`, config)
}

export const exportToExcelByDate = (from, to) => {
  return axios.get(`${URL}/export/date?from=${from}&to=${to}&sort=_id&order=asc`, config)
}

export const getSelectedByStages = (stage) => {
  return axios.get(
    `${URL}/selectedsearch/date?status=Selected&sort=_id&order=asc`,
    config,
  )
}

// selected By stages ...
// export const getSelectedByStages = (stage) => {
//   return axios.get(
//     `${URL}/selectedsearch/date?status=Selected&stage=${stage}&sort=_id&order=asc`,
//     config,
//   )
// }

export const searchHrCandidatesByDate = (data, from, to) => {
  return axios.get(
    `${URL}/hrsearch/date?hrMembers=${data}&from=${from}&to=${to}&sort=_id&order=asc`,
    config,
  )
}

export const searchHrSelectedCandidatesByDate = (data, status, from, to) => {
  return axios.get(
    `${URL}/hrsearch/select/date?hrMembers=${data}&status=${status}&from=${from}&to=${to}&sort=_id&order=asc`,
    config,
  )
}

export const searchHrCandidatesByMonth = (data, status) => {
  return axios.get(
    `${URL}/hrsearch/month?hrMembers=${data}&status=${status}&sort=_id&order=asc`,
    config,
  )
}

export const searchHrCandidatesByYear = (data, status) => {
  return axios.get(
    `${URL}/hrsearch/year?hrMembers=${data}&status=${status}&sort=_id&order=asc`,
    config,
  )
}

