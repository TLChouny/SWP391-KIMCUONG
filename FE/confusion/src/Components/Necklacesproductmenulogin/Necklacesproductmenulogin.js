import React from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader";
import ProductlistNecklaces from "../ProductlistNecklaces/ProductlistNecklaces";
import Headerlogin from "../Headerlogin/Headerlogin";
import Menuheaderlogin from "../Menuheaderlogin/Menuheaderlogin";
import ProductlistNecklaceslogin from "../ProductlistNecklaceslogin/ProductlistNecklaceslogin";
export default function Necklacesproductmenulogin() {
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Headerlogin className="fixed-header" />
            <Menuheaderlogin className="fixed-menuheader" />
            <div className="content-container">
                <ProductlistNecklaceslogin />
            </div>
        </div>
    )
}