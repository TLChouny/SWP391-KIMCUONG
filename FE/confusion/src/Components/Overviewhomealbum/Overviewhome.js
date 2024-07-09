import React from "react";
import { Link } from "react-router-dom";
import overviewhome from "../../data/overviewhome.json"; 
import "./Overviewhome.css"; 

export default function Overviewhome() {
    return (
        <div className="overview-container">
            <h1>Catalog</h1>
            <div className="overview-grid">
                {overviewhome.map((overview, index) => (
                    <div key={index} className="overview-item">
                        <Link to={overview.link}><img src={overview.image} alt={overview.title} /></Link>
                        <p>{overview.name}</p>
                    </div>

                    
                ))}
            </div>
        </div>
    );
}
