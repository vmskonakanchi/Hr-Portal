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
import { getUsersById } from 'src/services/UsersService'
// import {
//   buildStyles,
//   CircularProgressbar,
//   CircularProgressbarWithChildren,
// } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
  getCandidatesByDevelopers,
  getCandidatesByHrMembers,
  getDeveloperAssigned,
  getDeveloperRejectProgressGraph,
  getDeveloperSelectProgressGraph,
  getRecruiterCandidatesByDate,
  getRecruiterProgressGraph,
  getRecruiterSelectCandidatesByDate,
} from 'src/services/CandidateService'
import { CChartBar } from '@coreui/react-chartjs'
import {
  searchHrCandidatesByDate,
  searchHrCandidatesByMonth,
  searchHrCandidatesByYear,
  searchHrSelectedCandidatesByDate,
} from 'src/services/StagesServices'
import HrMembersProgress from './HrMembersProgress'
import DevelopersProgress from './DevelopersProgress'
import { ROLES } from 'src/constants/RoleConstant'
import { getStatus } from 'src/services/StatusService'
// const _user = localStorage.getItem('token')
// const user = JSON.parse(_user)

const ViewUsers = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    department: '',
    status: '',
  })
  const [candidateByDev, setCandidateByDev] = useState('')
  const [candidateByHr, setCandidateByHr] = useState('')
  const [hrDateGraph, setHrDateGraph] = useState([])
  const [hrStatusDateGraph, setHrStatusDateGraph] = useState([])

  const [hrMonthGraph, setHrMonthGraph] = useState([])
  const [hrYearGraph, setHrYearGraph] = useState([])
  // const [hrCandidateGraph, setHrCandidateGraph] = useState([])
  const [filterBarValue, setfilterBarValue] = useState('')
  const [filterStatusValue, setfilterStatusValue] = useState('')
  const [recruiterAddGraph, setRecruiterAddGraph] = useState([])
  const [recLastSelectedGraph, setRecLastSelectedGraph] = useState([])
  const [recruiterProgressGraph, setRecruiterProgressGraph] = useState([])
  const [developerSelectProgressGraph, setDeveloperSelectProgressGraph] = useState([])
  const [developerRejectProgressGraph, setDeveloperRejectProgressGraph] = useState([])
  const [devCandidateGraph, setDevCandidateGraph] = useState([])
  const [filterStage, setfilterStage] = useState('')
  const [dateFromFilter, setDateFromFilter] = useState('')
  const [dateToFilter, setDateToFilter] = useState('')

  const [status, setStatus] = useState([])
  const filterPie = ['Day', 'Month', 'Year']
  const statusFilter = ['Total', 'Selected', 'Rejected']

  const navigate = useNavigate()
  const { id } = useParams()

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

    // Fetch all Status
    getStatus().then(res => setStatus(res.data))

    // Candidates By Developers
    getCandidatesByDevelopers(data.name).then((res) => {
      setCandidateByDev(res.data)
    })

    // Candidates By HR Members
    getCandidatesByHrMembers(data.name).then((res) => {
      setCandidateByHr(res.data)
    })

    // Candidates By HR Members By Date
    searchHrCandidatesByDate(data.name, dateFromFilter, dateToFilter).then((res) => {
      setHrDateGraph(res.data)
    })

    // Selected Candidates By HR Members By Date
    searchHrSelectedCandidatesByDate(
      data.name,
      filterStatusValue,
      dateFromFilter,
      dateToFilter,
    ).then((res) => {
      setHrStatusDateGraph(res.data)
    })

    // Candidates By HR Members By Month
    searchHrCandidatesByMonth(data.name, filterStatusValue).then((res) => {
      setHrMonthGraph(res.data)
    })

    // Candidates By HR Members By Year
    searchHrCandidatesByYear(data.name, filterStatusValue).then((res) => {
      setHrYearGraph(res.data)
    })

    // Candidates Count By HR Members
    // axios.get(`http://localhost:5000/api/v1/candidates/count`, config).then((res) => {
    //   setHrCandidateGraph(res.data)
    // })

    // Candidates By Recruiter By Date
    getRecruiterCandidatesByDate(data.name).then((res) => {
      setRecruiterAddGraph(res.data)
    })

    // Selected Candidates By Recruiter By Date
    getRecruiterSelectCandidatesByDate(data.name).then((res) => {
      setRecLastSelectedGraph(res.data)
    })

    // Recruiter Progress Graph From Adding Candidates to Selected Candidates at Last Round
    getRecruiterProgressGraph(data.name).then((res) => {
      setRecruiterProgressGraph(res.data)
    })

    // Selected Candidates By Developer
    getDeveloperSelectProgressGraph(filterStage, data.name).then((res) => {
      setDeveloperSelectProgressGraph(res.data)
    })

    // Rejected Candidates By Developer
    getDeveloperRejectProgressGraph(filterStage, data.name).then((res) => {
      setDeveloperRejectProgressGraph(res.data)
    })

    // Assigned Candidates By Developer
    getDeveloperAssigned(data.name).then((res) => {
      setDevCandidateGraph(res.data)
    })
  }, [id, data.name, filterStage, dateFromFilter, dateToFilter, filterStatusValue])

  const handleClick = () => {
    navigate('/Users')
  }

  const hrlabels = []
  const hrdata = []
  for (var i of hrDateGraph) {
    hrlabels.push(i._id)
    hrdata.push(i.count)
  }

  const hrStatuslabels = []
  const hrStatusdata = []
  for (var j of hrStatusDateGraph) {
    hrStatuslabels.push(j._id)
    hrStatusdata.push(j.count)
  }

  function getMonthName(monthNumber) {
    const date = new Date()
    date.setMonth(monthNumber)

    return date.toLocaleString('en-US', { month: 'long' })
  }

  const hrMonthlabels = []
  const hrMonthdata = []
  for (var l of hrMonthGraph) {
    hrMonthlabels.push(getMonthName(new Date(l._id).getMonth()))
    hrMonthdata.push(l.count)
  }

  const hrYearlabels = []
  const hrYeardata = []
  for (var k of hrYearGraph) {
    hrYearlabels.push(k._id)
    hrYeardata.push(k.count)
  }

  return (
    <>
      <CContainer className="mt--7" fluid>
        <CRow className="mb-4">
          <CCol className="order-xl-1" xl="7">
            <CCard className="bg-light shadow">
              <CCardHeader className="bg-white border-0">
                <CRow className="align-items-center">
                  <CCol xs="8">
                    <h3 className="mb-0">View {data.name}</h3>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <h6 className="heading-small text-muted mb-4">{data.name} Information</h6>
                  <div className="pl-lg-4">
                    <CRow className="mb-3">
                      <CCol>
                        <div className="d-flex">
                          <CCol className="mt-2">
                            <CFormLabel className="form-control-label " htmlFor="input-employeeid">
                              EmployeeId
                            </CFormLabel>
                          </CCol>
                          <CCol>
                            <CFormInput
                              className="form-control-alternative bg-light"
                              id="input-employeeid"
                              placeholder="EmployeeId"
                              type="text"
                              name="employeeId"
                              value={data.employeeId}
                              disabled
                            />
                          </CCol>
                        </div>
                        <div className="d-flex">
                          <CCol className="mt-2">
                            <CFormLabel className="form-control-label " htmlFor="input-employeeid">
                              Name
                            </CFormLabel>
                          </CCol>
                          <CCol>
                            <CFormInput
                              className="form-control-alternative bg-light"
                              id="input-name"
                              placeholder="name"
                              type="text"
                              name="name"
                              value={data.name}
                              disabled
                            />
                          </CCol>
                        </div>
                        <div className="d-flex">
                          <CCol className="mt-2">
                            <CFormLabel className="form-control-label " htmlFor="input-email">
                              Email
                            </CFormLabel>
                          </CCol>
                          <CCol>
                            <CFormInput
                              className="form-control-alternative bg-light"
                              id="input-email"
                              placeholder="email"
                              type="email"
                              name="email"
                              value={data.email}
                              disabled
                            />
                          </CCol>
                        </div>
                        <div className="d-flex">
                          <CCol className="mt-2">
                            <CFormLabel className="form-control-label " htmlFor="input-department">
                              Department
                            </CFormLabel>
                          </CCol>
                          <CCol>
                            <CFormInput
                              className="form-control-alternative bg-light"
                              id="input-department"
                              placeholder="department"
                              type="text"
                              name="department"
                              value={data.department}
                              disabled
                            />
                          </CCol>
                        </div>
                        <div className="d-flex">
                          <CCol className="mt-2">
                            <CFormLabel className="form-control-label " htmlFor="input-phone">
                              Phone
                            </CFormLabel>
                          </CCol>
                          <CCol>
                            <CFormInput
                              className="form-control-alternative bg-light"
                              id="input-phone"
                              placeholder="phone"
                              type="text"
                              name="phone"
                              value={data.phone}
                              disabled
                            />
                          </CCol>
                        </div>
                        <div className="d-flex">
                          <CCol className="mt-2">
                            <CFormLabel className="form-control-label " htmlFor="input-roles">
                              Roles
                            </CFormLabel>
                          </CCol>
                          <CCol>
                            <CFormInput
                              className="form-control-alternative bg-light"
                              id="input-roles"
                              placeholder="roles"
                              type="text"
                              name="roles"
                              value={data.roles}
                              disabled
                            />
                          </CCol>
                        </div>
                      </CCol>
                      <CCol lg="3">
                        {/* {hrCandidateGraph.hrMembers
                                ? hrCandidateGraph.hrMembers.map((item, index) => {
                                    return (
                                      <div key={index}>
                                        <h1 className="text-center">{data.name}</h1>
                                        <div style={{ fontSize: 12, marginTop: -5 }}>
                                          <h4>{item.count}</h4>
                                        </div>
                                      </div>
                                    )
                                  })
                                : ''} */}
                      </CCol>
                    </CRow>
                  </div>
                  <CCol className="text-end mt-2" onClick={handleClick}>
                    <CButton color="primary" type="button">
                      Back
                    </CButton>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>

          {/*List of All Candidates assigned to HR */}
          {data.roles && data.roles[0] === ROLES.HR && (
            <CCol className="order-xl-1" xl="5">
              <CCard className="bg-light shadow">
                <CCardHeader className="bg-secondary border-0">
                  <CRow className="align-items-center mb-2">
                    <CCol className="px-3">
                      <h4>Candidates</h4>
                    </CCol>
                  </CRow>
                  <CRow className="px-3">
                    <CCol xs={4}>
                      <CFormLabel
                        className="form-control-label text-white"
                        htmlFor="input-employeeid"
                      >
                        <h6>Name</h6>
                      </CFormLabel>
                    </CCol>
                    <CCol xs={5}>
                      <CFormLabel
                        className="form-control-label text-white"
                        htmlFor="input-employeeid"
                      >
                        <h6>Stage</h6>
                      </CFormLabel>
                    </CCol>
                    <CCol xs={3}>
                      <CFormLabel
                        className="form-control-label text-white"
                        htmlFor="input-employeeid"
                      >
                        <h6>Status</h6>
                      </CFormLabel>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  {/* {candidateByDev
                  ? candidateByDev.map((item, index) => {
                      return (
                        <CCol className="px-3" key={index}>
                          {item.status !== 'Rejected' ? (
                            <CRow>
                              <CCol xs={4}>
                                <CFormLabel
                                  className="form-control-label "
                                  htmlFor="input-employeeid"
                                >
                                  <h6>{item.name}</h6>
                                </CFormLabel>
                              </CCol>
                              <CCol xs={5}>
                                <CFormLabel
                                  className="form-control-label "
                                  htmlFor="input-employeeid"
                                >
                                  <h6>{item.stage}</h6>
                                </CFormLabel>
                              </CCol>
                              <CCol xs={3}>
                                {item.status === 'Selected' ? (
                                  <CFormLabel
                                    className="form-control-label text-success"
                                    htmlFor="input-employeeid"
                                  >
                                    {item.status}
                                  </CFormLabel>
                                ) : (
                                  <CFormLabel
                                    className="form-control-label text-warning"
                                    htmlFor="input-employeeid"
                                  >
                                    {item.status}
                                  </CFormLabel>
                                )}
                              </CCol>
                            </CRow>
                          ) : (
                            ''
                          )}
                        </CCol>
                      )
                    })
                  : ''} */}

                  {/*List of All Candidates assigned to HR which are Pending  */}
                  {candidateByHr
                    ? candidateByHr.map((item, index) => {
                        return (
                          <CCol className="px-3" key={index}>
                            {(item.roles === ROLES.HR) && (item.status === status[0].status ? (
                              <CRow>
                                <CCol xs={4}>
                                  <CFormLabel
                                    className="form-control-label "
                                    htmlFor="input-employeeid"
                                  >
                                    {item.name}
                                  </CFormLabel>
                                </CCol>
                                <CCol xs={5}>
                                  <CFormLabel
                                    className="form-control-label "
                                    htmlFor="input-employeeid"
                                  >
                                    {item.stage}
                                  </CFormLabel>
                                </CCol>
                                <CCol xs={3}>
                                  <CFormLabel
                                    className="form-control-label text-warning"
                                    htmlFor="input-employeeid"
                                  >
                                    {item.status}
                                  </CFormLabel>
                                </CCol>
                              </CRow>
                            ) : (
                              ''
                            ))}
                          </CCol>
                        )
                      })
                    : ''}
                </CCardBody>
              </CCard>
            </CCol>
          )}

          {/* Developers Progress Bar Graph Assigned, Selected, Rejected of the Candidates */}
          <CCol className="order-xl-2" xl="5">
            {candidateByDev.length > 0 && candidateByHr.length === 0 && (
              <DevelopersProgress
                developerRejectProgressGraph={developerRejectProgressGraph}
                developerSelectProgressGraph={developerSelectProgressGraph}
                devCandidateGraph={devCandidateGraph}
                filterStage={filterStage}
                setfilterStage={setfilterStage}
              />
            )}
          </CCol>
        </CRow>

        {/* Total and Selected Candidate by HR Graph in Day, Month and Year wise and filter the from to date wise */}
        {candidateByHr.length > 0 && candidateByDev.length === 0 && (
          <CRow className="mb-3">
            <CCol className="order-xl-1" xl="7">
              <CCard className="bg-light shadow">
                <CCardHeader>
                  <CRow>
                    <CCol className="d-flex mx-2" xs={5}>
                      <CCol xs={7}>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-date"
                          placeholder="From"
                          type="date"
                          value={dateFromFilter}
                          onChange={(e) => setDateFromFilter(e.target.value)}
                        />
                      </CCol>
                      <CCol xs={7}>
                        <CFormInput
                          className="form-control-alternative"
                          id="input-date"
                          placeholder="To"
                          type="date"
                          value={dateToFilter}
                          onChange={(e) => setDateToFilter(e.target.value)}
                        />
                      </CCol>
                    </CCol>
                    <CCol className="d-flex mx-2" xs={3}>
                      <CFormSelect
                        onChange={(e) => setfilterStatusValue(e.target.value)}
                        value={filterStatusValue}
                      >
                        {statusFilter.map((item, index) => {
                          return (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          )
                        })}
                      </CFormSelect>
                    </CCol>
                    <CCol xs={3}>
                      <CFormSelect
                        onChange={(e) => setfilterBarValue(e.target.value)}
                        value={filterBarValue}
                      >
                        <option defaultValue>filter By</option>
                        {filterPie.map((item, index) => {
                          return (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          )
                        })}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                </CCardHeader>

                {filterBarValue === 'Day' ? (
                  <CCardBody>
                    {filterStatusValue === 'Selected' || filterStatusValue === 'Rejected' ? (
                      (filterStatusValue === 'Rejected') ? (
                        <CChartBar
                          data={{
                            labels: hrStatuslabels,
                            datasets: [
                              {
                                label: 'Rejected Candidates By Date',
                                backgroundColor: '#f87979',
                                data: hrStatusdata,
                              },
                            ],
                          }}
                          labels="Date"
                        />
                      ) : (
                        <CChartBar
                          data={{
                            labels: hrStatuslabels,
                            datasets: [
                              {
                                label: 'Selected Candidates By Date',
                                backgroundColor: '#39e76f',
                                data: hrStatusdata,
                              },
                            ],
                          }}
                          labels="Date"
                        />
                      )
                    ) : (
                      <CChartBar
                        data={{
                          labels: hrlabels,
                          datasets: [
                            {
                              label: 'Total Candidates By Date',
                              backgroundColor: '#0dcaf0',
                              data: hrdata,
                            },
                          ],
                        }}
                        labels="Date"
                      />
                    )}
                  </CCardBody>
                ) : filterBarValue === 'Year' ? (
                  <CCardBody>
                    {(filterStatusValue === 'Rejected') ? (<CChartBar
                      data={{
                        labels: hrYearlabels,
                        datasets: [
                          {
                            label: 'Rejected Candidates By Year',
                            backgroundColor: '#f87979',
                            data: hrYeardata,
                          },
                        ],
                      }}
                      labels="Year"
                    />)
                    :
                    (<CChartBar
                      data={{
                        labels: hrYearlabels,
                        datasets: [
                          {
                            label: 'Selected Candidates By Year',
                            backgroundColor: '#39e76f',
                            data: hrYeardata,
                          },
                        ],
                      }}
                      labels="Year"
                    />)}
                  </CCardBody>
                ) : (
                  <CCardBody>
                    {(filterStatusValue === 'Rejected') ?
                    (<CChartBar
                      data={{
                        labels: hrMonthlabels,
                        datasets: [
                          {
                            label: 'Rejected Candidates By Months',
                            backgroundColor: '#f87979',
                            data: hrMonthdata,
                          },
                        ],
                      }}
                      labels="months"
                    />)
                    :
                    (<CChartBar
                      data={{
                        labels: hrMonthlabels,
                        datasets: [
                          {
                            label: 'Rejected Candidates By Months',
                            backgroundColor: '#39e76f',
                            data: hrMonthdata,
                          },
                        ],
                      }}
                      labels="months"
                    />)}
                  </CCardBody>
                )}
              </CCard>
            </CCol>
            {/* HR Members/ Recruiters Progress Graph from Addind/ Recruiting Candidates to Last Round Selected Candidates */}
            <CCol className="order-xl-1" xl="5">
              {candidateByHr.length > 0 && (
                <HrMembersProgress
                  recLastSelectedGraph={recLastSelectedGraph}
                  recruiterAddGraph={recruiterAddGraph}
                  data={data}
                  recruiterProgressGraph={recruiterProgressGraph}
                />
              )}
            </CCol>
          </CRow>
        )}
      </CContainer>
    </>
  )
}

export default ViewUsers
