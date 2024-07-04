import React, { useState } from "react";
import AboutUs from "../../data/AboutUs.json";
import "./Aboutuslogin.css"; 

export default function Aboutuslogin() {
    const [about, setAbout] = useState(AboutUs);

    return (
        <div className="about-us-container">
            <h1>About</h1>
            {about.map((item, index) => (
                <div className={index % 2 === 0 ? "about-item even" : "about-item odd"} key={index}>
                    {index % 2 === 0 ? (
                        <>
                            <div className="about-image">
                                <img src={item.AboutUsImageURL} alt={item.AboutUsTitle} />
                            </div>
                            <div className="about-text">
                                <h2>{item.AboutUsTitle}</h2>
                                <p>{item.AboutUsDescription}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="about-text">
                                <h2>{item.AboutUsTitle}</h2>
                                <p>{item.AboutUsDescription}</p>
                            </div>
                            <div className="about-image">
                                <img src={item.AboutUsImageURL} alt={item.AboutUsTitle} />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
