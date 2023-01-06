import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownHeader,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilLockLocked, cilMenu } from '@coreui/icons'

import { ROLES } from 'src/constants/RoleConstant'

const _user = localStorage.getItem('token')
const user = JSON.parse(_user)

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const handleDelete = () => {
    localStorage.removeItem('token')
    window.location.assign('/')
  }

  return (
    <CHeader position="sticky" className="mb-3">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          {user.roles === ROLES.ADMIN && (
            <CNavItem>
              <CNavLink to="/dashboard" component={NavLink}>
                Dashboard
              </CNavLink>
            </CNavItem>
          )}
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <span className="text-info fs-3">{user.name}</span>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0 mt-2" caret={false}>
              <CIcon icon={cilBell} size="lg" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
              <CDropdownItem onClick={handleDelete}>
                <CIcon icon={cilLockLocked} className="me-2" />
                Logout Account
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
