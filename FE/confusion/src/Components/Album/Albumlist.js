import React from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader";
import Productlist from "../Product/Productlist";
import "./Albumlist.css"; // Assuming the CSS file is named Albumlist.css

export default function Albumlist() {
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Header className="fixed-header" />
            <Menuheader className="fixed-menuheader" />
            <div className="content-container">
                <Productlist />
            </div>
        </div>
    )
}
