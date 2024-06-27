import React from "react";
import Header from "../Header/Header";
import Menuheader from "../Menu/Menuheader";
import ProductlistBrace from "../ProductlistBrace/ProductlistBrace";

export default function Braceletsproductmenu(){
    return(
        <div style={{ height: '100vh', overflow: 'hidden' }}>
        <Header className="fixed-header" />
        <Menuheader className="fixed-menuheader" />
        <div className="content-container">
            <ProductlistBrace />
        </div>
    </div>
    )
}