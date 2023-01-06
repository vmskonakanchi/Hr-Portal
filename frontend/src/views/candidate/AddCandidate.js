import React, { useEffect } from 'react'
import { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
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
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { cilCloudDownload } from '@coreui/icons'
import validate from '../../validations/candidate/CandidateValidate'
import { addCandidate } from 'src/services/CandidateService'
import { DEPARTMENTS } from 'src/constants/RoleConstant'
import { getStages } from 'src/services/StagesServices'
import { getDepartments } from 'src/services/DepartmentService'
import { getStatus } from 'src/services/StatusService'
const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const AddCandidate = () => {
  const [stages, setStages] = useState([])
  const [departments, setDepartments] = useState([])

  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    source: '',
    department: '',
    skills: '',
    experience: '0 Years',
    qualification: '',
    position: '',
    salary: '',
    recruiter: user.id,
    comments: '',
    status: '',
    resume: '',
    stage: '',
  })

  const [status, setStatus] = useState([])
  const [errors, setErrors] = useState([])
  const [errorsMsg, setErrorsMsg] = useState([])
  const [selectedfile, setSelectedFile] = useState('')
  // const [previewSrc, setPreviewSrc] = useState('')
  // const [isPreviewAvailable, setIsPreviewAvailable] = useState(false)
  // const dropRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    getStages().then((response) => setStages(response.data))
    getDepartments().then((response) => setDepartments(response.data))
  }, [])
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  // const onDrop = (files) => {
  //   const [uploadedFile] = files
  //   setSelectedFile(uploadedFile)

  //   const fileReader = new FileReader()
  //   fileReader.onload = () => {
  //     setPreviewSrc(fileReader.result)
  //   }
  //   fileReader.readAsDataURL(uploadedFile)
  //   setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png|pdf)$/))

  //   dropRef.current.style.border = '2px dashed #e9ebeb'
  // }

  // const updateBorder = (dragState) => {
  //   if (dragState === 'over') {
  //     dropRef.current.style.border = '2px solid #000'
  //   } else if (dragState === 'leave') {
  //     dropRef.current.style.border = '2px dashed #e9ebeb'
  //   }
  // }

  useEffect(() => {
    getStatus().then((res) => setStatus(res.data))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newErrors = validate(data)
    setErrors(newErrors)
    if (!Object.keys(newErrors).length) {
      try {
        const formData = new FormData()
        formData.append('resume', selectedfile)
        formData.append('name', data.name)
        formData.append('phone', data.phone)
        formData.append('location', data.location)
        formData.append('source', data.source)
        formData.append('department', data.department)
        formData.append('skills', data.skills)
        formData.append('experience', data.experience)
        formData.append('qualification', data.qualification)
        formData.append('position', data.position)
        formData.append('salary', data.salary)
        formData.append('recruiter', data.recruiter)
        formData.append('comments', data.comments)
        formData.append('status', data.status)
        formData.append('email', data.email)
        formData.append('stage', data.stage)

        await addCandidate(formData)
        navigate('/candidate')
      } catch (error) {
        error.response && setErrors(error.response.data)
        setErrorsMsg(error.response.data.msg)
      }
    }
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
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
                    <h3 className="mb-0">Add Candidate</h3>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <div className="pl-lg-4">
                    <CRow className="mt-3">
                      <CCol lg="3"></CCol>
                      <CCol md="6" className="text-center">
                        <CInputGroup className="mb-3">
                          <CFormInput
                            type="file"
                            id="inputGroupFile02"
                            name="resume"
                            onChange={handleFileChange}
                            accept=".doc,.docx,application/pdf"
                          />
                          <CInputGroupText component="label" htmlFor="inputGroupFile02">
                            <CIcon icon={cilCloudDownload} />
                          </CInputGroupText>
                        </CInputGroup>
                        <span style={{ color: 'red' }}>{errors.resume}</span>
                      </CCol>
                    </CRow>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Candidate Information</h6>
                  {errorsMsg ? <span style={{ color: 'red' }}>{errorsMsg}</span> : ''}
                  <div className="pl-lg-4">
                    <CRow className="mb-3">
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
                          value={capitalizeFirstLetter(data.name)}
                          onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.name}</span>
                      </CCol>
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
                        {<span style={{ color: 'red' }}>{errors.email}</span>}
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-experience">
                          Experience
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-experience"
                          placeholder="Experience"
                          type="text"
                          name="experience"
                          value={data.experience}
                          onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.experience}</span>
                      </CCol>
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-qualification">
                          Qualification
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-qualification"
                          placeholder="Highest Qualification"
                          type="text"
                          name="qualification"
                          value={data.qualification}
                          onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.qualification}</span>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-source">
                          Source
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-source"
                          placeholder="Source"
                          type="text"
                          name="source"
                          value={data.source}
                          onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.source}</span>
                      </CCol>
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-source">
                          Status
                        </CFormLabel>
                        {/* <CFormSelect name="status" value={data.status} onChange={handleChange}>
                          <option defaultValue>Status</option>
                          {status &&
                            status.map((item) => {
                              return <option key={item._id}>{item.status}</option>
                            })}
                        </CFormSelect> */}
                        {status.length !== 0 && <CFormInput
                          className="form-control-alternative"
                          id="input-status"
                          placeholder="status"
                          type="text"
                          name="status"
                          value={ (data.status = status[0].status)}
                          onChange={handleChange}
                        />}
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
                          {departments &&
                            departments.map((item) => {
                              return <option key={item._id}>{item.departments}</option>
                            })}
                        </CFormSelect>
                        <span style={{ color: 'red' }}>{errors.department}</span>
                      </CCol>
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-skills">
                          Skills
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-skills"
                          placeholder="Skills"
                          type="text"
                          name="skills"
                          value={data.skills}
                          onChange={handleChange}
                        />
                        {/* <span style={{ color: 'red' }}>{errors.skills}</span> */}
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-position">
                          Position
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-position"
                          placeholder="Position"
                          type="position"
                          name="position"
                          value={data.position}
                          onChange={handleChange}
                        />
                        {/* <span style={{ color: 'red' }}>{errors.position}</span> */}
                      </CCol>
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-salary">
                          Salary
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-salary"
                          placeholder="Salary"
                          type="text"
                          name="salary"
                          value={data.salary}
                          onChange={handleChange}
                        />
                        {/* <span style={{ color: 'red' }}>{errors.salary}</span> */}
                      </CCol>
                    </CRow>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Contact information</h6>
                  <div className="pl-lg-4">
                    <CRow className="mb-3">
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-phone">
                          Phone
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-phone"
                          placeholder="Phone"
                          type="text"
                          name="phone"
                          value={data.phone}
                          onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.phone}</span>
                      </CCol>
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-department">
                          Stage
                        </CFormLabel>
                        <CFormSelect name="stage" value={data.stage} onChange={handleChange}>
                          <option defaultValue>Stage</option>
                          {stages.map((item, index) => {
                            return <option key={index}>{item.stage}</option>
                          })}
                        </CFormSelect>
                        <span style={{ color: 'red' }}>{errors.stage}</span>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol md="12">
                        <CFormLabel className="form-control-label" htmlFor="input-location">
                          Location
                        </CFormLabel>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-location"
                          placeholder="Home Location"
                          type="text"
                          name="location"
                          value={data.location}
                          onChange={handleChange}
                        />
                        {/* <span style={{ color: 'red' }}>{errors.location}</span> */}
                      </CCol>
                    </CRow>
                  </div>

                  {/* <div className="upload-section">
                    <CRow className="mb-3">
                      <CCol lg="6">
                        <Dropzone
                          onDrop={onDrop}
                          onDragEnter={() => updateBorder('over')}
                          onDragLeave={() => updateBorder('leave')}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className='text-center'{...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                              <input {...getInputProps()} />
                              <CImage src={images} className="image-thumbnail p-5 mx-auto w-50" alt="Resume" ></CImage>
                              <p><CIcon icon={cilCloudUpload} size="lg" /></p>
                              <p>Upload Resume</p>

                              {selectedfile && (
                                <div>
                                  <strong>Selected file:</strong> {selectedfile.name}
                                </div>
                              )}
                            </div>
                          )}
                        </Dropzone>
                      </CCol>
                      <CCol lg="6">
                        {previewSrc ? (
                          isPreviewAvailable ? (
                            <div className="image-preview">
                              <img
                                className="preview-image"
                                src={previewSrc}
                                alt="Preview"
                                width={200}
                                height={200}
                              />
                            </div>
                          ) : (
                            <div className="preview-message">
                              <p>No preview available for this file</p>
                            </div>
                          )
                        ) : (
                          <div className="preview-message">
                            <p>Image preview will be shown here after selection</p>
                          </div>
                        )}
                      </CCol>
                    </CRow>
                  </div> */}

                  <h6 className="heading-small text-muted mb-4">Comments</h6>
                  <div className="pl-lg-4">
                    <CFormLabel>Feedback</CFormLabel>
                    <CFormTextarea
                      className="form-control-alternative"
                      placeholder="Feedback of the Candidate Interview"
                      rows="4"
                      type="textarea"
                      name="comments"
                      value={data.comments}
                      onChange={handleChange}
                    ></CFormTextarea>
                  </div>
                  <CCol className="text-right mt-2" xs="4">
                    <CButton color="primary" type="button" onClick={handleSubmit}>
                      Add
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

export default AddCandidate
