/* eslint-disable react/prop-types */
import React from 'react'
import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'
// import { CChartBar, CChartLine } from '@coreui/react-chartjs'



const WidgetsDropdown = (props) => {
  const {data} = props;

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-2 px-2 text-center"
          color="info"
          title={<h6>TOTAL</h6>}
          action={<h6 className='me-3'>{data.totalCount}</h6>}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-2 px-2 text-center"
          color="success"
          title={<h6>SELECTED</h6>}
          action={<h6 className='me-3'>{data.selected}</h6>}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-2 px-2 text-center"
          color="danger"
          title={<h6>REJECTED</h6>}
          action={<h6 className='me-3'>{data.rejected}</h6>}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-2 px-2 text-center"
          color="warning"
          title={<h6>INPROCESS</h6>}
          action={<h6 className='me-3'>{data.pending}</h6>}
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
