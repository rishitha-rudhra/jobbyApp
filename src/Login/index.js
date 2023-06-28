import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  renderUsernameContainer = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label htmlFor="username" className="label-ele">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-ele"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    )
  }

  renderPasswordContainer = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label htmlFor="password" className="label-ele">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-ele"
          onChange={this.onChangePassword}
          value={password}
        />
      </div>
    )
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    const {history} = this.props
    history.replace('/')
  }

  authenticateUser = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      this.onSubmitSuccess(jwtToken)
    } else {
      const errorMsg = `*${data.error_msg}`
      this.setState({errorMsg})
    }
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.authenticateUser()
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-card" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="app-logo-login"
          />

          {this.renderUsernameContainer()}
          {this.renderPasswordContainer()}
          <button className="login-btn" type="submit">
            Login
          </button>
          <p className="error-msg">{errorMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
