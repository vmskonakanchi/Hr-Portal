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
  CRow,
} from '@coreui/react'
import { getUsersById, updateUsersById } from 'src/services/UsersService'
import { DEPARTMENTS, ROLES } from 'src/constants/RoleConstant'
import validate from '../../validations/usersValidate/EditUsersValidate'
import { getDepartments } from 'src/services/DepartmentService'

const EditUsers = () => {
  const [data, setData] = useState({
    employeeId: '',
    name: '',
    email: '',
    department: '',
    status: '',
  })

  const [errors, setErrors] = useState([])
  const [departments, setDepartments] = useState([])

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUsersById(id)
        setData(user.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
    getDepartments().then((response) => setDepartments(response.data))

  }, [id])

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  // Udate Users by Id
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate(data)
    setErrors(newErrors)
    if (!Object.keys(newErrors).length) {
      try {
        await updateUsersById(id, data)
        navigate('/Users')
      } catch (error) {
        console.log(error)
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
                    <h3 className="mb-0">Update {data.name}</h3>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <h6 className="heading-small text-muted mb-4">Users Information</h6>
                  <div className="pl-lg-4">
                    <CRow className="mb-3">
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-employeeid">
                          EmployeeId
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-employeeid"
                          placeholder="EmployeeId"
                          type="text"
                          name="employeeId"
                          value={data.employeeId}
                          onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.employeeId}</span>
                      </CCol>
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-name">
                          Name
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-name"
                          placeholder="Name"
                          type="text"
                          name="name"
                          value={data.name}
                          onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.name}</span>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-email">
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
                        />
                        <span style={{ color: 'red' }}>{errors.email}</span>
                      </CCol>
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-password" hidden>
                          Password
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-password"
                          placeholder="Password"
                          type="password"
                          name="password"
                          value={data.password}
                          onChange={handleChange}
                          hidden
                        />
                        <span style={{ color: 'red' }}>{errors.password}</span>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-department">
                          Department
                        </CFormLabel>
                        <CFormSelect
                          name="department"
                          value={data.department}
                          onChange={handleChange}
                        >
                          <option defaultValue>Departments</option>
                          {departments.map((item, index) => {
                            return <option key={item._id}>{item.departments}</option>
                          })}
                        </CFormSelect>
                        <span style={{ color: 'red' }}>{errors.department}</span>
                      </CCol>
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-phone">
                          Phone
                        </CFormLabel>
                        <CFormInput
                          classphone="form-control-alternative"
                          id="input-phone"
                          placeholder="Phone"
                          type="text"
                          name="phone"
                          value={data.phone}
                          onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.phone}</span>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol lg="6">
                        <CFormLabel className="form-control-label">Roles</CFormLabel>
                        <CFormSelect name="roles" value={data.roles} onChange={handleChange}>
                          <option defaultValue>Roles</option>
                          <option>{ROLES.ADMIN}</option>
                          <option>{ROLES.DEVELOPER}</option>
                          <option>{ROLES.HR}</option>
                        </CFormSelect>
                      </CCol>
                      <CCol lg="6"></CCol>
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

export default EditUsers
