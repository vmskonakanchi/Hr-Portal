import React, { useEffect, useState } from 'react'

import { CButton, CCol, CFormInput, CRow } from '@coreui/react'
import { CSVLink } from 'react-csv'

import { getCandidateCount, getExport } from 'src/services/CandidateService'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import 'react-circular-progressbar/dist/styles.css'
import BarChart from './BarChart'
import PieChart from './PieChart'
import StageChart from './StageChart'
import {
  exportToExcelByDate,
  getCandidatesCountByDate,
  getCandidatesCountByMonth,
  getCandidatesCountByYear,
  getStagescount,
} from 'src/services/StagesServices'
import LineChart from './LineChart'
import DayMonthGraphs from './DayMonthGraphs'
import DateGraphFromTo from './DateGraphFromTo'
import moment from 'moment/moment'

// const _user = localStorage.getItem('token')
// const user = JSON.parse(_user)

const Dashboard = () => {
  const [data, setData] = useState([])
  const [exports, setExports] = useState([])

  const [stageGraph, setStageGraph] = useState([])
  const [dateGraph, setDateGraph] = useState([])
  const [monthGraph, setMonthGraph] = useState([])
  const [yearGraph, setYearGraph] = useState([])

  const [fromToExports, setFromToExports] = useState([])
  const [dateFromFilter, setDateFromFilter] = useState('')
  const [dateToFilter, setDateToFilter] = useState('')

  const fetchData = () => {
    getCandidateCount().then((response) => setData(response.data))
  }

  // get all candidates list, count , count by date month year api
  useEffect(() => {
    fetchData()
    getExport().then((response) => setExports(response.data))
    getStagescount().then((response) => setStageGraph(response.data))
    getCandidatesCountByMonth().then((response) => setMonthGraph(response.data))
    getCandidatesCountByDate().then((response) => setDateGraph(response.data))
    getCandidatesCountByYear().then((response) => setYearGraph(response.data))
  }, [])

  // export to excell by date wise
  useEffect(() => {
    exportToExcelByDate(dateFromFilter, dateToFilter).then((res) => setFromToExports(res.data))
  }, [dateFromFilter, dateToFilter])

  const date = moment(new Date()).utc().format('YYYY/MM/DD')
  const csv = {
    filename: `Report ${date}.csv`,
    headers: exports.headers ? exports.headers : [],
    data: exports.data ? exports.data : [],
  }

  const csv1 = {
    filename: `Report ${date}.csv`,
    headers: fromToExports.headers ? fromToExports.headers : [],
    data: fromToExports.data ? fromToExports.data : [],
  }

  return (
    <>
      <CRow className="mb-2">
        <CCol xs={5}></CCol>
        <CCol xs={2}>
          <CFormInput
            className="form-control-alternative"
            id="input-date"
            placeholder="From"
            type="date"
            value={dateFromFilter}
            onChange={(e) => setDateFromFilter(e.target.value)}
          />
        </CCol>
        <CCol xs={2}>
          <CFormInput
            className="form-control-alternative"
            id="input-date"
            placeholder="To"
            type="date"
            value={dateToFilter}
            onChange={(e) => setDateToFilter(e.target.value)}
          />
        </CCol>
        <CCol xs={3} className="text-end d-flex">
          <CCol xs={8}>
            <CButton color="success">
              {' '}
              <CSVLink {...csv1} className="text-decoration-none text-white fs-6 mb-2">
                Export By Date
              </CSVLink>
            </CButton>
          </CCol>
          <CCol xs={4} className="text-end">
            <CButton color="success">
              {' '}
              <CSVLink {...csv} className="text-decoration-none text-white fs-6 mb-2">
                Export
              </CSVLink>
            </CButton>
          </CCol>
        </CCol>
      </CRow>

      {/* widgets In this Candidates count in Total, Selected, Rejected, Pending */}
      <WidgetsDropdown data={data} />

      {/* Here Department, source, Recruiters graph in Bar Chart */}
      <CRow>
        <CCol xs={7}>
          <BarChart />
        </CCol>

        {/* Here Department, source, Status graph in Pie Chart */}
        <CCol xs={4}>
          <PieChart data={data} />
        </CCol>
      </CRow>

      {/* How many candidates are there in particular stages */}
      <CRow>
        <CCol xs={5}>
          <StageChart stageGraph={stageGraph} />
        </CCol>

        {/* Added Candidates in Month wise line graph */}
        <CCol xs={7}>
          <LineChart monthGraph={monthGraph} />
        </CCol>
      </CRow>

      <CRow>
        {/* <CCol xs={3}>
          <CCard className="mb-3">
            <CCardHeader>
              <CRow>
                <CCol xs={8}>
                  <h3>Doughnut Chart</h3>
                </CCol>
                <CCol xs={4}>
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
            <CCardBody>
              <CChart
                type="doughnut"
                data={{
                  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                  datasets: [
                    {
                      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                      data: [40, 20, 80, 10],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={4}></CCol> */}

        {/* Day, Month, Year Graph with total and last round selected */}
        <DayMonthGraphs monthGraph={monthGraph} dateGraph={dateGraph} yearGraph={yearGraph} />
      </CRow>
      <CRow>
        {/* Day Graph with total Candidates from to date */}
        <DateGraphFromTo dateGraph={dateGraph} />
      </CRow>
    </>
  )
}

export default Dashboard
