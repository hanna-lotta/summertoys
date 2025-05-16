import './Footer.css';
import { Link } from 'react-router';

const Footer = () => {
	  return (
	<footer className="footer">
	  <div className="footer-container">
		<Link to={'/login'} className='login-admin'><h2>Admin Login här</h2></Link>
		<p>&copy; 2023 Your Company. All rights reserved.</p>
		<p>Contact us: info@plaskis.com</p>
	</div>
	  </footer>
	);
};

export default Footer;