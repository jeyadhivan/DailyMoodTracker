import Navbar from '../Navbar'
import './index.css'

const NotFound = () => (
  <div className="bg-container">
    <Navbar />
    <div className="notfound-card">
      <img
        src="https://res.cloudinary.com/dnhlqf4yp/image/upload/v1738141437/Group_7520_xyqapm.png"
        alt="notfound"
      />
      <p style={{color: 'white'}}>Page Not Found.</p>
      <p style={{color: 'white'}}>
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)
export default NotFound
