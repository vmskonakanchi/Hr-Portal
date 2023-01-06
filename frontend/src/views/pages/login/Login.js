import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import validate from '../../../validations/loginValidate/LoginValidate'

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState([])
  const [errorsmsg, setErrorsMsg] = useState([])

  const navigate = useNavigate()
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate(data)
    setErrors(newErrors)
    if (!Object.keys(newErrors).length) {
      try {
        const res = await axios.post(`http://${window.location.hostname}:5000/api/v1/users/login`, data)
        localStorage.setItem('token', JSON.stringify(res.data))
        navigate('/dashboard')
        window.location.assign('/')
      } catch (error) {
        setErrorsMsg(error.response.data.msg)
      }
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    {errorsmsg && <span style={{ color: 'red' }}>{errorsmsg}</span>}
                    {errors.email
                      ? errors && <span style={{ color: 'red' }}>{errors.email}</span>
                      : errors && <span style={{ color: 'red' }}>{errors.password}</span>}
                    <CRow className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          name="email"
                          type="email"
                          value={data.email}
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CRow>
                    <CRow className="mb-4">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={data.password}
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CRow>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' color="primary" className="px-4" onClick={handleSubmit}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
