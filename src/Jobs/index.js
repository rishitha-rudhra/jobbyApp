import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import './index.css'
import NavBar from '../NavBar'
import ProfileCard from '../ProfileCard'
import JobsList from '../JobsList'
import EmploymentTypeItem from '../EmploymentTypeItem'
import SalaryRangeItem from '../SalaryRangeItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  pending: 'PENDING',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    profileDetails: {},
    empType: [],
    salRange: '',
    jobs: [],
    profileApiStatus: apiStatusConst.initial,
    jobsApiStatus: apiStatusConst.initial,
  }

  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusConst.pending})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/profile'
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const formattedProfile = {
        name: profileDetails.name,
        shortBio: profileDetails.short_bio,
        profileImageUrl: profileDetails.profile_image_url,
      }
      this.setState({
        profileDetails: formattedProfile,
        profileApiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConst.failure})
    }
  }

  getJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, empType, salRange} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${empType.join()}&minimum_package=${salRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const {jobs} = data

      const formattedJobs = jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        location: eachJob.location,
        jobDescription: eachJob.job_description,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobs: formattedJobs,
        jobsApiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConst.failure})
    }
  }

  componentDidMount = () => {
    this.getProfile()
    this.getJobDetails()
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDownEvent = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          value={searchInput}
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearch}
          onKeyDown={this.onKeyDownEvent}
        />
        <button type="button" data-testid="searchButton" className="search-btn">
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  onClickEmpItem = empId => {
    const {empType} = this.state
    let updatedEmpType = []
    if (empType.includes(empId)) {
      updatedEmpType = empType.filter(each => each !== empId)
    } else {
      updatedEmpType = [...empType, empId]
    }

    this.setState({empType: updatedEmpType}, this.getJobDetails)
  }

  renderEmployementType = () => (
    <ul className="type-container">
      <h1 className="emp-type-head">Type of Employment</h1>
      {employmentTypesList.map(eachItem => (
        <EmploymentTypeItem
          empDetails={eachItem}
          key={eachItem.employmentTypeId}
          onClickEmpItem={this.onClickEmpItem}
        />
      ))}
    </ul>
  )

  onChangeSalary = salaryRangeId => {
    this.setState({salRange: salaryRangeId}, this.getJobDetails)
  }

  renderSalaryRange = () => (
    <ul className="type-container">
      <h1 className="emp-type-head">Salary Range</h1>
      {salaryRangesList.map(eachItem => (
        <SalaryRangeItem
          salaryDetails={eachItem}
          key={eachItem.id}
          onChangeSalary={this.onChangeSalary}
        />
      ))}
    </ul>
  )

  renderProfileFailure = () => (
    <div>
      <button className="logout-btn" onClick={this.getProfile()} type="button">
        Retry
      </button>
    </div>
  )

  renderGetJobsSuccess = () => {
    const {jobs} = this.state
    return jobs.length > 0 ? <JobsList jobs={jobs} /> : this.renderNoJobsView()
  }

  renderGetJobsFailure = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="logout-btn" onClick={this.getJobDetails} type="button">
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {profileDetails, profileApiStatus, jobsApiStatus} = this.state
    return (
      <>
        <NavBar />
        <div className="jobs-body">
          <div className="filters-container">
            {this.renderSearchContainer()}
            {profileApiStatus === apiStatusConst.success && (
              <ProfileCard profileDetails={profileDetails} />
            )}
            {profileApiStatus === apiStatusConst.failure &&
              this.renderProfileFailure()}
            {this.renderEmployementType()}
            {this.renderSalaryRange()}
          </div>
          <>
            {jobsApiStatus === apiStatusConst.success
              ? this.renderGetJobsSuccess()
              : this.renderGetJobsFailure()}
          </>
        </div>
      </>
    )
  }

  renderPendingView = () => (
    <>
      <NavBar />
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-job-img"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  render() {
    return this.renderSuccessView()
  }
}

export default Jobs
