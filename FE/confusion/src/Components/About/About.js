import React from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader";
import Aboutus from "../About us/Aboutus";
import Footer from "../Footer/Footer";

export default function About() {
    return (
        <>
            <Header />
            <Menuheader />
            <div style={{ height: '74vh', overflowY: 'auto' }}>
                <Aboutus />
                <Footer />
            </div>
        </>
    )
}