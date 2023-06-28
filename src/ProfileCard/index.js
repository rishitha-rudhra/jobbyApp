import './index.css'

const ProfileCard = props => {
  const {profileDetails} = props
  const {name, profileImageUrl, shortBio} = profileDetails
  return (
    <div className="profile-card">
      <img src={profileImageUrl} />
      <p className="profile-name">{name}</p>
      <p className="profile-bio">{shortBio}</p>
    </div>
  )
}

export default ProfileCard
