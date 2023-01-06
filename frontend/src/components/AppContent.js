import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { ROLES } from 'src/constants/RoleConstant'
import Page500 from 'src/views/pages/page500/Page500'
import Stages from 'src/views/stages/Stages'
import EditStageForm from 'src/views/candidate/EditStageForm'
import EditStages from 'src/views/stages/EditStages'
import Status from 'src/views/candidate/Status'
import AddStages from 'src/views/stages/AddStages'
import Departments from 'src/views/department/Departments'
import AddDepartment from 'src/views/department/AddDepartment'
import EditDepartment from 'src/views/department/EditDepartment'
import DepartmentDashboard from 'src/views/dashboard/DepartmentDashboard'
import MainStatus from 'src/views/status/Status'
import AddStatus from 'src/views/status/AddStatus'
import EditStatus from 'src/views/status/EditStatus'
import EmpCandidate from 'src/views/candidate/employee/EmpCandidate'
import EmpStatus from 'src/views/candidate/employee/EmpStatus'

const Dashboard = React.lazy(() => import('src/views/dashboard/Dashboard'))
const Candidate = React.lazy(() => import('src/views/candidate/Candidate'))
const AddCandidate = React.lazy(() => import('src/views/candidate/AddCandidate'))
const ViewCandidate = React.lazy(() => import('src/views/candidate/ViewCandidate'))
const EditCandidate = React.lazy(() => import('src/views/candidate/EditCandidate'))

const Users = React.lazy(() => import('src/views/users/Users'))
const AddUsers = React.lazy(() => import('src/views/users/AddUsers'))
const EditUsers = React.lazy(() => import('src/views/users/EditUsers'))
const ViewUsers = React.lazy(() => import('src/views/users/ViewUsers'))

const Profile = React.lazy(() => import('src/views/profile/Profile'))

const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {/* {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })} */}

          {/* Dashboard Routes */}
          { (user.roles === ROLES.ADMIN) ?  <Route path="/dashboard" exact name="Dashboard" element={<Dashboard />} /> : <Route path="/dashboard" exact name="Dashboard" element={<DepartmentDashboard />} />}

          {/* Candidate Routes */}
           {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && <Route path="/candidate" exact name="Candidate" element={<Candidate />} />}
           {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && <Route path="/candidate/add" exact name="AddCandidate" element={<AddCandidate />} />}
           {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && <Route path="/candidate/view/:id" exact name="ViewCandidate" element={<ViewCandidate />} />}
           {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && <Route path="/candidate/edit/:id" exact name="EditCandidate" element={<EditCandidate />} />}
           {(user.roles === ROLES.ADMIN || user.roles === ROLES.HR) && <Route path="/candidate/stage/:id" exact name="EditStageForm" element={<EditStageForm />} />}
            {(user.roles === ROLES.HR) && <Route path="/candidate/status/:id" exact name="Status" element={<Status />} />}
          {user.roles === ROLES.DEVELOPER && <Route path="/candidate" exact name="EmpCandidate" element={<EmpCandidate />} />}
          {user.roles === ROLES.DEVELOPER && <Route path="/employee/status/:id" exact name="Employee Status" element={<EmpStatus />} />}

          {/* Users Routes */}
          {(user.roles === ROLES.ADMIN) &&  <Route path="/users" exact name="Users" element={<Users />} />}
          {(user.roles === ROLES.ADMIN) &&  <Route path="/users/add" exact name="AddUsers" element={<AddUsers />} />}
          {(user.roles === ROLES.ADMIN) &&  <Route path="/users/view/:id" exact name="ViewUsers" element={<ViewUsers />} />}
          {(user.roles === ROLES.ADMIN) &&  <Route path="/users/edit/:id" exact name="EditUsers" element={<EditUsers />} />}

          {/* Stage Routes */}
          {(user.roles === ROLES.ADMIN) &&  <Route path="/stage" exact name="Stages" element={<Stages />} />}
          {(user.roles === ROLES.ADMIN) &&  <Route path="/stage/edit/:id" exact name="EditStages" element={<EditStages />} />}
          {(user.roles === ROLES.ADMIN) &&  <Route path="/stage/add" exact name="AddStages" element={<AddStages />} />}

          {/* Departments Routes */}
          {(user.roles === ROLES.ADMIN) &&  <Route path="/departments" exact name="Departments" element={<Departments />} />}
          {(user.roles === ROLES.ADMIN) &&  <Route path="/department/add" exact name="AddDepartment" element={<AddDepartment />} />}
          {(user.roles === ROLES.ADMIN) &&  <Route path="/department/edit/:id" exact name="EditDepartments" element={<EditDepartment />} />}

          {/* Status Routes */}
          {(user.roles === ROLES.ADMIN) &&  <Route path="/status" exact name="Status" element={<MainStatus />} />}
          {(user.roles === ROLES.ADMIN) &&  <Route path="/status/add" exact name="AddStatus" element={<AddStatus />} />}
          {(user.roles === ROLES.ADMIN) &&  <Route path="/status/edit/:id" exact name="EditStatus" element={<EditStatus />} />}

          {/* Password Change Routes */}
          {<Route path="/profile" exact name="Profile" element={<Profile />} />}

          <Route path="/" element={<Navigate to="dashboard" replace />} />

        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
