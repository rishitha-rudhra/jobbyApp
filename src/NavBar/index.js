import {withRouter, Link} from 'react-router-dom'
import {BsFillBriefcaseFill, BsHouseFill} from 'react-icons/bs'
import {RiLogoutBoxFill} from 'react-icons/ri'
import Cookies from 'js-cookie'

import './index.css'

const NavBar = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="app-logo"
        />
      </Link>

      <ul className="tabs-container">
        <Link to="/" className="link-ele">
          <li className="tab-item">Home</li>
        </Link>
        <Link to="/jobs" className="link-ele">
          <li className="tab-item">Jobs</li>
        </Link>
        <li>
          <button type="button" className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
      <div className="tabs-sm-container">
        <Link to="/">
          <BsHouseFill className="home-icon" />
        </Link>
        <Link to="/jobs">
          <BsFillBriefcaseFill className="jobs-icon" />
        </Link>
        <button type="button" className="logout-sm-btn" onClick={onLogout}>
          <RiLogoutBoxFill className="logout-icon" />
        </button>
      </div>
    </div>
  )
}

export default withRouter(NavBar)
