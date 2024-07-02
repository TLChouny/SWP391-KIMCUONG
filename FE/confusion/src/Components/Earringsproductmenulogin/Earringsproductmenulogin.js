import React from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader";
import ProductlistEarringlogin from "../ProductlistEarringlogin/ProductlistEarringlogin";
import Headerlogin from "../Headerlogin/Headerlogin";
import Menuheaderlogin from "../Menuheaderlogin/Menuheaderlogin";
export default function Earringsproductmenulogin() {
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Headerlogin className="fixed-header" />
            <Menuheaderlogin className="fixed-menuheader" />
            <div className="content-container">
                <ProductlistEarringlogin />
            </div>
        </div>
    )
}