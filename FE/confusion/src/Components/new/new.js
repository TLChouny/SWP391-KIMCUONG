import React, { useState } from "react";
import NewsTotal from "../../data/NewsTotal.json"
import "../new/new.css"
import Footer from "../Footer/Footer";
export default function New() {
    return (
        <div className="new">
            <h1>News</h1>
            <div className="new-container">
                {NewsTotal.map((newstotal, index) => (
                    <div className="new-container-body">
                        <img src={newstotal.NewsImageURL} />
                        <div className="new-container-body-content">
                            <p className="new-container-body-content-phara">{newstotal.NewsTilte}</p>
                            <p className="new-container-body-content-phara-2">{newstotal.NewsDescription}</p>
                            <div />
                        </div>
                    </div>
                    ))}
            </div>
            <Footer/>
        </div>
    )
}