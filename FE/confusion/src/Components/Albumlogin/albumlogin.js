import React from "react";

import "./albumlogin.css"; // Assuming the CSS file is named Albumlist.css
import Menuheaderlogin from "../Menuheaderlogin/Menuheaderlogin";
import Headerlogin from "../Headerlogin/Headerlogin";
import Productlistlogin from "../Productlistlogin/Productlistlogin";

export default function Albumlogin() {
    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Headerlogin className="fixed-header" />
            <Menuheaderlogin className="fixed-menuheader" />
            <div className="content-container">
                <Productlistlogin />
            </div>
        </div>
    )
}
