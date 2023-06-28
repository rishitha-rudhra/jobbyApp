import './index.css'

const SalaryRangeItem = props => {
  const {salaryDetails, onChangeSalary} = props

  const {salaryRangeId, label} = salaryDetails

  const changeSalary = () => {
    onChangeSalary(salaryRangeId)
  }

  return (
    <li className="type-item">
      <input
        type="radio"
        id={salaryRangeId}
        name="salaryRange"
        value={salaryRangeId}
        onChange={changeSalary}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRangeItem
