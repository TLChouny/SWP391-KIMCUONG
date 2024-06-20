import React, { useState } from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader"
import Slider from "../Slider/Slider"
import Bodycategory from "../Bodycateogry/Bodycategory";
import "../Homepage/Homepage.css"
import News from "../News/News";
export default function Homepage() {
    return (
        <div style={{ height: '100vh', overflowY: 'auto' }}>
            <div className="home">
                <Header />
                <Menuheader />
            </div>
            <Slider />
            <Bodycategory/>
            <News/>
        </div>
    )
}