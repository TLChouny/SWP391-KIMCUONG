import React from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader";
import ProductlistEarring from "../ProductlistEarring/ProductlistEarring";
export default function Earringsproductmenu() {
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Header className="fixed-header" />
            <Menuheader className="fixed-menuheader" />
            <div className="content-container">
                <ProductlistEarring />
            </div>
        </div>
    )
}