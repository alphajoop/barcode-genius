import React from 'react';
import '../css/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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
                                <a href="https://github.com/alphajoop/barcode-genius" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faGithub} />  View on GitHub
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