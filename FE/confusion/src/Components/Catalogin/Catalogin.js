import React from "react";
import "./Catalogin.css"; 
import Headerlogin from "../Headerlogin/Headerlogin";
import Menuheaderlogin from "../Menuheaderlogin/Menuheaderlogin";
import Productcatalogin from "../Productcatalogin/Productcatalogin";
export default function Catalogin() {
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Headerlogin className="fixed-header" />
            <Menuheaderlogin className="fixed-menuheader" />
            <div className="content-container">
                <Productcatalogin />
            </div>
        </div>
    )
}
