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
import { cilBell, cilPeople } from '@coreui/icons'
import {
  getCandidateById,
  searchByName,
  searchCandidatesByDeveloper,
} from 'src/services/CandidateService'
import { ROLES } from 'src/constants/RoleConstant'
import { getStatus } from 'src/services/StatusService'
import addNotification from 'react-push-notification'

const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const CandidateListEmployee = ({
  handleSort,
  sortValue,
  sortOptions,
  sortDevOptions,
  data,
  setData,
  getCandidate,
  getCandidatesByDevelopers,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [records, setRecords] = useState(0)
  const [visible, setVisible] = useState(false)
  const [devComments, setDevComments] = useState('')

  const [status, setStatus] = useState('')

  const candidateAssigned = []
  for (let i of data) {
    if (i.roles === ROLES.DEVELOPER) {
      candidateAssigned.push(i)
    }
  }
  const navigate = useNavigate()

  // Pagination
  const recordsPerPage = records ? records : 5
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords =
    candidateAssigned.length > 0
      ? candidateAssigned.slice(indexOfFirstRecord, indexOfLastRecord)
      : ''
  const nPages = candidateAssigned ? Math.ceil(candidateAssigned.length / recordsPerPage) : 0

  const [query, setQuery] = useState('')

  // Search By Name, email, Phone Number
  useEffect(() => {
    // if (user.roles === ROLES.ADMIN || user.roles === ROLES.HR) {
    //   if (query) {
    //     const fetchData = async () => {
    //       const res = await searchByName(query)
    //       setData(res.data)
    //     }
    //     fetchData()
    //   } else {
    //     getCandidate()
    //   }
    // } else {
      if (query) {
        const fetchDepartData = async () => {
          await searchCandidatesByDeveloper(query).then((res) => setData(res.data))
        }
        fetchDepartData()
      } else {
        getCandidatesByDevelopers()
      }
    // }
  }, [query])

  useEffect(() => {
    getStatus().then((res) => setStatus(res.data))

  }, [])

  // let count = [];
  // for (let i of candidateAssigned){
  //   if(i.devStatus === 'Pending'){
  //     count.push(i)
  //   }
  // }
  // useEffect(() => {
  //   if(count.length > 0){
  //     addNotification({
  //       title: 'Notification',
  //       // subtitle: 'Candidate Assigned to Interview',
  //       message: `You have ${count.length} Pending`,
  //       duration :'3000',
  //       theme: 'light',
  //       closeButton:"X",
  //       backgroundTop:"lightblue",
  //     })
  //   }
  // },[count.length])

  const handleStatus = (id) => {
    navigate(`/employee/status/${id}`)
  }
  const handleDevComments = (id) => {
    try {
      setVisible(!visible)
      getCandidateById(id).then((res) => setDevComments(res.data))
      setDevComments('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Comments</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm >
            {devComments && <CFormTextarea className='p-2' disabled>{devComments.developerComments}</CFormTextarea>}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CCardHeader className="border-0">
        <CRow className="align-items-center pt-3 px-3">
          <CCol xs="4">
            <h3 className="mb-0">Candidate List</h3>
          </CCol>
          {/* {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && (
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
          )} */}

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
              <CTableHeaderCell>Comments</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
              <CTableHeaderCell>Resume</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody className="text-center">
            {candidateAssigned && candidateAssigned.length > 0 ? (
              currentRecords.map((data, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    {(currentPage - 1) * recordsPerPage + index + 1}
                  </CTableDataCell>
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
                  {/* <CTableDataCell>{data.developerComments}</CTableDataCell> */}
                  <CTableDataCell>
                    {data.developerComments ? data.developerComments.substr(0, 18) : ''}
                    {data.developerComments && data.developerComments.substr(0, 18) ? (
                      <CButton
                        size="sm"
                        color="link"
                        className="p-0"
                        onClick={() => handleDevComments(data._id)}
                      >
                        Read More
                      </CButton>
                    ) : (
                      ''
                    )}
                  </CTableDataCell>
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
                  <CTableDataCell>
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
                  {data.roles === ROLES.DEVELOPER && (
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

export default CandidateListEmployee
