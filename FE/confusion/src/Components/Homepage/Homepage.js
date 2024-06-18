import React, { useState } from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader"
import Slider from "../Slider/Slider"
import Bodycate from "../Bodycate/Bodycate";
import "../Homepage/Homepage.css"
export default function Homepage() {
    return (
        <div style={{ height: '100vh', overflowY: 'auto' }}>
            <div className="home">
                <Header />
                <Menuheader />
            </div>
            <Slider />
            <Bodycate/>
        </div>
    )
}