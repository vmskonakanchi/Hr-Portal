import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import ValidateStatus from 'src/validations/statusValidate/StatusValidate'
import { getStatusById, updateStatusById } from 'src/services/StatusService'

const EditStatus = () => {
  const [data, setData] = useState({
    status: '',
  })
  const [errors, setErrors] = useState([])
  const [errorsMsg, setErrorsMsg] = useState([])

  const { id } = useParams()
  const navigate = useNavigate()
  // get Status by Id api
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getStatusById(id)
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

  // Update Status By ID
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = ValidateStatus(data)
    setErrors(newErrors)
    if (!Object.keys(newErrors).length) {
      try {
        await updateStatusById(id,data)
        navigate('/status')
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
                            <CFormLabel className="form-control-label" htmlFor="input-status">
                              Status
                            </CFormLabel>
                            <CFormInput
                              className="form-control-alternative"
                              id="input-status"
                              placeholder="Status"
                              type="text"
                              name="status"
                              value={data.status}
                              onChange={handleChange}
                            />
                            {errors.status && (
                              <span style={{ color: 'red' }}>{errors.status}</span>
                            )}
                            {errorsMsg ? <span style={{ color: 'red' }}>{errorsMsg}</span> : ''}
                          </CCol>
                          <CCol lg="6"></CCol>
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
                    Update
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

export default EditStatus
