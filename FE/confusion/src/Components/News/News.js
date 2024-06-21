import React from "react";
import "../News/News.css";
import news from "../../data/news.json";

export default function News() {
    return (
        <div className="News">
            <h1>News</h1>
            <h3>WHAT DO YOU GET BY CHOOSING THE DIAMOND SHOP?</h3>
            <div className="news-container">
                {news.map((newsItem, index) => (
                    <div className="news-item" key={index}>
                        <img src={newsItem.image} alt="News" />
                        <h4>{newsItem.name}</h4>
                        <p>{newsItem.title}</p>
                    </div>
                ))}
            </div>

            <p>FOLLOW US @diamondshop</p>
        </div>
    );
}
