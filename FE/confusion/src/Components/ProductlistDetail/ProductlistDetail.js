import React from "react";
import Footer from "../Footer/Footer";
import Product from "../Product/Product";
import Menuheader from "../Menu/Menuheader";
import Header from "../Header/Header";

export default function ProductlistDetail() {
    return (
        <>
            <Header />
            <Menuheader />
            <div style={{ height: "672px", overflowY: "auto" }}>
                <Product />
                <Footer />
            </div>
        </>
    )

}