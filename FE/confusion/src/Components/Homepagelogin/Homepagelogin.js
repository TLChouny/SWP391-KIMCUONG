import React, { useState } from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader"
import Slider from "../Slider/Slider"
import Bodycategory from "../Bodycateogry/Bodycategory";
import "../Homepagelogin/Homepagelogin.css"
import News from "../News/News";
import Footer from "../Footer/Footer"
import Headerlogin from "../Headerlogin/Headerlogin";
import Menuheaderlogin from "../Menuheaderlogin/Menuheaderlogin";
export default function Homepagelogin() {
    return (
        <div style={{ height: '100vh', overflowY: 'auto' }}>
            <div className="home">
                <Headerlogin />
                <Menuheaderlogin />
            </div>
            <Slider />
            <Bodycategory/>
            <News/>
            <Footer/>
        </div>
    )
}