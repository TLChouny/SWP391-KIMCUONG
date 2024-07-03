import React from "react";
import { Link } from "react-router-dom";
import overviewhome from "../../data/overviewhomelogin.json"; // Đường dẫn tới file JSON chứa dữ liệu
import "./Overviewhomelogin.css"; // Import CSS file for styling

export default function Overviewhomelogin() {
    return (
        <div className="overview-container">
            <h1>Catalog</h1>
            {/* Sử dụng Link từ react-router-dom để tạo liên kết */}
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
