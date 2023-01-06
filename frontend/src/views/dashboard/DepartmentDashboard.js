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

// import { ROLES } from 'src/constants/RoleConstant'
import DevelopersProgress from '../users/DevelopersProgress'
import HrMembersProgress from '../users/HrMembersProgress'
import { ROLES } from 'src/constants/RoleConstant'
import { getStatus } from 'src/services/StatusService'
const _user = localStorage.getItem('token')
const userId = JSON.parse(_user)

const DepartmentDashboard = () => {
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
  const [status, setStatus] = useState([])

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
  const filterPie = ['Day', 'Month', 'Year']
  const statusFilter = ['Total', 'Selected', 'Rejected']

  const navigate = useNavigate()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUsersById(userId.id)
        setData(user.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()

    // Fetch All Status
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
  }, [userId.id, data.name, filterStage, dateFromFilter, dateToFilter, filterStatusValue])

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
          {/* Developers Progress Bar Graph Assigned, Selected, Rejected of the Candidates */}
          {userId.roles === ROLES.DEVELOPER && (
            <CCol className="order-xl-1" xl="6">
              {candidateByDev.length > 0 && candidateByHr.length === 0 && (
                <DevelopersProgress
                  developerRejectProgressGraph={developerRejectProgressGraph}
                  developerSelectProgressGraph={developerSelectProgressGraph}
                  devCandidateGraph={devCandidateGraph}
                  filterStage={filterStage}
                  setfilterStage={setfilterStage}
                  data={data}
                />
              )}
            </CCol>
          )}

          {/* HR Members/ Recruiters Progress Graph from Addind/ Recruiting Candidates to Last Round Selected Candidates */}
          {(userId.roles === ROLES.HR ) && (<CCol className="order-xl-1" xl="7">
            {candidateByHr.length > 0 && (
              <HrMembersProgress
                data={data}
                recruiterProgressGraph={recruiterProgressGraph}
              />
            )}
          </CCol>)}

          {/*List of All Candidates assigned to HR */}
          {(data.roles && data.roles[0] === ROLES.HR ||userId.roles === ROLES.HR|| userId.roles === ROLES.ADMIN) && (
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
                          {item.roles === ROLES.HR && (item.status === status[0].status ? (
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
        </CRow>

        {/* Total and Selected Candidate by HR Graph in Day, Month and Year wise and filter the from to date wise */}
        {/* {candidateByHr.length > 0 && candidateByDev.length === 0 && (
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
                      filterStatusValue === 'Rejected' ? (
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
                    <CChartBar
                      data={{
                        labels: hrYearlabels,
                        datasets: [
                          {
                            label: 'Candidates By Year',
                            backgroundColor: '#39e76f',
                            data: hrYeardata,
                          },
                        ],
                      }}
                      labels="Year"
                    />
                  </CCardBody>
                ) : (
                  <CCardBody>
                    <CChartBar
                      data={{
                        labels: hrMonthlabels,
                        datasets: [
                          {
                            label: 'Candidates By Months',
                            backgroundColor: '#39e76f',
                            data: hrMonthdata,
                          },
                        ],
                      }}
                      labels="months"
                    />
                  </CCardBody>
                )}
              </CCard>
            </CCol>
          </CRow>
        )} */}
      </CContainer>
    </>
  )
}

export default DepartmentDashboard
