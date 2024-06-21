import React from "react";
import "../Contact/Contact.css"
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextArea from "antd/es/input/TextArea";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Contact() {
    return (
        <div className="contactall">
            <h1>Contact Us</h1>
            <div className="contactalldes">
                <div className="contact-title">
                    <p>Thanks for stopping by! We’re here and happy to help you choose the piece of your dreams.</p>
                    <p>    You can reach out by calling 123-456-7890, emailing <Link to="mailto:emailing info@klarejeweler.com "> info@klarejeweler.com</Link>, or by completing the contact form.</p>
                    <p>    We look forward to hearing from you.</p>
                </div>

                <div className="contact-box">
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div style={{ marginRight: "4%" }}>
                            <TextField
                                label="Name"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '50ch' }}

                            />

                        </div>

                        <div>
                            <TextField
                                label="Email"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '50ch' }}

                            />

                        </div>
                    </Box>

                    <Box>
                        <div>
                            <TextField
                                label="Phone Number"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '109ch' }}

                            />

                        </div>
                    </Box>

                    <Box>
                        <div>
                            <TextField
                                label="Message"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '109ch' }}
                            />

                        </div>
                    </Box>


                    <Button style={{ backgroundColor: "#FADCF9", color: "black", padding: "10px", borderRadius: "30px", width: "4%" }}>Send</Button>

                </div>
            </div>


        </div>
    )

}