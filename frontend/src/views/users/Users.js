import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CDropdown,
  CCardFooter,
  CFormSelect,
  CInputGroup,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Pagination from 'src/components/pagination.js/Pagination'
import { cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { deleteUsersById, searchByName, sortByName } from 'src/services/UsersService'
import { getUsers } from 'src/services/UsersService'
import { ROLES } from 'src/constants/RoleConstant'

const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const Users = () => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(10)

  const [deleteId, setDeleteId] = useState('')
  const [visible, setVisible] = useState(false)

  const [search, setSearch] = useState('')
  const [sortValue, setSortValue] = useState('')

  const sortOptions = ['name', 'email', 'roles']

  const navigate = useNavigate()

  // get all Users
  const fetchData = () => {
    getUsers().then((response) => setData(response.data))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    navigate('/users/add')
  }

  const handleDelete = (id) => {
    try {
      setVisible(!visible)
      setDeleteId(id)
    } catch (error) {
      console.log(error)
    }
  }

  // delete user by ID
  const handleDeleteItem = async () => {
    try {
      await deleteUsersById(deleteId)
      setData(data.filter((item) => item.id !== deleteId))
      setVisible(false)
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord)
  const nPages = Math.ceil(data.length / recordsPerPage)

  // Search by name, email, phone number
  const handleSearch = async (e) => {
    setSearch(e.target.value)
    const key = e.target.value
    if (key) {
      const result = await searchByName(key)
      setData(result.data)
    } else {
      fetchData()
    }
  }

  // Sort by name, email, source in ascending order
  const handleSort = async (e) => {
    let value = e.target.value
    setSortValue(value)
    try {
      await sortByName(value).then((response) => {
        setData(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
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

      <CContainer className="mt--7" fluid>
        <CRow>
          <CCol xs>
            <CCard className="mb-4 shadow">
              <CCardHeader className="border-0">
                <CRow className="align-items-center p-3">
                  <CCol xs="4">
                    <h3 className="mb-0">Employees List</h3>
                  </CCol>
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
                  <CCol xs="4" className="text-end">
                    <CInputGroup>
                      <CFormInput
                        placeholder="Search"
                        type="text"
                        value={search}
                        onChange={handleSearch}
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol className="text-end" xs="2">
                    {user.roles === ROLES.ADMIN && (
                      <CButton
                        className="text-white fs-5"
                        color="success"
                        type="button"
                        onClick={handleClick}
                      >
                        Add
                      </CButton>
                    )}
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell className="text-center">
                        <CIcon icon={cilPeople} />
                      </CTableHeaderCell>
                      <CTableHeaderCell>Employee Id</CTableHeaderCell>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Email</CTableHeaderCell>
                      <CTableHeaderCell>Department</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Phone</CTableHeaderCell>
                      <CTableHeaderCell>Roles</CTableHeaderCell>
                      {user.roles === ROLES.ADMIN && <CTableHeaderCell>Action</CTableHeaderCell>}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.length > 0 ? (
                      currentRecords.map((data, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          {data.roles[0] !== ROLES.ADMIN ? (
                            <>
                              <CTableDataCell className="text-center">
                                {(currentPage - 1) * recordsPerPage + index + 1}
                              </CTableDataCell>
                              <CTableDataCell>{data.employeeId}</CTableDataCell>
                              <CTableDataCell scope="row">
                                <NavLink
                                  className="text-decoration-none"
                                  to={`/users/view/${data._id}`}
                                >
                                  <span className="mb-0 text-sm">{data.name}</span>
                                </NavLink>
                              </CTableDataCell>
                              <CTableDataCell>{data.email}</CTableDataCell>
                              <CTableDataCell>{data.department}</CTableDataCell>
                              <CTableDataCell className="text-center">{data.phone}</CTableDataCell>
                              <CTableDataCell>
                                {data.roles[0] === ROLES.HR ? (
                                  <CTableDataCell>
                                    <CButton
                                      className="text-white"
                                      color="warning"
                                      shape="rounded-pill"
                                      disabled
                                    >
                                      {data.roles}
                                    </CButton>
                                  </CTableDataCell>
                                ) : data.roles[0] === ROLES.DEVELOPER ? (
                                  <CTableDataCell>
                                    <CButton
                                      className="text-white"
                                      color="success"
                                      shape="rounded-pill"
                                      disabled
                                    >
                                      {data.roles}
                                    </CButton>
                                  </CTableDataCell>
                                ) : (
                                  <CTableDataCell>
                                    <CButton
                                      className="text-white"
                                      color="danger"
                                      shape="rounded-pill"
                                      disabled
                                    >
                                      {data.roles}
                                    </CButton>
                                  </CTableDataCell>
                                )}
                              </CTableDataCell>
                              {user.roles === ROLES.ADMIN && (
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
                                          to={`/users/view/${data._id}`}
                                        >
                                          View
                                        </NavLink>
                                      </CDropdownItem>
                                      <CDropdownItem>
                                        <NavLink
                                          className="text-decoration-none text-dark"
                                          to={`/users/edit/${data._id}`}
                                        >
                                          Edit
                                        </NavLink>
                                      </CDropdownItem>
                                      <CDropdownItem onClick={() => handleDelete(data._id)}>
                                        <NavLink className="text-decoration-none text-dark">
                                          Delete
                                        </NavLink>
                                      </CDropdownItem>
                                    </CDropdownMenu>
                                  </CDropdown>
                                </CTableDataCell>
                              )}
                            </>
                          ) : (
                            ''
                          )}
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan={8}>
                          <h3 className='text-center'>No Data</h3>
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
                <CCardFooter className="py-4">
                  <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </CCardFooter>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Users
