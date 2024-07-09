import React from "react";
import Footer from "../Footer/Footer";
import Aboutuslogin from "../Aboutuslogin/Aboutuslogin";
import Headerlogin from "../Headerlogin/Headerlogin";
import Menuheaderlogin from "../Menuheaderlogin/Menuheaderlogin";

export default function Aboutlogin() {
    return (
        <>
            <Headerlogin/>
            <Menuheaderlogin/>
            <div style={{ height: '74vh', overflowY: 'auto' }}>
                <Aboutuslogin />
                <Footer />
            </div>
        </>
    )
}