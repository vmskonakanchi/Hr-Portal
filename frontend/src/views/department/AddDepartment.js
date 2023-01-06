import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { addDepartment } from 'src/services/DepartmentService'
import ValidateDepartments from 'src/validations/departments/DepartmentValidate'

const AddDepartment = () => {
    const [data, setData] = useState({
        departments: ''
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

    // Add Department
    const handleSubmit = async (e) => {
      e.preventDefault()
      const newErrors = ValidateDepartments(data)
      setErrors(newErrors)
      if (!Object.keys(newErrors).length) {
        try {
          await addDepartment(data)
          navigate('/departments')
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
                          <CFormLabel className="form-control-label" htmlFor="input-department">
                            Department
                          </CFormLabel>
                          <CFormInput
                            className="form-control-alternative"
                            id="input-department"
                            placeholder="Department"
                            type="text"
                            name="departments"
                            value={data.departments}
                            onChange={handleChange}
                          />
                         {errors.departments && <span style={{ color: 'red' }}>{errors.departments}</span>}
                          {errorsMsg ? <span style={{ color: 'red' }}>{errorsMsg}</span> : ''}
                        </CCol>
                        <CCol lg="6">
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

export default AddDepartment
