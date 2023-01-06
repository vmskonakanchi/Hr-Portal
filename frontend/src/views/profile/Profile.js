import React, { useEffect } from 'react'
import { useState } from 'react'
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
  CRow,
} from '@coreui/react'
import { updatePassword } from 'src/services/ProfileService'
import validate from 'src/validations/profileValidate/ProfileValidate'
import { getUsersById } from 'src/services/UsersService'
const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const Profile = () => {
  const [data, setData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [name, setName] = useState('')
  const [errors, setErrors] = useState([])
  const [errorsMsg, setErrorsMsg] = useState([])

  useEffect(() => {
    getUsersById(user.id).then((res) => setName(res.data.name))
  }, [])
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
      const { newPassword, confirmPassword } = data
      if (newPassword !== confirmPassword) {
        setErrorsMsg("password didn't match")
      } else {
        try {
          await updatePassword(data)
          localStorage.removeItem('token')
          window.location.reload()
        } catch (error) {
          setErrors(error.response.data.msg)
          setErrorsMsg(error.response.data.msg)
        }
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
                    <h3 className="mb-0">Change {name} Password</h3>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  {errorsMsg.length > 0 ? <span style={{ color: 'red' }}>{errorsMsg}</span> : ''}
                  <h6 className="heading-small text-muted mb-4">Change Password</h6>
                  <div className="pl-lg-4">
                    <CRow className="mb-3">
                      <CCol lg="6" hidden>
                        <CFormLabel className="form-control-label" htmlFor="input-email">
                          Email
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="email"
                          type="text"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                        />
                      </CCol>
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-oldPassword">
                          Old Password
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-oldPassword"
                          placeholder="Old Password"
                          type="password"
                          name="oldPassword"
                          value={data.oldPassword}
                          onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.oldPassword}</span>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-newPassword">
                          New Password
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-newPassword"
                          placeholder="New Password"
                          type="password"
                          name="newPassword"
                          value={data.newPassword}
                          onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.newPassword}</span>
                      </CCol>
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-confirmPassword">
                          Confirm Password
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-confirmPassword"
                          placeholder="Confirm Password"
                          type="password"
                          name="confirmPassword"
                          value={data.confirmPassword}
                          onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
                      </CCol>
                    </CRow>
                  </div>
                  <CCol className="text-right mt-2" xs="4">
                    <CButton
                      className="text-white fs-5"
                      color="primary"
                      type="button"
                      size="sm"
                      onClick={handleSubmit}
                    >
                      Change
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

export default Profile
