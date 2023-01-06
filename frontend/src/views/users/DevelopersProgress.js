/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCardHeader, CCol, CFormSelect, CRow } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import addNotification from 'react-push-notification'
import { ROLES } from 'src/constants/RoleConstant'
import { URL } from 'src/services/CandidateService'
import { getStages } from 'src/services/StagesServices'
const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const DevelopersProgress = ({
  developerSelectProgressGraph,
  developerRejectProgressGraph,
  devCandidateGraph,
  filterStage,
  setfilterStage,
  data,
}) => {
  const [stage, setstage] = useState([])
  const [item, setItem] = useState([])

  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }

  const getCandidatesByDevelopers = () => {
    axios
      .get(`${URL}/developers/${user.name}?sort=date&order=desc`, config)
      .then((res) => setItem(res.data))
  }

  useEffect(() => {
    getStages().then((response) => setstage(response.data))
    getCandidatesByDevelopers()

  }, [])

  const devSelectdata = []
  for (var i of developerSelectProgressGraph) {
    devSelectdata.push(i.count)
  }

  const devRejectdata = []
  for (var j of developerRejectProgressGraph) {
    devRejectdata.push(j.count)
  }

  const devdata = []
  for (var k of devCandidateGraph) {
    devdata.push(k.count)
  }
  const candidateAssigned = []
  for (let i of item) {
    if (i.roles === ROLES.DEVELOPER) {
      candidateAssigned.push(i)
    }
  }

  let count = [];
  for (let i of candidateAssigned){
    if(i.devStatus === 'Pending'){
      count.push(i)
    }
  }
  useEffect(() => {

    if(count.length > 0){
      addNotification({
        title: 'Notification',
        // subtitle: 'Candidate Assigned to Interview',
        message: `You have ${count.length} Pending`,
        duration :'3000',
        theme: 'light',
        closeButton:"X",
        backgroundTop:"lightblue",
      })
    }
  },[count.length])
  return (
    <>
      <CCard className="bg-light shadow">
        <CCardHeader>
          <CRow>
            <CCol>
              {user.roles === ROLES.ADMIN ? (
                <h3> Performance </h3>
              ) : (
                <h3 className="mb-0">{data.name} Statistics</h3>
              )}
            </CCol>
            <CCol xs={5}>
              <CFormSelect
                className="w-75"
                onChange={(e) => setfilterStage(e.target.value)}
                value={filterStage}
              >
                <option defaultValue>stages</option>
                {stage.map((item, index) => {
                  return (
                    item.roles[0] === ROLES.DEVELOPER && (
                      <option value={item.stage} key={index}>
                        {item.stage}
                      </option>
                    )
                  )
                })}
              </CFormSelect>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CChartBar
            data={{
              labels: ['Assigned', 'Selected', 'Rejected'],
              datasets: [
                {
                  label: 'Candidates By Date',
                  backgroundColor: ['#FFCE56', '#39e76f', '#FF6384'],
                  data: [devdata, devSelectdata, devRejectdata],
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

export default DevelopersProgress
