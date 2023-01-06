/* eslint-disable react/prop-types */
import {
  CButton,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CDropdown,
  CCardFooter,
  CInputGroup,
  CFormInput,
  CFormSelect,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CCardBody,
  CTableBody,
  CModalHeader,
  CModalTitle,
  CModal,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CContainer,
  CForm,
  CCard,
  CFormTextarea,
} from '@coreui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Pagination from 'src/components/pagination.js/Pagination'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import {
  deleteCandidateById,
  getCandidateById,
  searchByName,
  searchCandidatesByDeveloper,
} from 'src/services/CandidateService'
import { ROLES } from 'src/constants/RoleConstant'
import moment from 'moment/moment'
import { getStatus } from 'src/services/StatusService'

const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const CandidateList = ({
  handleSort,
  sortValue,
  order,
  sortOptions,
  sortDevOptions,
  handleClick,
  data,
  setData,
  getCandidate,
  // getCandidatesByDevelopers,
}) => {
  const [deleteId, setDeleteId] = useState('')
  const [visible, setVisible] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [records, setRecords] = useState(0)

  const [devItems, setDevItem] = useState('')
  const [hrItem, setHrItem] = useState('')
  const [status, setStatus] = useState('')

  const [vis, setvis] = useState(false)
  const [vis1, setvis1] = useState(false)

  const navigate = useNavigate()

  // Pagination
  const recordsPerPage = records ? records : 5
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = data.length > 0 ? data.slice(indexOfFirstRecord, indexOfLastRecord) : ''
  const nPages = data ? Math.ceil(data.length / recordsPerPage) : 0

  const handleDelete = (id) => {
    try {
      setVisible(!visible)
      setDeleteId(id)
      setvis(false)
    } catch (error) {
      console.log(error)
    }
  }

  // Delete Candidates by ID
  const handleDeleteItem = async () => {
    try {
      await deleteCandidateById(deleteId)
      setData(data.filter((item) => item.id !== deleteId))
      setVisible(false)
      // if (user.roles === ROLES.ADMIN) {
        getCandidate()
      // }
      // else {
      //   getCandidatesByDevelopers()
      // }
    } catch (error) {
      console.log(error)
    }
  }
  const [query, setQuery] = useState('')

  // Search By Name, email, Phone Number
  useEffect(() => {
    if (user.roles === ROLES.ADMIN || user.roles === ROLES.HR) {
      if (query) {
        const fetchData = async () => {
          const res = await searchByName(query)
          setData(res.data)
        }
        fetchData()
      } else {
        getCandidate()
      }
    }
    // else {
    //   if (query) {
    //     const fetchDepartData = async () => {
    //       await searchCandidatesByDeveloper(query).then((res) => setData(res.data))
    //     }
    //     fetchDepartData()
    //   } else {
    //     getCandidatesByDevelopers()
    //   }
    // }
  }, [query])

  useEffect(() => {
    getStatus().then((res) => setStatus(res.data))
  }, [])

  const handleShow = (id) => {
    try {
      setVisible(!visible)
      setDeleteId(id)
      getCandidateById(id).then((res) => setDevItem(res.data))
      setvis(true)
      setvis1(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handlehrShow = (id) => {
    try {
      setVisible(!visible)
      setDeleteId(id)
      getCandidateById(id).then((res) => setHrItem(res.data))
      setvis1(true)
      setvis(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleStatus = (id) => {
    navigate(`/candidate/status/${id}`)
  }

  // const onButtonClick = () => {
  //   // using Java Script method to get PDF file
  //   fetch('resume_1669613270909', config).then((response) => {
  //     response.blob().then((blob) => {
  //       // Creating new object of PDF file
  //       const fileURL = window.URL.createObjectURL(blob)
  //       // Setting various property values
  //       let alink = document.createElement('a')
  //       alink.href = fileURL
  //       alink.download = 'resume_1669613270909'
  //       alink.click()
  //     })
  //   })
  // }

  return (
    <>
      {!vis ? (
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Delete</CModalTitle>
          </CModalHeader>
          <CModalBody>Are You sure want to delete ?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={handleDeleteItem}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      ) : !vis1 ? (
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CCard className="bg-light shadow">
            <CForm>
              <CModalHeader>
                <CModalTitle>{devItems.developers}</CModalTitle>
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
                                <CFormLabel
                                  className="form-control-label "
                                  htmlFor="input-employeeid"
                                >
                                  Name
                                </CFormLabel>
                              </CCol>
                              <CCol>
                                <CFormInput
                                  className="form-control-alternative bg-light"
                                  id="input-name"
                                  value={devItems.developers}
                                  disabled
                                />
                              </CCol>
                            </div>
                            <div className="d-flex">
                              <CCol className="mt-2">
                                <CFormLabel className="form-control-label " htmlFor="input-email">
                                  Stage
                                </CFormLabel>
                              </CCol>
                              <CCol>
                                {devItems.stages &&
                                  devItems.stages.map((item, index) => {
                                    return (
                                      (item.roles === ROLES.DEVELOPER ||
                                        item.roles[0] === ROLES.DEVELOPER) && (
                                        <CFormInput
                                          key={index}
                                          className="form-control-alternative bg-light"
                                          id="input-email"
                                          value={item.stage}
                                          disabled
                                        />
                                      )
                                    )
                                  })}
                              </CCol>
                            </div>
                            <div className="d-flex">
                              <CCol className="mt-2">
                                <CFormLabel
                                  className="form-control-label "
                                  htmlFor="input-department"
                                >
                                  Status
                                </CFormLabel>
                              </CCol>
                              <CCol>
                                <CFormInput
                                  className="form-control-alternative bg-light"
                                  id="input-department"
                                  value={devItems.devStatus}
                                  disabled
                                />
                              </CCol>
                            </div>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <CFormLabel className="form-control-label " htmlFor="input-phone">
                              Comments
                            </CFormLabel>
                            <CFormTextarea
                              className="bg-light"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              value={devItems.developerComments}
                              disabled
                            />
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
            </CForm>
          </CCard>
        </CModal>
      ) : (
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CCard className="bg-light shadow">
            <CForm>
              <CModalHeader>
                <CModalTitle>{hrItem.hrMembers}</CModalTitle>
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
                                <CFormLabel
                                  className="form-control-label "
                                  htmlFor="input-employeeid"
                                >
                                  Name
                                </CFormLabel>
                              </CCol>
                              <CCol>
                                <CFormInput
                                  className="form-control-alternative bg-light"
                                  id="input-name"
                                  placeholder="name"
                                  type="text"
                                  name="name"
                                  value={hrItem.hrMembers}
                                  disabled
                                />
                              </CCol>
                            </div>
                            <div className="d-flex">
                              <CCol className="mt-2">
                                <CFormLabel className="form-control-label " htmlFor="input-email">
                                  Stage
                                </CFormLabel>
                              </CCol>
                              <CCol>
                                <CFormInput
                                  className="form-control-alternative bg-light"
                                  id="input-email"
                                  placeholder="email"
                                  type="email"
                                  name="email"
                                  value={hrItem.stage}
                                  disabled
                                />
                              </CCol>
                            </div>
                            <div className="d-flex">
                              <CCol className="mt-2">
                                <CFormLabel
                                  className="form-control-label "
                                  htmlFor="input-department"
                                >
                                  Status
                                </CFormLabel>
                              </CCol>
                              <CCol>
                                <CFormInput
                                  className="form-control-alternative bg-light"
                                  id="input-department"
                                  placeholder="department"
                                  type="text"
                                  name="department"
                                  value={hrItem.status}
                                  disabled
                                />
                              </CCol>
                            </div>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <CFormLabel className="form-control-label " htmlFor="input-phone">
                              HR Comments
                            </CFormLabel>
                            <CFormTextarea
                              className="bg-light"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              text="Must be 8-20 words long."
                              value={hrItem.hrComments}
                              disabled
                            />
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
            </CForm>
          </CCard>
        </CModal>
      )}

      <CCardHeader className="border-0">
        <CRow className="align-items-center pt-3 px-3">
          <CCol xs="4">
            <h3 className="mb-0">Candidate List</h3>
          </CCol>
          {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && (
            <CCol xs="2">
              <CFormSelect onChange={handleSort} value={sortValue}>
                <option defaultValue>Sort By</option>
                {sortOptions.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  )
                })}
              </CFormSelect>
            </CCol>
          )}

          {user.roles === ROLES.DEVELOPER && (
            <CCol xs="2">
              <CFormSelect onChange={handleSort} value={sortValue}>
                <option defaultValue>Sort By</option>
                {sortDevOptions.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  )
                })}
              </CFormSelect>
            </CCol>
          )}
          {/* <CCol xs="2">
            <CFormSelect onChange={handleSort} value={order}>
              <option value='ASC'>ASC</option>
              <option value='DESC'>DESC</option>
            </CFormSelect>
          </CCol> */}
          <CCol xs="4" className="text-end">
            <CInputGroup>
              <CFormInput
                placeholder="Search"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
              />
            </CInputGroup>
          </CCol>
          {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && (
            <CCol className="text-end" xs="2">
              <CButton
                className="text-white fs-5"
                color="success"
                type="button"
                onClick={handleClick}
              >
                Add
              </CButton>
            </CCol>
          )}
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-2">
          <CCol xs="10"></CCol>
          <CCol xs="2">
            <CFormSelect
              className="w-50"
              value={records}
              onChange={(e) => setRecords(e.target.value)}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </CFormSelect>
          </CCol>
        </CRow>

        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow className="text-center">
              <CTableHeaderCell className="text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Location</CTableHeaderCell>
              <CTableHeaderCell>Experience</CTableHeaderCell>
              <CTableHeaderCell>Highest Qualification</CTableHeaderCell>
              <CTableHeaderCell>Source</CTableHeaderCell>
              <CTableHeaderCell>Department</CTableHeaderCell>
              <CTableHeaderCell>Skills</CTableHeaderCell>
              <CTableHeaderCell>Position</CTableHeaderCell>
              {user.roles === ROLES.DEVELOPER && <CTableHeaderCell>Comments</CTableHeaderCell>}

              {user.roles === ROLES.ADMIN && <CTableHeaderCell>Salary</CTableHeaderCell>}
              {user.roles === ROLES.ADMIN && <CTableHeaderCell>Comment</CTableHeaderCell>}
              {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && (
                <CTableHeaderCell>Developer</CTableHeaderCell>
              )}

              {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && (
                <CTableHeaderCell>HR</CTableHeaderCell>
              )}
              <CTableHeaderCell className="text-center">Status</CTableHeaderCell>

              {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && (
                <CTableHeaderCell className="text-center">Stage</CTableHeaderCell>
              )}
              <CTableHeaderCell>Resume</CTableHeaderCell>
              {user.roles === ROLES.ADMIN && <CTableHeaderCell>Date</CTableHeaderCell>}
              {(user.roles === ROLES.DEVELOPER || user.roles === ROLES.HR) && (
                <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
              )}
              {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && (
                <CTableHeaderCell>Action</CTableHeaderCell>
              )}
            </CTableRow>
          </CTableHead>
          <CTableBody className="text-center">
            {data && data.length > 0 ? (
              currentRecords.map((data, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    {(currentPage - 1) * recordsPerPage + index + 1}
                  </CTableDataCell>
                  {/* <CTableDataCell scope="col">
                            <CAvatar
                                  alt="..."
                                  src={require("../../assets/images/avatars/7.jpg")}
                                />
                          </CTableDataCell> */}
                  <CTableDataCell scope="row">
                    <NavLink className="text-decoration-none" to={`/candidate/view/${data._id}`}>
                      <span className="mb-0 text-sm">{data.name}</span>
                    </NavLink>
                  </CTableDataCell>
                  <CTableDataCell>{data.email}</CTableDataCell>
                  <CTableDataCell>{data.phone}</CTableDataCell>
                  <CTableDataCell>{data.location}</CTableDataCell>
                  <CTableDataCell>{data.experience}</CTableDataCell>
                  <CTableDataCell>{data.qualification}</CTableDataCell>
                  <CTableDataCell>{data.source}</CTableDataCell>
                  <CTableDataCell>{data.department}</CTableDataCell>
                  <CTableDataCell>{data.skills}</CTableDataCell>
                  <CTableDataCell>{data.position}</CTableDataCell>
                  {user.roles === ROLES.DEVELOPER && data.roles === ROLES.DEVELOPER && (
                    <CTableDataCell>{data.developerComments}</CTableDataCell>
                  )}

                  {user.roles === ROLES.ADMIN && <CTableDataCell>{data.salary}</CTableDataCell>}
                  {user.roles === ROLES.ADMIN && <CTableDataCell>{data.comments}</CTableDataCell>}
                  {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && (
                    <CTableDataCell>
                      <CButton
                        size="sm"
                        color="link"
                        className="p-0 text-decoration-none fs-5 text-sm"
                        onClick={() => handleShow(data._id)}
                      >
                        {data.developers}
                      </CButton>
                    </CTableDataCell>
                  )}

                  {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && (
                    <CTableDataCell>
                      <CButton
                        size="sm"
                        color="link"
                        className="p-0 text-decoration-none fs-5"
                        onClick={() => handlehrShow(data._id)}
                      >
                        {data.hrMembers}
                      </CButton>
                    </CTableDataCell>
                  )}

                  <CTableDataCell>
                    {status.length !== 0 &&
                      (((user.roles === ROLES.ADMIN || user.roles === ROLES.HR) &&
                        data.roles === ROLES.DEVELOPER) ||
                        user.roles === ROLES.DEVELOPER) &&
                      (data.devStatus === status[0].status ? (
                        <CTableDataCell className="text-warning">{data.devStatus}</CTableDataCell>
                      ) : data.devStatus === status[1].status ? (
                        <CTableDataCell className="text-success">{data.devStatus}</CTableDataCell>
                      ) : (
                        <CTableDataCell className="text-danger">{data.devStatus}</CTableDataCell>
                      ))}
                    {status.length !== 0 &&
                      (user.roles === ROLES.ADMIN || user.roles === ROLES.HR) &&
                      data.roles === ROLES.HR &&
                      (data.status === status[0].status ? (
                        <CTableDataCell className="text-warning">{data.status}</CTableDataCell>
                      ) : data.status === status[1].status ? (
                        <CTableDataCell className="text-success">{data.status}</CTableDataCell>
                      ) : (
                        <CTableDataCell className="text-danger">{data.status}</CTableDataCell>
                      ))}
                  </CTableDataCell>
                  {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && (
                    <CTableDataCell>
                      <CButton color="success" type="button" className="">
                        <NavLink
                          className="text-decoration-none text-white"
                          to={`/candidate/stage/${data._id}`}
                        >
                          {data.stage}
                        </NavLink>
                      </CButton>
                    </CTableDataCell>
                  )}
                  <CTableDataCell>
                    {/* <CButton
                      size="md"
                      color="link"
                      className="p-0 text-decoration-none fs-5"
                      onClick={onButtonClick}
                    >
                      {data.resume}
                    </CButton> */}
                    <a
                      className="text-decoration-none"
                      href={`http://${window.location.hostname}:5000/uploads/${data.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      download={data.resume}
                    >
                      Resume
                    </a>
                  </CTableDataCell>
                  {user.roles === ROLES.ADMIN && (
                    <CTableDataCell>{moment(data.date).utc().format('YYYY/MM/DD')}</CTableDataCell>
                  )}
                  {(user.roles === ROLES.HR ||
                    (user.roles === ROLES.DEVELOPER && data.roles === ROLES.DEVELOPER)) && (
                    <CTableDataCell>
                      <CButton
                        color="info"
                        className="text-white"
                        size="sm"
                        onClick={() => handleStatus(data._id)}
                      >
                        Status
                      </CButton>
                    </CTableDataCell>
                  )}
                  {/* {(user.roles === ROLES.DEVELOPER) && (
                    (data.roles === ROLES.DEVELOPER)&&(<CTableDataCell>
                      <CButton
                        color="info"
                        className="text-white"
                        size="sm"
                        onClick={() => handleStatus(data._id)}
                      >
                        Status
                      </CButton>
                    </CTableDataCell>
                  ))} */}
                  {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && (
                    <CTableDataCell className="text-right">
                      <CDropdown>
                        <CDropdownToggle
                          color=""
                          className="btn-icon-only text-dark"
                          role="button"
                          size="sm"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>
                            <NavLink
                              className="text-decoration-none text-dark"
                              to={`/candidate/view/${data._id}`}
                            >
                              View
                            </NavLink>
                          </CDropdownItem>
                          <CDropdownItem>
                            <NavLink
                              className="text-decoration-none text-dark"
                              to={`/candidate/edit/${data._id}`}
                            >
                              Edit
                            </NavLink>
                          </CDropdownItem>
                          <CDropdownItem onClick={() => handleDelete(data._id)}>
                            <NavLink className="text-decoration-none text-dark">Delete</NavLink>
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  )}
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan={15}>
                  <h3>No Data</h3>
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
        <CCardFooter className="py-4">
          <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </CCardFooter>
      </CCardBody>
    </>
  )
}

export default CandidateList
