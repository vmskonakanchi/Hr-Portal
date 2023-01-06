import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROLES } from 'src/constants/RoleConstant'
import { addStages } from 'src/services/StagesServices'
import ValidateStage from 'src/validations/stageValidate/StageValidate'
// const _user = localStorage.getItem('token')
// const user = JSON.parse(_user)

const AddStages = () => {
  const [data, setData] = useState({
    stage: '',
    roles: '',
  })
  const [errors, setErrors] = useState([])
  const [errorsMsg, setErrorsMsg] = useState([])

  const navigate = useNavigate()

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  // Add Stages
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = ValidateStage(data)
    setErrors(newErrors)
    if (!Object.keys(newErrors).length) {
      try {
        await addStages(data)
        navigate('/stage')
      } catch (error) {
        error.response && setErrors(error.response.data)
        setErrorsMsg(error.response.data.msg)
      }
    }
  }
  return (
    <>
      <CRow>
        <CCol xs={6}>
          <CCard className="bg-light shadow">
            <CContainer className="mt--7" fluid>
              <CForm>
                <CRow>
                  <CCol className="order-xl-1" xl="">
                    <CCardBody>
                      <div className="pl-lg-4">
                        <CRow className="mb-3">
                          <CCol lg="6">
                            <CFormLabel className="form-control-label" htmlFor="input-stage">
                              Stage
                            </CFormLabel>
                            <CFormInput
                              className="form-control-alternative"
                              id="input-stage"
                              placeholder="Stage"
                              type="text"
                              name="stage"
                              value={data.stage}
                              onChange={handleChange}
                            />
                           {errors.stage && <span style={{ color: 'red' }}>{errors.stage}</span>}
                            {errorsMsg ? <span style={{ color: 'red' }}>{errorsMsg}</span> : ''}
                          </CCol>
                          <CCol lg="6">
                            <CFormLabel className="form-control-label">Roles</CFormLabel>
                            <CFormSelect name="roles" value={data.roles} onChange={handleChange}>
                              <option defaultValue>Roles</option>
                              {/* <option>{ROLES.ADMIN}</option> */}
                              <option>{ROLES.DEVELOPER}</option>
                              <option>{ROLES.HR}</option>
                            </CFormSelect>
                            <span style={{ color: 'red' }}>{errors.roles}</span>
                          </CCol>
                        </CRow>
                      </div>
                    </CCardBody>
                  </CCol>
                </CRow>
                <CCol className="text-right mb-2" xs="4">
                  <CButton
                    className="text-white fs-5"
                    color="primary"
                    type="button"
                    size="sm"
                    onClick={handleSubmit}
                  >
                    Add
                  </CButton>
                </CCol>
              </CForm>
            </CContainer>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default AddStages
