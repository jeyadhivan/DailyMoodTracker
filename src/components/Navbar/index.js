import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Navbar = ({history}) => {
  const onClickLogout = () => {
    console.log(history)
    Cookies.remove('jwt_token')
    history.push('/login')
  }
  return (
    <nav className="navbar">
      <h1>Daily Mood Tracker</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/reports">Reports</Link>
        <button type="button" onClick={onClickLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Navbar)
