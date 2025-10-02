import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import "../styles/Footer.css";
import "../App.css"; 

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-section">
          <h3>Ambur Bandaari Biryani</h3>
          <p><strong>Head Office:</strong> New No.280, Old No.238/2, Ground Floor, Quaid-E-Millath, Chennai, India</p>
          {/* <p><strong>Branch Office:</strong> Ice House, Chennai</p> */}
          <p><strong>Phone:</strong> +91 9003500426</p>
          <p><strong>Email:</strong> amburbandaaribiryani@gmail.com</p>
          
          <div className="social-icons">
            <a 
              href="https://www.instagram.com/amburbandaaribiryani" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://whatsapp.com/channel/0029Vb75wbh1dAw4yyagwv2u" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a 
              href="https://youtube.com/@amburbandaaribiryani?si=c88eCVBxTUg1_lQn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Our Menu</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/outlets">Outlets</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Our Services</h4>
          <ul>
            <li><Link to="/events">Catering Services</Link></li>
            <li><Link to="/outlets">Franchise</Link></li>
            <li><Link to="/menu">Online Delivery</Link></li>
            <li><Link to="/events">Bulk Orders</Link></li>
            <li><Link to="/events">Private Events</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/blog">Our Blog</Link></li>
            <li><Link to="/recipes">Biryani Recipes</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 <strong>Ambur Bandaari Biryani</strong>. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
