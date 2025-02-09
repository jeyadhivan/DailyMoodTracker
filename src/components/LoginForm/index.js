import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginForm = ({history}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const jwtTokens = Cookies.get('jwt_token')
  if (jwtTokens !== undefined) {
    return <Redirect to="/" />
  }

  const onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 20})
    history.replace('/')
  }

  const onFailure = errorMsg => {
    setError(errorMsg)
  }
  const onClickLogin = async e => {
    e.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      onSuccess(data.jwt_token)
    } else {
      onFailure(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <form className="form-card" onSubmit={onClickLogin}>
          <h1>Daily Mood Tracker</h1>
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            className="login-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="forget-password">
            <input
              type="checkbox"
              id="showPassword"
              className="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="password">
              Show Password
            </label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  )
}
export default LoginForm
