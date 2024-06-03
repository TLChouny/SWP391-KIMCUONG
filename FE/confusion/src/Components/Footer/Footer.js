import React from "react";
import PhoneOutlined from "@ant-design/icons/PhoneOutlined";
import MailOutlined from "@ant-design/icons/MailOutlined";
import "../Footer/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h2>Quick links</h2>
                    <ul>
                        <li>About</li>
                        <li>Reviews</li>
                        <li>Customer Gallery</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h2>Policies</h2>
                    <ul>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h2>Get in touch</h2>
                    <ul>
                        <Link to="tel:012-345-6789" style={{textDecoration: "none", color: "black"}}><li><PhoneOutlined /> 012-345-6789</li></Link>
                        <Link to="mailto: jewelry@gmail.com "style={{textDecoration: "none", color: "black"}}><li><MailOutlined /> jewelry@gmail.com</li></Link>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>@2024 Klare Jewelers</p>
                <img src="../assets/logo.jpg" alt="logo" className="logofooter" />
            </div>
        </div>
    );
}
