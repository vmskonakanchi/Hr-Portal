import axios from 'axios'

const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

export const URL = `http://${window.location.hostname}:5000/api/v1/candidates`
const config = {
  headers: { Authorization: `Bearer ${user.token}` },
}

const config1 = {
  headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'multipart/form-data' },
}


export const getCandidates = () => {
  return axios.get(`${URL}?sort=date&order=desc`, config)
}

export const deleteCandidateById = (id) => {
  return axios.delete(`${URL}/${id}`, config)
}

export const searchByName = (search) => {
  return axios.get(`${URL}/search/${search}`, config)
}

export const sortByName = (value, order) => {
  return axios.get(`${URL}/sort?sort=${value}&order=asc`, config)
}

export const addCandidate = (data) => {
  return axios.post(URL, data, config1)
}

export const getCandidateById = (id) => {
  return axios.get(`${URL}/${id}`, config)
}

export const updateCandidateById = (id, data) => {
  return axios.put(`${URL}/${id}`, data, config)
}

export const updatestageCandidateById = (id, data) => {
  return axios.put(`${URL}/stage/${id}`, data, config)
}

export const updateCandidateStagesById = (id, data) => {
  return axios.put(`${URL}/stages/add?candidateId=${id}`, data, config)
}

export const getExport = () => {
  return axios.get(`${URL}/export`, config)
}

export const getCandidateCount = () => {
  return axios.get(`${URL}/candidatecount`, config)
}

export const getDepartmentGraph = (number) => {
  return axios.get(`${URL}/departments/top?scount=${number}`, config)
}

export const getSourceGraph = (number) => {
  return axios.get(`${URL}/sources/top?scount=${number}`, config)
}

export const getRecruiterGraph = (number) => {
  return axios.get(`${URL}/recruiters/top?scount=${number}`, config)
}

export const sortCandidatesByDeveloper = (value) => {
  return axios.get(`${URL}/developers/${user.name}/sort?sort=${value}&order=asc`, config)
}

export const searchCandidatesByDeveloper = (query) => {
  return axios.get(`${URL}/search/developers/${query}?developers=${user.name}`, config)
}

export const searchCandidatesByDate = (from, to) => {
  return axios.get(`${URL}/searchByDate?from=${from}&to=${to}&sort=_id&order=asc`, config)
}

export const getCandidatesByDevelopers = (data) => {
  return axios.get(`${URL}/developers/${data}?sort=date&order=desc`, config)
}

export const getCandidatesByHrMembers = (data) => {
  return axios.get(`${URL}/hrMembers/${data}`, config)
}

export const getRecruiterCandidatesByDate = (data) => {
  return axios.get(`${URL}/recruiterByDate/${data}?sort=_id&order=asc`, config)
}

export const getRecruiterSelectCandidatesByDate = (data) => {
  return axios.get(
    `${URL}/recruiterSelectedByDate/recruiter?recruiter=${data}&status=Selected&sort=_id&order=asc`,
    config,
  )
}

export const getRecruiterProgressGraph = (data) => {
  return axios.get(`${URL}/recruiterProgress/recruiter?recruiter=${data}&status=Selected`, config)
}

export const getDeveloperSelectProgressGraph = (stage, data) => {
  return axios.get(
    `${URL}/developerProgress/dev?stage=${stage}&developers=${data}&devStatus=Selected&roles=developer`,
    config,
  )
}

export const getDeveloperRejectProgressGraph = (stage, data) => {
  return axios.get(
    `${URL}/developerProgress/dev?stage=${stage}&developers=${data}&devStatus=Rejected&roles=developer`,
    config,
  )
}

export const getDeveloperAssigned = (data) => {
  return axios.get(`${URL}/devsearch/developer?developers=${data}`, config)
}
