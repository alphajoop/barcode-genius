import React from 'react';
import '../css/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container"> 
                <div className="row">
                    <div className="col-12 text-center">
                        <h5 className="footer-appname">BarcodeGenius &copy; {currentYear}. Tous droits réservés.</h5>
                        <ul className="list-inline footer-social-icons">
                            <li className="list-inline-item">
                                <a href="https://www.facebook.com/alphadiopctrl" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.twitter.com/alphadiopctrl" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.instagram.com/alphadiopctrl" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.github.com/alphadiop7" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-github"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;