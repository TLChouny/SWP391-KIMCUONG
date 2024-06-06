import React from "react";
import { Link } from "react-router-dom";
import "../Home/Home.css";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

const Home = () => {
    
    return (
        <div className="body" id="scrollContainer" >
            <Header />
            <div className="content">
                <div className="welcome">
                    <div className="image-container">
                        <img src="../assets/bracelets.png" alt="Logo" className="logo1" />
                    </div>
                    <div className="image-container">
                        <img src="../assets/necklaces.png" alt="Logo" className="logo2" />
                    </div>
                    <div className="image-container">
                        <img src="../assets/hand.png" alt="Logo" className="logo3" />
                    </div>
                </div>
                <p className="image-text">Welcome to Klare Jewelers</p>
            </div>

            <div className="sale">
                {/* <Link to="/sale">Click here for our latest sale!</Link> */}
            </div>

            <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>
            <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>     <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>     <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>     <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>     <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>     <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>    <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>
            <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>
            <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>
            <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>
            <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>
            <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>
            <div className="news-info">
                <Link to="/news">Check out our latest news and information.</Link>
            </div>
            {/* <Footer />     */}
        </div>
        
    );
};

export default Home;
