import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { getUsersByRoles } from 'src/services/UsersService'
import { getCandidateById, updateCandidateStagesById } from 'src/services/CandidateService'
import { getStages } from 'src/services/StagesServices'
import ValidateCandidate from 'src/validations/candidate/EditStageFormValidate'
import { getStatus } from 'src/services/StatusService'
// const _user = localStorage.getItem('token')
// const user = JSON.parse(_user)

const EditStageForm = () => {
  const [data, setData] = useState({
    stage: '',
    developers: '',
    hrMembers: '',
    comments: '',
    status: '',
    roles: '',
  })
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState([])

  const [roles, setRoles] = useState([])
  const [stage, setStage] = useState([])
  const [errorsMsg, setErrorsMsg] = useState([])

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCandidateById(id)
        setData(user.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [id])

  useEffect(() => {
    getStages().then((response) => setStage(response.data))
    getStatus().then((response) => setStatus(response.data))
    getUsersByRoles().then((response) => setRoles(response.data))
  }, [])

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = ValidateCandidate(data)
    setErrors(newErrors)
    if (!Object.keys(newErrors).length) {
      try {
        await updateCandidateStagesById(id, data)
        navigate('/candidate')
      } catch (error) {
        error.response && setErrors(error.response.data)
        setErrorsMsg(error.response.data.msg)
      }
    }
  }

  return (
    <>
      <CContainer className="mt--7" fluid>
        <CRow>
          <CCol className="order-xl-1" xl="8">
            <CCard className="bg-light shadow">
              <CCardHeader className="bg-white border-0">
                <CRow className="align-items-center">
                  <CCol xs="8">
                    <h3 className="mb-0">Update Candidate</h3>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <h6 className="heading-small text-muted mb-4">Stage Information</h6>
                  <div className="pl-lg-4">
                    <CRow>
                      <CCol className="order-xl-1" xl="">
                        <CCardBody>
                          <div className="pl-lg-4">
                            <CRow className="mb-3">
                              <CCol lg="6">
                                <CFormLabel
                                  className="form-control-label"
                                  htmlFor="input-department"
                                >
                                  Stage
                                </CFormLabel>
                                <CFormSelect
                                  name="stage"
                                  value={data.stage}
                                  onChange={handleChange}
                                >
                                  <option defaultValue>stage</option>
                                  {stage.map((item, index) => {
                                    return <option key={index}>{item.stage}</option>
                                  })}
                                </CFormSelect>
                                {errorsMsg ? <span style={{ color: 'red' }}>{errorsMsg}</span> : ''}
                                <span style={{ color: 'red' }}>{errors.stage}</span>
                              </CCol>
                              <CCol lg="6">
                                <CFormLabel
                                  className="form-control-label"
                                  htmlFor="input-department"
                                >
                                  Developers
                                </CFormLabel>
                                <CFormSelect
                                  name="developers"
                                  value={data.developers}
                                  onChange={handleChange}
                                >
                                  <option defaultValue>Developers</option>
                                  {roles.usersByDeveloperRoles
                                    ? roles.usersByDeveloperRoles.map((item, index) => {
                                        return (
                                          <option key={index} value={item.name}>
                                            {item.name}
                                          </option>
                                        )
                                      })
                                    : ''}
                                </CFormSelect>
                                <span style={{ color: 'red' }}>{errors.developers}</span>
                              </CCol>
                            </CRow>
                            <CRow className="mb-3">
                              <CCol lg="6">
                                <CFormLabel
                                  className="form-control-label"
                                  htmlFor="input-department"
                                >
                                  HR Members
                                </CFormLabel>
                                <CFormSelect
                                  name="hrMembers"
                                  value={data.hrMembers}
                                  onChange={handleChange}
                                >
                                  <option defaultValue>HR Members</option>
                                  {roles.usersByHrRoles
                                    ? roles.usersByHrRoles.map((item, index) => {
                                        return (
                                          <option key={index} value={item.name}>
                                            {item.name}
                                          </option>
                                        )
                                      })
                                    : ''}
                                </CFormSelect>
                                <span style={{ color: 'red' }}>{errors.hrMembers}</span>
                              </CCol>
                              <CCol lg="6">
                                <CFormLabel className="form-control-label" htmlFor="input-status">
                                  Status
                                </CFormLabel>
                                <CFormSelect
                                  name="status"
                                  value={data.status}
                                  onChange={handleChange}
                                >
                                  {status &&
                                    status.map((item) => {
                                      return <option key={item._id}>{item.status}</option>
                                    })}
                                </CFormSelect>
                                <span style={{ color: 'red' }}>{errors.status}</span>
                              </CCol>
                              <CCol lg="6"></CCol>
                            </CRow>
                            <CRow className="mb-3">
                              <CCol lg="">
                                <div className="pl-lg-4">
                                  <CFormLabel>Comments</CFormLabel>
                                  <CFormTextarea
                                    className="form-control-alternative"
                                    placeholder="Feedback of the Candidate Interview"
                                    rows="4"
                                    type="textarea"
                                    name="comments"
                                    value={data.comments}
                                    onChange={handleChange}
                                  />
                                </div>
                              </CCol>
                            </CRow>
                          </div>
                        </CCardBody>
                      </CCol>
                    </CRow>
                  </div>
                  <CCol className="text-right mt-2" xs="4">
                    <CButton color="primary" type="button" size="sm" onClick={handleSubmit}>
                      Update
                    </CButton>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default EditStageForm
