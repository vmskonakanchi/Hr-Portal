/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCardHeader, CCol, CFormLabel, CProgress, CProgressBar, CRow } from '@coreui/react'
import React from 'react'

const StageChart = ({stageGraph}) => {
  return (
    <>
        <CCard className="mb-2" >
            <CCardHeader>
              <CRow >
                <CCol xs={8}>
                  <h3>Recruitment Stages</h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              {stageGraph.stages
                ? stageGraph.stages.map((item, index) => {
                    return (
                      <div key={index}>
                        <CFormLabel>{item._id}</CFormLabel>
                          <CProgress className="mb-3">
                            <CProgressBar
                              color="success"
                              animated
                              value={(item.count / stageGraph.totalCount) * 100}
                            >
                              <span className="h6 mt-2">{item.count}</span>
                            </CProgressBar>
                          </CProgress>
                      </div>
                    )
                  })
                : ''}
            </CCardBody>
          </CCard>
    </>
  )
}

export default StageChart