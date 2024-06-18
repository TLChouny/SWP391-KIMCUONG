import React from "react";
import './Bodycate.css';
import { Link } from 'react-router-dom';
export default function Bodycate() {
    return (
        <div className="bodycate-container">
            <h1>Category</h1>
            <div className="bodycate">
                <div className="bodycate-container-image">
                    <Link to="/album/nhan">
                        <img src="../assets/Ring_Guest.jpg" alt="Nhẫn" />
                    </Link>

                    <Link to="/album/bong-tai">
                        <img src="../assets/banner-bong-tai-kim-cuong-tu-nhien-jemmia.vn_-600x600.jpg" alt="Bông tai" className="bodycate-container-image-2" />
                    </Link>
                </div>

                <div className="bodycate-container-image-3">
                    <Link to="/">
                        <img src="../assets/Earring_Guest.jpg" alt="Bông tai" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
