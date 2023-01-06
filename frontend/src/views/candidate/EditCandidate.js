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
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { getCandidateById, updateCandidateById } from 'src/services/CandidateService'
import { DEPARTMENTS } from 'src/constants/RoleConstant'
import { getStages } from 'src/services/StagesServices'
import { getUsersByRoles } from 'src/services/UsersService'
import ValidateCandidate from 'src/validations/candidate/EditCandidateValidate'
import { getDepartments } from 'src/services/DepartmentService'
import { getStatus } from 'src/services/StatusService'

const EditCandidate = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    source: '',
    department: '',
    skills: '',
    experience: '',
    qualification: '',
    position: '',
    salary: '',
    comments: '',
    status: '',
    // document: '',
  })
  // const [selectedfile, setSelectedFile] = useState('')
  const [stages, setStages] = useState([])
  const [status, setStatus] = useState([])
  const [departments, setDepartments] = useState([])

  const [roles, setRoles] = useState([])
  const [errors, setErrors] = useState([])

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCandidateById(id)
        setData(user.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [id])

  useEffect(() => {
    getStages().then((response) => setStages(response.data))
    getDepartments().then((response) => setDepartments(response.data))

    getStatus().then((response) => setStatus(response.data))
    getUsersByRoles().then((response) => setRoles(response.data))
  }, [])

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }
  // const handleFileChange = (e) => {
  //   setSelectedFile(e.target.files[0])
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newErrors = ValidateCandidate(data)
    setErrors(newErrors)
    if (!Object.keys(newErrors).length) {
      try {
        // const formData = new FormData()
        // formData.append('document', selectedfile)
        // formData.append('name', data.name)
        // formData.append('phone', data.phone)
        // formData.append('location', data.location)
        // formData.append('source', data.source)
        // formData.append('department', data.department)
        // formData.append('skills', data.skills)
        // formData.append('experience', data.experience)
        // formData.append('position', data.position)
        // formData.append('salary', data.salary)
        // formData.append('recruiter', data.recruiter)
        // formData.append('comments', data.comments)
        // formData.append('status', data.status)
        // formData.append('email', data.email)

        // await updateCandidateById(id, formData)
        await updateCandidateById(id, data)

        navigate('/candidate')
      } catch (error) {
        error.response && setErrors(error.response.data)
        // console.log(error)
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
                  {/* <div className="pl-lg-4">
                    <CRow className="mt-3">
                      <CCol lg="3"></CCol>
                      <CCol md="6" className="text-center">
                        <CInputGroup className="mb-3">
                          <CFormInput type="file" id="inputGroupFile02" onChange={handleFileChange}/>
                          <CInputGroupText component="label" htmlFor="inputGroupFile02">
                            <CIcon icon={cilCloudUpload} size="lg" />
                          </CInputGroupText>
                        </CInputGroup>
                      </CCol>
                    </CRow>
                  </div>
                  <h6 className="heading-small text-muted mb-4">Candidate Information</h6> */}
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
                          value={data.name}
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
                        <CFormLabel className="form-control-label" htmlFor="input-status">
                          Status
                        </CFormLabel>
                        <CFormSelect name="status" value={data.status} onChange={handleChange}>
                          <option defaultValue>Status</option>
                          {status &&
                            status.map((item) => {
                              return <option key={item._id}>{item.status}</option>
                            })}
                        </CFormSelect>
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
                          {departments.map((item) => {
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
                    <CRow className="mb-3">
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-hrMembers">
                          HRMembers
                        </CFormLabel>
                        <CFormSelect
                          name="hrMembers"
                          value={data.hrMembers}
                          onChange={handleChange}
                        >
                          <option defaultValue>HR Members</option>
                          {roles.usersByHrRoles
                            ? roles.usersByHrRoles.map((item, index) => {
                                return (
                                  <option key={index} value={item.name}>
                                    {item.name}
                                  </option>
                                )
                              })
                            : ''}
                        </CFormSelect>
                        {/* <span style={{ color: 'red' }}>{errors.hrMembers}</span> */}
                      </CCol>
                      <CCol lg="6">
                        <CFormLabel className="form-control-label" htmlFor="input-developers">
                          Developers
                        </CFormLabel>
                        <CFormSelect
                          name="developers"
                          value={data.developers}
                          onChange={handleChange}
                        >
                          <option defaultValue>Developers</option>
                          {roles.usersByDeveloperRoles
                            ? roles.usersByDeveloperRoles.map((item, index) => {
                                return (
                                  <option key={index} value={item.name}>
                                    {item.name}
                                  </option>
                                )
                              })
                            : ''}
                        </CFormSelect>
                        {/* <span style={{ color: 'red' }}>{errors.developers}</span> */}
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
                    />
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

export default EditCandidate
