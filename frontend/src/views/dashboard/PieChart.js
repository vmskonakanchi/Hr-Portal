/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCardHeader, CCol, CFormSelect, CRow } from '@coreui/react'
import { CChartPie } from '@coreui/react-chartjs'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getDepartmentGraph,
  getRecruiterGraph,
  getSourceGraph,
} from 'src/services/CandidateService'

const PieChart = ({data}) => {
  const [filterPieValue, setfilterPieValue] = useState('')
  const [number, setNumber] = useState(6)
  const [departmentGraph, setDepartmentGraph] = useState([])
  const [sourceGraph, setSourceGraph] = useState([])

  const filter = ['Source', 'Department', 'Status']

  useEffect(() => {
    getDepartmentGraph(number).then((response) => setDepartmentGraph(response.data))
    getSourceGraph(number).then((response) => setSourceGraph(response.data))
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

  return (
    <>
      <CCard className="mb-3">
        <CCardHeader>
          <CRow>
            <CCol xs={8}>
              <h3>{filterPieValue}</h3>
            </CCol>
            <CCol xs={4}>
              <CFormSelect
                onChange={(e) => setfilterPieValue(e.target.value)}
                value={filterPieValue}
              >
                <option defaultValue>filter By</option>
                {filter.map((item, index) => {
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
        {filterPieValue === 'Source' ? (
          <CCardBody>
            <CChartPie
              data={{
                labels: sourcelabels,
                datasets: [
                  {
                    data: sourcedata,
                    backgroundColor: ['#39e76f', '#FF6384', '#FFCE56'],
                    hoverBackgroundColor: ['#39e76f', '#FF6384', '#FFCE56'],
                  },
                ],
              }}
            />
          </CCardBody>
        ) : filterPieValue === 'Department' ? (
          <CCardBody>
            <Link to={'/users'}>
              <CChartPie
                data={{
                  labels: departmentlabels,
                  datasets: [
                    {
                      data: departmentdata,
                      backgroundColor: ['#39e76f', '#FF6384', '#FFCE56', '#f87979'],
                      hoverBackgroundColor: ['#39e76f', '#FF6384', '#FFCE56', '#f87979'],
                    },
                  ],
                }}
              />
            </Link>
          </CCardBody>
        ) : (
          <CCardBody>
            <CChartPie
              data={{
                labels: ['Selected', 'Rejected', 'Pending'],
                datasets: [
                  {
                    data: [data.selected, data.rejected, data.pending],
                    backgroundColor: ['#39e76f', '#FF6384', '#FFCE56'],
                    hoverBackgroundColor: ['#39e76f', '#FF6384', '#FFCE56'],
                  },
                ],
              }}
            />
          </CCardBody>
        )}
      </CCard>
    </>
  )
}

export default PieChart
