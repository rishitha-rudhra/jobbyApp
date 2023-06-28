import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobsList = props => {
  const {jobs} = props

  const renderJobCard = jobDetails => {
    const {
      id,
      companyLogoUrl,
      employmentType,
      location,
      jobDescription,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <Link to={`/jobs/${id}`} className="link-item">
        <li className="job-card">
          <div className="header-sec">
            <img src={companyLogoUrl} alt="company" className="comp-logo" />
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-container">
            <div className="location-sec">
              <MdLocationOn className="icon" />
              <p className="text">{location}</p>
            </div>
            <div className="location-sec">
              <BsFillBriefcaseFill className="icon" />
              <p className="text">{employmentType}</p>
            </div>
            <p className="job-package text">{packagePerAnnum}</p>
          </div>
          <p className="descrip-head">Description</p>
          <p>{jobDescription}</p>
        </li>
      </Link>
    )
  }

  return (
    <ul className="jobs-list-container">
      {jobs.map(eachJob => {
        const key = eachJob.id
        return renderJobCard(eachJob, key)
      })}
    </ul>
  )
}

export default JobsList
