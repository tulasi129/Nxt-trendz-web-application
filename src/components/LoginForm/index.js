import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isSubmitError: false,
  }

  username = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginform-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="websiteLogo-mobie-image"
          alt=""
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="website-login"
          alt=""
        />
        <form className="my-from" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="websiteLogo-desktop-image"
            alt=""
          />
          <div className="username-input">
            <label className="usernameElement" htmlFor="username">
              USERNAME
            </label>
            <input
              className="username"
              id="username"
              placeholder="username"
              onChange={this.username}
              value={username}
            />
          </div>
          <div className="password-input">
            <label className="passwordElement" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="password"
              id="password"
              placeholder="password"
              onChange={this.password}
              value={password}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {isSubmitError && <p className="errorMsg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
