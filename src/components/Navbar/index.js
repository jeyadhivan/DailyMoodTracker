import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Navbar = ({history}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.push('/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
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
      <button className="hamburger" type="button" onClick={toggleMenu}>
        &#9776;
      </button>
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/reports" onClick={toggleMenu}>
            Reports
          </Link>
          <button
            type="button"
            onClick={() => {
              onClickLogout()
              toggleMenu()
            }}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default withRouter(Navbar)
