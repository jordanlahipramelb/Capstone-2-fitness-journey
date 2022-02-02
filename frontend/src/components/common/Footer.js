import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer" className="mt-4">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="footer-info">
                <h3>Fitness Journey</h3>
                <p>1245 Lorem Ipsum</p>
                <p>HI 48575, USA</p>
                <p>
                  <strong>Phone:</strong> +1 808 845 8787
                </p>
                <p>
                  <strong>Email:</strong> jlahipramelb@gmail.com
                </p>
                <div className="social-links mt-3">
                  <a href="#" className="github">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="instagram">
                    <i className="fab fa-instagram"></i>
                  </a>

                  <a href="#" className="linkedin">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i class="fas fa-chevron-right"></i> <Link to="/">Home</Link>
                </li>
                <li>
                  <i class="fas fa-chevron-right"></i> <a href="#">About Us</a>
                </li>
                <li>
                  <i class="fas fa-chevron-right"></i> <a href="#">Services</a>
                </li>
                <li>
                  <i class="fas fa-chevron-right"></i>
                  <a href="#">Terms Of Service</a>
                </li>
                <li>
                  <i class="fas fa-chevron-right"></i>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright">&copy; Copyright . All Rights Reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
