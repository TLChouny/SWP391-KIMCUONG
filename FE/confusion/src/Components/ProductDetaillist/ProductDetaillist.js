import React from "react";
import Headerlogin from "../Headerlogin/Headerlogin";
import Menuheaderlogin from "../Menuheaderlogin/Menuheaderlogin";
import ProductDetail from "../ProductDetail/ProductDetail";
import Footer from "../Footer/Footer";

export default function ProductDetaillist() {
    return (
        <>
            <Headerlogin />
            <Menuheaderlogin />
            <div style={{height: "672px", overflowY: "auto"}}>
                <ProductDetail />
                <Footer />
            </div>
        </>
    )

}