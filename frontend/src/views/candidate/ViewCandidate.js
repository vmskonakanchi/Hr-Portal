import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
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
  CFormTextarea,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { getCandidateById } from 'src/services/CandidateService'
import { ROLES } from 'src/constants/RoleConstant'
import moment from 'moment/moment'
const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const ViewCandidate = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    source: '',
    department: '',
    skills: '',
    comments: '',
    status: '',
  })
  const [visible, setVisible] = useState(false)
  const [stage, setStage] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()

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

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleClick = () => {
    navigate('/candidate')
  }

  const handleShow = (item) => {
    setVisible(!visible)
    setStage(item)
  }
  return (
    <>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            <CRow className="mx-auto">
              <CCol>
                <CCol>{stage.stage}</CCol>
                <CCol>{stage.date}</CCol>
              </CCol>
            </CRow>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer className="mt--7" fluid>
            <CRow>
              <CCol className="order-xl-1" xl="">
                <div className="pl-lg-4">
                  <CRow className="mb-3">
                    <CCol>
                      <div className="d-flex">
                        <CCol className="mt-2">
                          <CFormLabel className="form-control-label " htmlFor="input-employeeid">
                            Name
                          </CFormLabel>
                        </CCol>
                        <CCol>
                          {stage.roles === ROLES.DEVELOPER ? (
                            <CFormInput
                              className="form-control-alternative bg-light"
                              id="input-name"
                              value={stage.developers}
                              disabled
                            />
                          ) : (
                            <CFormInput
                              className="form-control-alternative bg-light"
                              id="input-name"
                              value={stage.hrMembers}
                              disabled
                            />
                          )}
                        </CCol>
                      </div>
                      <div className="d-flex">
                        <CCol className="mt-2">
                          <CFormLabel className="form-control-label " htmlFor="input-department">
                            Status
                          </CFormLabel>
                        </CCol>
                        <CCol>
                          {stage.roles === ROLES.DEVELOPER ? (
                            <CFormInput
                              className="form-control-alternative bg-light"
                              id="input-name"
                              value={stage.devStatus}
                              disabled
                            />
                          ) : (
                            <CFormInput
                              className="form-control-alternative bg-light"
                              id="input-name"
                              value={stage.status}
                              disabled
                            />
                          )}
                        </CCol>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CFormLabel className="form-control-label " htmlFor="input-phone">
                        Comments
                      </CFormLabel>
                      {stage.roles === ROLES.DEVELOPER ? (
                        <CFormTextarea
                          className="form-control-alternative bg-light"
                          id="input-name"
                          value={stage.developerComments}
                          disabled
                        />
                      ) : (
                        <CFormTextarea
                          className="form-control-alternative bg-light"
                          id="input-name"
                          value={stage.hrComments}
                          disabled
                        />
                      )}
                    </CCol>
                  </CRow>
                </div>
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CContainer className="mt--7" fluid>
        <CRow>
          <CCol className="order-xl-1" xl="7">
            <CCard className="bg-light shadow">
              <CCardHeader className="bg-white border-0">
                <CRow className="align-items-center">
                  <CCol xs="8">
                    <h3 className="mb-0">View {data.name}</h3>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <h6 className="heading-small text-muted mb-3">Candidate Information</h6>
                  <div className="pl-lg-4">
                    <CRow className="mb-2">
                      <CCol lg="6" className="d-flex">
                        <CFormLabel className="form-control-label me-4 mt-2" htmlFor="input-name">
                          Name
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-name"
                          placeholder="name"
                          type="text"
                          name="name"
                          value={data.name}
                          onChange={handleChange}
                          disabled
                        />
                      </CCol>
                      <CCol lg="6" className="d-flex ">
                        <CFormLabel className="form-control-label me-4 mt-2" htmlFor="input-email">
                          Email
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="Email"
                          type="email"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                          disabled
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol lg="6" className="d-flex">
                        <CFormLabel
                          className="form-control-label me-4 mt-2"
                          htmlFor="input-experience"
                        >
                          Experience
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-experience"
                          placeholder="Experience"
                          type="text"
                          name="experience"
                          value={data.experience}
                          onChange={handleChange}
                          disabled
                        />
                      </CCol>
                      <CCol lg="6" className="d-flex">
                        <CFormLabel className="form-control-label me-4 mt-2" htmlFor="input-source">
                          Source
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-source"
                          placeholder="Source"
                          type="text"
                          name="source"
                          value={data.source}
                          onChange={handleChange}
                          disabled
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol lg="6" className="d-flex">
                        <CFormLabel
                          className="form-control-label me-4 mt-2"
                          htmlFor="input-department"
                        >
                          Department
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-department"
                          placeholder="department"
                          type="department"
                          name="department"
                          value={data.department}
                          onChange={handleChange}
                          disabled
                        />
                      </CCol>
                      <CCol lg="6" className="d-flex">
                        <CFormLabel className="form-control-label me-4 mt-2" htmlFor="input-skills">
                          Skills
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-skills"
                          placeholder="Skills"
                          type="text"
                          name="skills"
                          value={data.skills}
                          onChange={handleChange}
                          disabled
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol lg="6" className="d-flex">
                        <CFormLabel
                          className="form-control-label me-4 mt-2"
                          htmlFor="input-position"
                        >
                          Position
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-position"
                          placeholder="Position"
                          type="position"
                          name="position"
                          value={data.position}
                          onChange={handleChange}
                          disabled
                        />
                      </CCol>
                      <CCol lg="6" className="d-flex">
                        <CFormLabel className="form-control-label me-4 mt-2" htmlFor="input-salary">
                          Salary
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-salary"
                          placeholder="Salary"
                          type="text"
                          name="salary"
                          value={data.salary}
                          onChange={handleChange}
                          disabled
                        />
                      </CCol>
                    </CRow>
                  </div>
                  <hr className="my-2" />
                  <h6 className="heading-small text-muted">Contact information</h6>
                  <div className="pl-lg-4">
                    <CRow className="mb-2">
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-phone">
                          Phone
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-phone"
                          placeholder="Phone"
                          type="text"
                          name="phone"
                          value={data.phone}
                          onChange={handleChange}
                          disabled
                        />
                      </CCol>
                      <CCol lg="6"></CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol md="12">
                        <CFormLabel className="form-control-label" htmlFor="input-location">
                          location
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-location"
                          placeholder="Home location"
                          type="text"
                          name="location"
                          value={data.location}
                          onChange={handleChange}
                          disabled
                        />
                      </CCol>
                    </CRow>
                  </div>
                  <hr className="my-2" />
                  <h6 className="heading-small text-muted">Comments</h6>
                  <div className="pl-lg-4">
                    <CFormLabel>Feedback</CFormLabel>
                    <CFormTextarea
                      className="form-control-alternative"
                      placeholder="Feedback of the Candidate Interview"
                      rows="4"
                      type="textarea"
                      name="comments"
                      value={data.comments}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                  <CCol className="text-end mt-2" onClick={handleClick}>
                    <CButton color="primary" type="button">
                      Back
                    </CButton>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
          {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && (
            <CCol className="order-xl-1" xl="5">
              <CCard className="bg-light shadow">
                <CCardHeader className="bg-secondary border-0">
                  <CRow className="align-items-center mb-2">
                    <CCol className="px-3">
                      <h4>Candidates Stages</h4>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CRow className="px-3">
                    <CCol xs={5}>
                      <CFormLabel className="form-control-label" htmlFor="input-employeeid">
                        <h5>Stage</h5>
                      </CFormLabel>
                    </CCol>
                    <CCol xs={3}>
                      <CFormLabel className="form-control-label" htmlFor="input-employeeid">
                        <h5>Status</h5>
                      </CFormLabel>
                    </CCol>
                    <CCol xs={3}>
                      <CFormLabel className="form-control-label" htmlFor="input-employeeid">
                        <h5>Date</h5>
                      </CFormLabel>
                    </CCol>
                  </CRow>
                  {data.stages
                    ? data.stages.map((item, index) => {
                        return (
                          <CCol className="" key={index}>
                            <CRow>
                              <CCol xs={5}>
                                <CFormLabel
                                  className="form-control-label "
                                  htmlFor="input-employeeid"
                                >
                                  <CButton
                                    size="sm"
                                    className="bg-light text-info border border-0 px-0"
                                    onClick={() => handleShow(item)}
                                  >
                                    <h6>{item.stage}</h6>
                                  </CButton>
                                </CFormLabel>
                              </CCol>
                              <CCol xs={3}>
                                {item.roles === ROLES.HR ? (
                                  item.status === 'Selected' ? (
                                    <CFormLabel
                                      className="form-control-label text-success"
                                      htmlFor="input-employeeid"
                                    >
                                      {item.status}
                                    </CFormLabel>
                                  ) : item.status === 'Rejected' ? (
                                    <CFormLabel
                                      className="form-control-label text-danger"
                                      htmlFor="input-employeeid"
                                    >
                                      {item.status}
                                    </CFormLabel>
                                  ) : (
                                    <CFormLabel
                                      className="form-control-label text-warning"
                                      htmlFor="input-employeeid"
                                    >
                                      {item.status}
                                    </CFormLabel>
                                  )
                                ) : (
                                  item.roles === ROLES.DEVELOPER &&
                                  (item.devStatus === 'Selected' ? (
                                    <CFormLabel
                                      className="form-control-label text-success"
                                      htmlFor="input-employeeid"
                                    >
                                      {item.devStatus}
                                    </CFormLabel>
                                  ) : item.devStatus === 'Rejected' ? (
                                    <CFormLabel
                                      className="form-control-label text-danger"
                                      htmlFor="input-employeeid"
                                    >
                                      {item.devStatus}
                                    </CFormLabel>
                                  ) : (
                                    <CFormLabel
                                      className="form-control-label text-warning"
                                      htmlFor="input-employeeid"
                                    >
                                      {item.devStatus}
                                    </CFormLabel>
                                  ))
                                )}
                              </CCol>
                              <CCol xs={4}>{moment(item.date).utc().format('YYYY/MM/DD')}</CCol>
                            </CRow>
                          </CCol>
                        )
                      })
                    : ''}
                </CCardBody>
              </CCard>
            </CCol>
          )}
        </CRow>
      </CContainer>
    </>
  )
}

export default ViewCandidate
