import {
  CButton,
  CCard,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ROLES } from 'src/constants/RoleConstant'
import { getCandidateById, updatestageCandidateById } from 'src/services/CandidateService'
import { getStatus } from 'src/services/StatusService'
import ValidateStatus from 'src/validations/candidate/StatusValidate'
const _user = localStorage.getItem('token')
const user = JSON.parse(_user)
const Status = () => {
  const [data, setData] = useState({
    hrComments: '',
    // comments: '',
  })
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState([])

  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    getCandidateById(id).then((res) => setData(res.data))
    getStatus().then((response) => setStatus(response.data))

  }, [id])

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelected = async (e) => {
    e.preventDefault()
    const newErrors = ValidateStatus(data)
    setErrors(newErrors)
    if (!Object.keys(newErrors).length) {
    try {
      await updatestageCandidateById(id, data)
      setData(data)
      navigate('/candidate')
    } catch (error) {
      error.response && setErrors(error.response.data)
      console.log(error)
    }
    }
  }

  return (
    <div>
      <>
        <CRow>
          <CCol xs={6}>
            <CCard className="bg-light shadow">
              <CContainer className="mt--7 p-3" fluid>
                <CForm>
                  <div className="pl-lg-4">
                    <CRow className="mb-3">
                      {user.roles === ROLES.DEVELOPER ? (
                        <CCol lg="6">
                          <CFormLabel className="form-control-label" htmlFor="input-status">
                            dev status
                          </CFormLabel>
                          <CFormSelect
                            name="devStatus"
                            value={data.devStatus}
                            onChange={handleChange}
                          >
                            {status &&
                              status.map((item) => {
                                return <option key={item._id}>{item.status}</option>
                              })}
                          </CFormSelect>
                        </CCol>
                      ) : (
                        <CCol lg="6">
                          <CFormLabel className="form-control-label" htmlFor="input-status">
                            Status
                          </CFormLabel>
                          <CFormSelect name="status" value={data.status} onChange={handleChange}>
                            {status &&
                              status.map((item) => {
                                return <option key={item._id}>{item.status}</option>
                              })}
                          </CFormSelect>
                        </CCol>
                      )}
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-status">
                          Stage
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          type="text"
                          name="stage"
                          value={data.stage}
                          onChange={handleChange}
                          disabled
                        />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-status">
                          HRMembers
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          type="text"
                          name="hrMembers"
                          value={data.hrMembers}
                          onChange={handleChange}
                          disabled
                        />
                      </CCol>
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-status">
                          Developers
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          type="text"
                          name="developers"
                          value={data.developers}
                          onChange={handleChange}
                          disabled
                        />
                      </CCol>
                    </CRow>
                  </div>
                  {user.roles === ROLES.DEVELOPER ? (
                    <div className="pl-lg-4">
                      <CFormLabel>Comment</CFormLabel>
                      <CFormTextarea
                        className="form-control-alternative"
                        placeholder="Feedback of the Candidate Interview dev"
                        rows="4"
                        type="textarea"
                        name="developerComments"
                        value={data.developerComments}
                        onChange={handleChange}
                      />
                      <span style={{ color: 'red' }}>{errors.developerComments}</span>
                    </div>
                  ) : user.roles === ROLES.HR ? (
                    <div className="pl-lg-4">
                      <CFormLabel>Comment</CFormLabel>
                      <CFormTextarea
                        className="form-control-alternative"
                        placeholder="Feedback of the Candidate Interview hr"
                        rows="4"
                        type="textarea"
                        name="hrComments"
                        value={data.hrComments}
                        onChange={handleChange}
                      />
                      <span style={{ color: 'red' }}>{errors.hrComments}</span>
                    </div>
                  ) : (
                    <div className="pl-lg-4">
                      <CFormLabel>Comment</CFormLabel>
                      <CFormTextarea
                        className="form-control-alternative"
                        placeholder="Feedback of the Candidate Interview cc"
                        rows="4"
                        type="textarea"
                        name="comments"
                        value={data.comments}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <CCol className="text-right mt-2" xs="4">
                    <CButton
                      className="me-2 text-white"
                      color="success"
                      type="button"
                      onClick={handleSelected}
                    >
                      Update
                    </CButton>
                  </CCol>
                </CForm>
              </CContainer>
            </CCard>
          </CCol>
        </CRow>
      </>
    </div>
  )
}

export default Status
