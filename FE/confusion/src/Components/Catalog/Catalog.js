import React from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader";
import "./Catalog.css"; // Assuming the CSS file is named Albumlist.css
import Productcatalog from "../Productcatalog/Productcatalog";

export default function Catalog() {
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Header className="fixed-header" />
            <Menuheader className="fixed-menuheader" />
            <div className="content-container">
                <Productcatalog />
            </div>
        </div>
    )
}
