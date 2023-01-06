import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Notifications } from 'react-push-notification';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const _user = localStorage.getItem('token')
const user = JSON.parse(_user)
// if (user.token.includes("user")) {
//   console.log("admin")
// } else {
//   // Deny access
//   console.log("no")
// }
class App extends Component {
  render() {
    return (
      <HashRouter>
            <Notifications/>

        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            {user ? (
              <Route path="*" name="Home" element={<DefaultLayout />} />
            ) : (
              <Route exact path="*" name="Login Page" element={<Login />} />
            )}
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
