import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const LoginForm = ({history}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 20})
    history.push('/')
  }

  const onFailure = errorMsg => {
    setError(errorMsg)
  }
  const onClickLogin = async () => {
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
        <form className="form-card">
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
              className="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <p className="password">Show Password</p>
          </div>
          <button type="button" className="login-button" onClick={onClickLogin}>
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  )
}
export default LoginForm
