import './index.css'

const EmploymentTypeItem = props => {
  const {empDetails, onClickEmpItem} = props

  const {employmentTypeId, label} = empDetails

  const onClickItem = () => {
    onClickEmpItem(employmentTypeId)
  }

  return (
    <li className="type-item" key={employmentTypeId}>
      <input
        type="checkbox"
        id={employmentTypeId}
        onChange={onClickItem}
        value={employmentTypeId}
      />
      <label htmlFor={employmentTypeId} className="jobs-label-ele">
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeItem
