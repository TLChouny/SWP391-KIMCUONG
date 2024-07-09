import React from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader";
import ProductlistNecklaces from "../ProductlistNecklaces/ProductlistNecklaces";
export default function Necklacesproductmenu() {
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Header className="fixed-header" />
            <Menuheader className="fixed-menuheader" />
            <div className="content-container">
                <ProductlistNecklaces />
            </div>
        </div>
    )
}