import React from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader";
import ProductlistBrace from "../ProductlistBrace/ProductlistBrace";
import Headerlogin from "../Headerlogin/Headerlogin";
import Menuheaderlogin from "../Menuheaderlogin/Menuheaderlogin";
import ProductlistBracelogin from "../ProductlistBracelogin/ProductlistBracelogin";

export default function Braceletsproductmenulogin(){
    return(
        <div style={{ height: '100vh', overflow: 'hidden' }}>
        <Headerlogin className="fixed-header" />
        <Menuheaderlogin className="fixed-menuheader" />
        <div className="content-container">
            <ProductlistBracelogin />
        </div>
    </div>
    )
}