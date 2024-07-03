import React from "react";
import './Bodycateogrylogin.css';
import { Link } from 'react-router-dom';
export default function Bodycateogrylogin() {
    return (
        <div className="bodycate-container">
            <h1>Category</h1>
            <div className="bodycate">
                <div className="bodycate-container-image">
                    <>
                        <Link to="/albumlogin/Ring" style={{ textDecoration: "none" }} >
                            <img src="../assets/Ring_Guest.jpg" alt="Nhẫn" />
                        </Link>
                        {/* <Link to="/album/nhan" style={{ textDecoration: "none" }} className="link-image">
                            <div>
                                Details
                            </div>
                        </Link> */}
                    </>

                    <>
                        <Link to="/albumlogin/Earring" style={{ textDecoration: "none" }}>
                            <img src="../assets/banner-bong-tai-kim-cuong-tu-nhien-jemmia.vn_-600x600.jpg" alt="Bông tai" className="bodycate-container-image-2" />
                        </Link>
                        {/* <Link to="/album/bong-tai" style={{ textDecoration: "none" }} className="link-image">
                            <div>
                                Details
                            </div>
                        </Link> */}
                    </>
                </div>


                <div className="bodycate-container-image-3">
                    <Link to="/albumlogin/Earring" style={{ textDecoration: "none" }}>
                        <img src="../assets/Earring_Guest.jpg" alt="Bông tai" />
                    </Link>

                    {/* <Link to="/album/bong-tai" style={{ textDecoration: "none" }}>
                        <div className="link-image-2">
                            Details
                        </div>
                    </Link> */}
                </div>

            </div>
        </div>
    );
}
