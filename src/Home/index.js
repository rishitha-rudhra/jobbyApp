import {Component} from 'react'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="home-body">
          <h1 className="body-heading">Find The Job That Fits Your Life</h1>
          <p className="body-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs">
            <button type="button" className="find-jobs-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
