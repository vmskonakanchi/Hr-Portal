/* eslint-disable react/prop-types */
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CFormSelect, CRow } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import React, { useEffect, useState } from 'react'
import { getStyle, hexToRgba } from '@coreui/utils'
import { getSelectedByStages } from 'src/services/StagesServices'

// const _user = localStorage.getItem('token')
// const user = JSON.parse(_user)

const DayMonthGraphs = ({ monthGraph, dateGraph, yearGraph }) => {
  const [day, setDay] = useState('')
  const [filterBarValue, setfilterBarValue] = useState('')
  // const [filterStage, setfilterStage] = useState('')
  const [selectedDateGraph, setSelectedDateGraph] = useState([])
  // const [stage, setstage] = useState([])

  const date = ['Day', 'Month', 'Year']
  const filterPie = ['Selected', 'Total']

  // useEffect(() => {
  //   getStages().then((response) => setstage(response.data))
  // }, [])

  useEffect(() => {
    getSelectedByStages().then((response) => setSelectedDateGraph(response.data))
  }, [])

  function getMonthName(monthNumber) {
    const date = new Date()
    date.setMonth(monthNumber)

    return date.toLocaleString('en-US', { month: 'long' })
  }

  const monthCountlabels = []
  const monthCountdata = []
  for (var l of monthGraph) {
    monthCountlabels.push(getMonthName(new Date(l._id).getMonth()))
    monthCountdata.push(l.count)
  }

  const dateCountlabels = []
  const dateCountdata = []
  for (var m of dateGraph) {
    dateCountlabels.push(m._id)
    dateCountdata.push(m.count)
  }

  const selectedDateCountlabels = []
  const selectedDateCountdata = []
  for (var i of selectedDateGraph) {
    selectedDateCountlabels.push(i._id)
    selectedDateCountdata.push(i.count)
  }

  const yearCountlabels = []
  const yearCountdata = []
  for (var n of yearGraph) {
    yearCountlabels.push(n._id)
    yearCountdata.push(n.count)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setDay(e.target.value)
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={6}>
              <h3 id="traffic" className="card-title pt-1">
                Candidates
              </h3>
              <div className="small text-medium-emphasis">{}</div>
            </CCol>
            <CCol xs={2}>
              {/* <CFormSelect
                className="w-75"
                onChange={(e) => setfilterStage(e.target.value)}
                value={filterStage}
              >
                <option defaultValue>stages</option>
                {stage.map((item, index) => {
                  return (
                    <option value={item.stage} key={index}>
                      {item.stage}
                    </option>
                  )
                })}
              </CFormSelect> */}
            </CCol>
            <CCol sm={4} className="d-flex">
              <CCol xs={4}>
                <CFormSelect
                  onChange={(e) => setfilterBarValue(e.target.value)}
                  value={filterBarValue}
                >
                  <option defaultValue>Status</option>
                  {filterPie.map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    )
                  })}
                </CFormSelect>
              </CCol>
              <CCol>
                <CButtonGroup className="float-end me-3">
                  {date.map((value) => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      value={value}
                      active={value === day}
                      onClick={handleClick}
                    >
                      {value}
                    </CButton>
                  ))}
                </CButtonGroup>
              </CCol>
            </CCol>
          </CRow>
          {/* {day && day === 'Day' ? (labels = dateCountlabels) : (labels = yearCountlabels)} */}
          {day && day === 'Year' ? (
            <CChartLine
              style={{ height: '300px', marginTop: '40px' }}
              data={{
                labels: yearCountlabels,
                datasets: [
                  {
                    label: 'Candidates By Year',
                    backgroundColor: hexToRgba(getStyle('--cui-success'), 10),
                    borderColor: getStyle('--cui-success'),
                    pointHoverBackgroundColor: getStyle('--cui-success'),
                    borderWidth: 2,
                    data: yearCountdata,
                    fill: true,
                  },
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
          ) : day && day === 'Day' ? (
            filterBarValue === 'Selected' ? (
              <CChartLine
                style={{ height: '300px', marginTop: '40px' }}
                data={{
                  labels: selectedDateCountlabels,
                  datasets: [
                    {
                      label: 'Candidates By Date',
                      backgroundColor: hexToRgba(getStyle('--cui-success'), 10),
                      borderColor: getStyle('--cui-success'),
                      pointHoverBackgroundColor: getStyle('--cui-success'),
                      borderWidth: 2,
                      data: selectedDateCountdata,
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
            ) : (
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
            )
          ) : (
            <CChartLine
              style={{ height: '300px', marginTop: '40px' }}
              data={{
                labels: monthCountlabels,
                datasets: [
                  {
                    label: 'Candidates By Month',
                    backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                    borderColor: getStyle('--cui-info'),
                    pointHoverBackgroundColor: getStyle('--cui-info'),
                    borderWidth: 2,
                    data: monthCountdata,
                    fill: true,
                  },
                  // {
                  //   label: 'My Second dataset',
                  //   backgroundColor: 'transparent',
                  //   borderColor: getStyle('--cui-success'),
                  //   pointHoverBackgroundColor: getStyle('--cui-success'),
                  //   borderWidth: 2,
                  //   data: [
                  //     random(50, 200),
                  //     random(50, 200),
                  //     random(50, 200),
                  //     random(50, 200),
                  //     random(50, 200),
                  //     random(50, 200),
                  //     random(50, 200),
                  //   ],
                  // },
                  // {
                  //   label: 'My Third dataset',
                  //   backgroundColor: 'transparent',
                  //   borderColor: getStyle('--cui-danger'),
                  //   pointHoverBackgroundColor: getStyle('--cui-danger'),
                  //   borderWidth: 1,
                  //   borderDash: [8, 5],
                  //   data: [65, 65, 65, 65, 65, 65, 65],
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
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

export default DayMonthGraphs
