import React, { useState } from "react";
import "../Contact/Contact.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://6674f5cf75872d0e0a9802a1.mockapi.io/contact";

export default function Contactlogin() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        message: ""
    });

    const [emailError, setEmailError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false); // State để đánh dấu lỗi số điện thoại

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Kiểm tra và giới hạn số lượng ký tự nhập vào ô "Phone Number"
        if (name === "phoneNumber" && value.length > 10) {
            return; // Nếu vượt quá 10 số, không thay đổi giá trị
        }

        // Kiểm tra chỉ cho phép nhập số vào ô "Phone Number"
        if (name === "phoneNumber" && /[^0-9]/.test(value)) {
            setPhoneNumberError(true);
            return;
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Reset lỗi khi người dùng thay đổi giá trị ô "Phone Number"
        if (name === "phoneNumber") {
            setPhoneNumberError(false);
        }
    };

    const handleFormSubmit = async () => {
        // Kiểm tra điều kiện có dữ liệu nhập vào hay không
        if (!formData.name || !formData.email || !formData.phoneNumber || !formData.message) {
            toast.error("Please fill in the form to contact us.");
            return;
        }

        // Kiểm tra định dạng email
        if (!formData.email.endsWith("@gmail.com")) {
            toast.error("Please enter a valid email address (e.g.example@gmail.com)");
            setEmailError(true);
            return;
        }

        // Kiểm tra độ dài số điện thoại
        if (formData.phoneNumber.length !== 10) {
            toast.error("Phone number must have exactly 10 digits.");
            setPhoneNumberError(true);
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success("Your message has been sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    phoneNumber: "",
                    message: ""
                });
                setEmailError(false); // Xóa lỗi email nếu có
                setPhoneNumberError(false); // Xóa lỗi số điện thoại nếu có
            } else {
                toast.error("Failed to send message. Please try again later.");
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="contactall">
            <ToastContainer style={{width: "18%"}} />
            <h1>Contact Us</h1>
            <div className="contactalldes">
                <div className="contact-title">
                    <p>Thanks for stopping by! We’re here and happy to help you choose the piece of your dreams.</p>
                    <p>You can reach out by calling 123-456-7890, emailing <Link to="mailto:info@klarejeweler.com">info@klarejeweler.com</Link>, or by completing the contact form.</p>
                    <p>We look forward to hearing from you.</p>
                </div>

                <div className="contact-box">
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div style={{ marginRight: "4%" }}>
                            <TextField
                                label="Name"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                sx={{ m: 1, width: '50ch' }}
                            />
                        </div>

                        <div>
                            <TextField
                                label="Email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={emailError}
                                sx={{ m: 1, width: '50ch' }}
                            />
                        </div>
                    </Box>

                    <Box>
                        <div>
                            <TextField
                                label="Phone Number"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                error={phoneNumberError}
                                helperText={phoneNumberError ? "Only enter numbers and no more than 10 digits." : ""}
                                sx={{ m: 1, width: '109ch' }}
                            />
                        </div>
                    </Box>

                    <Box>
                        <div>
                            <TextField
                                label="Message"
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                sx={{ m: 1, width: '109ch' }}
                            />
                        </div>
                    </Box>

                    <Button
                        onClick={handleFormSubmit}
                        style={{ backgroundColor: "#FADCF9", color: "black", padding: "10px", borderRadius: "30px", width: "4%", marginTop: "5px", marginBottom: "5px" }}
                    >
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
}
