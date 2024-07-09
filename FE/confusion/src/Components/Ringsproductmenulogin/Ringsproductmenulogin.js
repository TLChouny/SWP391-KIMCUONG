import React from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader";
import ProductlistRings from "../ProductlistRings/ProductlistRings";
import Headerlogin from "../Headerlogin/Headerlogin";
import Menuheaderlogin from "../Menuheaderlogin/Menuheaderlogin";
import ProductlistRingslogin from "../ProductlistRingslogin/ProductlistRingslogin";
export default function Ringsproductmenulogin() {
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
        <Headerlogin className="fixed-header" />
        <Menuheaderlogin className="fixed-menuheader" />
        <div className="content-container">
            <ProductlistRingslogin />
        </div>
    </div>
    )
}