/* eslint-disable react/prop-types */
import { CCard, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import React from 'react'

const LineChart = ({monthGraph}) => {
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
  return (
    <>
      <CCard className="mb-2 ">
        <CCardHeader>
          <CRow>
            <CCol xs={8}>
              <h3>Line Chart</h3>
            </CCol>
            <CCol xs={4}>
            </CCol>
          </CRow>
        </CCardHeader>

        <CChart
          className="p-2"
          type="line"
          data={{
            labels: monthCountlabels,

            datasets: [
              {
                label: 'Candidates By Month',
                backgroundColor: 'rgba(151, 187, 205, 0.2)',
                borderColor: 'rgba(151, 187, 205, 1)',
                pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                pointBorderColor: '#fff',

                data: monthCountdata,
              },
              // {
              //   label: 'My Second dataset',
              //    backgroundColor: 'rgba(220, 220, 220, 0.2)',
              // borderColor: 'rgba(220, 220, 220, 1)',
              // pointBackgroundColor: 'rgba(220, 220, 220, 1)',
              // pointBorderColor: '#fff',
              //   data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
              // },
            ],
          }}
        />
      </CCard>
    </>
  )
}

export default LineChart
