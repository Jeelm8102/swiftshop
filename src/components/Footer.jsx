import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand section */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <div className="footer-logo-badge">S</div>
            <span className="footer-logo-text">
              Swift<span>Shop</span>
            </span>
          </Link>
          <p className="footer-brand-desc">
            A premium e-commerce storefront showcasing the finest collection of products, built with speed, utility, and visual excellence.
          </p>
        </div>

        {/* Links section 1 */}
        <div className="footer-links-group">
          <h4>Shop Categories</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Beauty & Cosmetics</Link></li>
            <li><Link to="/">Fragrances</Link></li>
            <li><Link to="/">Electronics & Gadgets</Link></li>
            <li><Link to="/">Groceries</Link></li>
          </ul>
        </div>

        {/* Links section 2 */}
        <div className="footer-links-group">
          <h4>Customer Support</h4>
          <ul className="footer-links-list">
            <li><a href="#">Contact Support</a></li>
            <li><a href="#">FAQ & Help Center</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Store Locator</a></li>
          </ul>
        </div>

        {/* Links section 3 */}
        <div className="footer-links-group">
          <h4>Company</h4>
          <ul className="footer-links-list">
            <li><a href="#">About SwiftShop</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SwiftShop Inc. All rights reserved.</p>
        <div className="footer-socials">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
