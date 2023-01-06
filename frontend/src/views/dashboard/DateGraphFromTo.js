/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCol, CFormInput, CFormLabel, CRow } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import React, { useEffect, useState } from 'react'
import { getStyle, hexToRgba } from '@coreui/utils'
import { searchCandidatesByDate } from 'src/services/CandidateService'

// const _user = localStorage.getItem('token')
// const user = JSON.parse(_user)

const DateGraphFromTo = ({ dateGraph }) => {
  const [fromToGraph, setFromToGraph] = useState([])
  const [dateFromFilter, setDateFromFilter] = useState('')
  const [dateToFilter, setDateToFilter] = useState('')

  useEffect(() => {
    searchCandidatesByDate(dateFromFilter, dateToFilter)
      .then((response) => setFromToGraph(response.data))
  }, [dateFromFilter, dateToFilter])

  const dateCountlabels = []
  const dateCountdata = []
  for (var m of fromToGraph) {
    dateCountlabels.push(m._id)
    dateCountdata.push(m.count)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={8}>
              <h3 id="traffic" className="card-title pt-1">
                Candidates
              </h3>
              <div className="small text-medium-emphasis">{}</div>
            </CCol>
            <CCol xs={2}>
              <CFormLabel className="form-control-label" htmlFor="input-department">
                From Date
              </CFormLabel>
              <CFormInput
                className="form-control-alternative"
                id="input-date"
                placeholder="To"
                type="date"
                value={dateFromFilter}
                onChange={(e) => setDateFromFilter(e.target.value)}
              />
            </CCol>
            <CCol xs={2}>
            <CFormLabel className="form-control-label" htmlFor="input-department">
                To Date
              </CFormLabel>
              <CFormInput
                className="form-control-alternative"
                id="input-date"
                placeholder="To"
                type="date"
                value={dateToFilter}
                onChange={(e) => setDateToFilter(e.target.value)}
              />
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: dateCountlabels,
              datasets: [
                {
                  label: 'Candidates By Date',
                  backgroundColor: hexToRgba(getStyle('--cui-warning'), 10),
                  borderColor: getStyle('--cui-warning'),
                  pointHoverBackgroundColor: getStyle('--cui-warning'),
                  borderWidth: 2,
                  data: dateCountdata,
                  fill: true,
                },
                // {
                //   label: 'My Second dataset',
                //   backgroundColor: 'transparent',
                //   borderColor: getStyle('--cui-success'),
                //   pointHoverBackgroundColor: getStyle('--cui-success'),
                //   borderWidth: 2,
                //   data: selectedDateCountdata,
                // },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
          {/* <CChartBar
              data={{
                labels: dateCountlabels,
                datasets: [
                  {
                    label: 'Source',
                    backgroundColor: '#f87979',
                    data: dateCountdata,
                  },
                ],
              }}
              labels="months"
            /> */}
        </CCardBody>
      </CCard>
    </>
  )
}

export default DateGraphFromTo
