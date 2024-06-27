import React from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader";
import ProductlistRings from "../ProductlistRings/ProductlistRings";
export default function Ringsproductmenu() {
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
        <Header className="fixed-header" />
        <Menuheader className="fixed-menuheader" />
        <div className="content-container">
            <ProductlistRings />
        </div>
    </div>
    )
}