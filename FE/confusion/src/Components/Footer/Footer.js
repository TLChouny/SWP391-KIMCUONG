import React from "react";
import PhoneOutlined from "@ant-design/icons/PhoneOutlined";
import MailOutlined from "@ant-design/icons/MailOutlined";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import "../Footer/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h2>Get in touch</h2>
                    <ul>
                        <Link to="tel:012-345-6789" style={{ textDecoration: "none", color: "black" }}><li><PhoneOutlined /> 012-345-6789</li></Link>
                        <Link to="mailto: jewelry@gmail.com " style={{ textDecoration: "none", color: "black" }}><li><MailOutlined /> jewelry@gmail.com</li></Link>
                        <Link to="https://maps.app.goo.gl/FGPoRM32g1bPfpvc6" style={{ textDecoration: "none", color: "black", marginLeft: "-20%" }}><li style={{ marginLeft: "-1%", lineHeight: "-2%", marginTop: "-2%" }}><LocationOnIcon />E2a-7, Street D1, Long Thanh My, Thu Duc City</li></Link>
                    </ul>
                </div>

                <div className="footer-column">
                    <h2>HOURS OF OPERATION</h2>
                    <div className="footer">
                        <AccessTimeIcon style={{ marginTop: "-30%" }} />
                        <ul className="footer-column-second">
                            <li>Sun & Mon: Closed</li>
                            <li>Tues, Wed, Fri: 10AM – 5:30PM
                            </li>
                            <li>Thurs: 10AM – 7:30PM
                            </li>
                            <li>Sat: 10AM – 5PM</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-column">
                    <h2>QUICK LINKS</h2>
                    <ul>
                        <li>About Us</li>
                        <li>Blog</li>
                        <li>Contact Us</li>
                    </ul>
                </div>


            </div>

            <div className="footer-bottom-account">
                
                <img src="../assets/logo.jpg" alt="logo" className="logofooter" />
            </div></div>

    );
}
