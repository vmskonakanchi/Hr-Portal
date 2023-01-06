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
import { ROLES } from 'src/constants/RoleConstant'
import { deleteStagesById, getStages } from 'src/services/StagesServices'

const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const Stages = () => {
  const [data, setData] = useState({
    stage: '',
    roles: '',
  })
  const [deleteId, setDeleteId] = useState('')
  const [visible, setVisible] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(10)
  const navigate = useNavigate()

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = data.length > 0 ? data.slice(indexOfFirstRecord, indexOfLastRecord) : ''
  const nPages = data ? Math.ceil(data.length / recordsPerPage) : 0

  const fetchData = () => {
    getStages().then((response) => setData(response.data))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAdd = () => {
    navigate('/stage/add')
  }

  const handleDelete = (id) => {
    try {
      setVisible(!visible)
      setDeleteId(id)
    } catch (error) {
      console.log(error)
    }
  }

  // API for Delete stage by id
  const handleDeleteItem = async () => {
    try {
      await deleteStagesById(deleteId)
      setData(data.filter((item) => item.id !== deleteId))
      setVisible(false)
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Delete Stage</CModalTitle>
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
                  <CCol xs="10">
                    <h3 className="mb-0">Stages</h3>
                  </CCol>
                  <CCol className="text-end" xs="2">
                    {user.roles === ROLES.ADMIN && (
                      <CButton
                        className="text-white fs-5"
                        color="success"
                        type="button"
                        onClick={handleAdd}
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
                      <CTableHeaderCell>Stage</CTableHeaderCell>
                      <CTableHeaderCell>Role</CTableHeaderCell>
                      {user.roles === ROLES.ADMIN && <CTableHeaderCell>Action</CTableHeaderCell>}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {data.length > 0
                      ? currentRecords.map((data, index) => (
                          <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell className="text-center">
                              {(currentPage - 1) * recordsPerPage + index + 1}
                            </CTableDataCell>
                            <CTableDataCell>{data.stage}</CTableDataCell>
                            <CTableDataCell>{data.roles}</CTableDataCell>

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
                                        to={`/stage/edit/${data._id}`}
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
                          </CTableRow>
                        ))
                      : ''}
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

export default Stages
