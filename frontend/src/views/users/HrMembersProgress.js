/* eslint-disable react/prop-types */
import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import { ROLES } from 'src/constants/RoleConstant'
const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const HrMembersProgress = ({
  data,
  recruiterProgressGraph,
}) => {
  return (
    <>
      <CCard className="bg-light shadow">
        <CCardHeader>
          <CRow>
            <CCol>
            {((user.roles === ROLES.ADMIN)) ? <h3> Performance </h3> : (<h3 className="mb-0">{data.name} Statistics</h3>)}
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CChartBar
            data={{
              labels: ['AddCandidate', 'SelectedCandidate'],
              datasets: [
                {
                  label: `  Candidates By Recruiter ${data.name}`,
                  backgroundColor: ['#f87979', '#39e76f'],
                  data: [
                    recruiterProgressGraph.totalAddCount,
                    recruiterProgressGraph.totalSelectedCount,
                  ],
                },
              ],
            }}
            labels="Date"
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default HrMembersProgress
