import { CCard, CCol, CContainer, CRow } from '@coreui/react'
import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROLES } from 'src/constants/RoleConstant'

import {
  getCandidates,
  sortByName,
  sortCandidatesByDeveloper,
  URL,
} from 'src/services/CandidateService'
import CandidateList from './CandidateList'
const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const Candidate = () => {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [sortValue, setSortValue] = useState('')
  const [order, setOrder] = useState('')

  const navigate = useNavigate()
  const sortOptions = ['name', 'email', 'source', 'date', 'stage']
  const sortDevOptions = ['name', 'email', 'source']

  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }

  const getCandidate = () => getCandidates().then((response) => setData(response.data))

  // const getCandidatesByDevelopers = () => {
  //   axios
  //     .get(`${URL}/developers/${user.name}?sort=date&order=desc`, config)
  //     .then((res) => setData(res.data))
  // }

  useEffect(() => {
    if (user.roles === ROLES.ADMIN || user.roles === ROLES.HR) {
      getCandidate()
    }
    // else {
    //   getCandidatesByDevelopers()
    // }
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    navigate('/candidate/add')
  }

  // Sorting Candidates with name, email, source
  const handleSort = (e) => {
    if (user.roles === ROLES.ADMIN || user.roles === ROLES.HR) {
      let value = e.target.value
      let order = e.target.value
      setSortValue(value)
      setOrder(order)
      try {
        sortByName(value, order).then((response) => {
          setData(response.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
    // else {
    //   let value = e.target.value
    //   setSortValue(value)
    //   try {
    //     sortCandidatesByDeveloper(value).then((response) => {
    //       setData(response.data)
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }

  return (
    <>
      <CContainer className="mt--7" fluid>
        <CRow>
          <CCol xs>
            {(user.roles === ROLES.ADMIN|| user.roles === ROLES.HR) && <CCard className="mb-4 shadow">
              <CandidateList
                handleSort={handleSort}
                sortValue={sortValue}
                sortOptions={sortOptions}
                sortDevOptions={sortDevOptions}
                order={order}
                search={search}
                handleClick={handleClick}
                data={data}
                setData={setData}
                setSearch={setSearch}
                getCandidate={getCandidate}
                // getCandidatesByDevelopers={getCandidatesByDevelopers}
                config={config}
              />
            </CCard>}

            {/* {(user.roles === ROLES.DEVELOPER) && <CCard className="mb-4 shadow">
              <CandidateListEmployee
                handleSort={handleSort}
                sortValue={sortValue}
                sortOptions={sortOptions}
                sortDevOptions={sortDevOptions}
                order={order}
                search={search}
                handleClick={handleClick}
                data={data}
                setData={setData}
                setSearch={setSearch}
                getCandidate={getCandidate}
                getCandidatesByDevelopers={getCandidatesByDevelopers}
                config={config}
              />
            </CCard>} */}
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Candidate
