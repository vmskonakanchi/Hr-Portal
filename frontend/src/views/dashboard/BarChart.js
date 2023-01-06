/* eslint-disable react/prop-types */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import React, { useEffect, useState } from 'react'
import {
  getDepartmentGraph,
  getRecruiterGraph,
  getSourceGraph,
} from 'src/services/CandidateService'

// const _user = localStorage.getItem('token')
// const user = JSON.parse(_user)

const BarChart = () => {
  const filterPie = ['Source', 'Department', 'Recruiter']
  const [filterBarValue, setfilterBarValue] = useState('')
  const [number, setNumber] = useState(6)
  const [departmentGraph, setDepartmentGraph] = useState([])
  const [sourceGraph, setSourceGraph] = useState([])
  const [recruiterGraph, setRecruiterGraph] = useState([])

  // api for graph of department, source, recruiter
  useEffect(() => {
    getDepartmentGraph(number).then((response) => setDepartmentGraph(response.data))
    getSourceGraph(number).then((response) => setSourceGraph(response.data))
    getRecruiterGraph(number).then((response) => setRecruiterGraph(response.data))
  }, [number])

  const departmentlabels = []
  const departmentdata = []
  if (departmentGraph.length > 0) {
    for (var i of departmentGraph) {
      departmentlabels.push(i.department)
      departmentdata.push(i.count)
    }
  }

  const sourcelabels = []
  const sourcedata = []
  if (sourceGraph.length > 0) {
    for (var j of sourceGraph) {
      sourcelabels.push(j.source)
      sourcedata.push(j.count)
    }
  }

  const recruiterlabels = []
  const recruiterdata = []
  if (recruiterGraph.length > 0) {
    for (var k of recruiterGraph) {
      recruiterlabels.push(k.recruiter)
      recruiterdata.push(k.count)
    }
  }

  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>
          <CRow>
            <CCol xs={5}>
              <h3>{filterBarValue} Chart</h3>
            </CCol>
            <CCol xs={3}>
              <CInputGroup>
                <CFormInput
                  placeholder="Count Number"
                  type="number"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </CInputGroup>
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

        {filterBarValue === 'Department' ? (
          <CCardBody>
            <CChartBar
              data={{
                labels: departmentlabels,
                datasets: [
                  {
                    label: 'Departments',
                    backgroundColor: '#39e76f',
                    data: departmentdata,
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        ) : filterBarValue === 'Recruiter' ? (
          <CCardBody>
            <CChartBar
              data={{
                labels: recruiterlabels,
                datasets: [
                  {
                    label: 'Recruiters',
                    backgroundColor: '#FFCE56',
                    data: recruiterdata,
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        ) : (
          <CCardBody>
            <CChartBar
              data={{
                labels: sourcelabels,
                datasets: [
                  {
                    label: 'Source',
                    backgroundColor: '#f87979',
                    data: sourcedata,
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        )}
      </CCard>
    </>
  )
}

export default BarChart
