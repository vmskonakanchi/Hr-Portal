import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CNavItem,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { logoNegative } from 'src/assets/brand/logo-negative'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
// import navigation from '../_nav'
import { cilPeople, cilSpeedometer, cilUser, cibDailymotion, cibStatuspage } from '@coreui/icons'
import { ROLES } from 'src/constants/RoleConstant'

const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        YOUNG MINDS
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {/* {<AppSidebarNav items={navigation} />} */}
          {/* <div className="flexGrow">
                <NavLink to="/dashboard">Dashboard</NavLink>
            </div> */}

          <CSidebar>
            {/* <CSidebarBrand>Sidebar Brand</CSidebarBrand> */}
            <CSidebarNav>
              {/* <CNavTitle>Nav Title</CNavTitle> */}
              <CNavItem href="#">
                <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                Dashboard
              </CNavItem>
              <CNavItem href="#/candidate">
                <CIcon customClassName="nav-icon" icon={cilPeople} />
                Candidates
              </CNavItem>
              {user.roles === ROLES.ADMIN && (
                <CNavItem href="#/users">
                  <CIcon customClassName="nav-icon" icon={cilUser} />
                  Users
                </CNavItem>
              )}
              {user.roles === ROLES.ADMIN && (
                <CNavItem href="#/stage">
                  <CIcon customClassName="nav-icon" icon={cilUser} />
                  Stages
                </CNavItem>
              )}
              {user.roles === ROLES.ADMIN && (
                <CNavItem href="#/departments">
                  <CIcon customClassName="nav-icon" icon={cibDailymotion} />
                  Departments
                </CNavItem>
              )}
              {user.roles === ROLES.ADMIN && (
                <CNavItem href="#/status">
                  <CIcon customClassName="nav-icon" icon={cibStatuspage} />
                  Status
                </CNavItem>
              )}
              <CNavItem href="#/profile">
                <CIcon customClassName="nav-icon" icon={cilUser} />
                Profile
                {/* <CBadge color="primary ms-auto">NEW</CBadge> */}
              </CNavItem>
            </CSidebarNav>
          </CSidebar>
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
