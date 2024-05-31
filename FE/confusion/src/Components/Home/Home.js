import React from "react";
import "./Home.css";
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';

function Header() {
    return (
        <div className="Header">
            <div class="header_top">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="header_top_left">
                            <SearchOutlined alt="Header Search Icon"/>
                            <p>Search...</p>
                            </div>
                        </div>
                        <div class ="col-md-6 col-sm-6 col-xs-12">
                            <div class="header_top_right">
                                <p><a href ="#login">Login</a> / <a href ="#register">Register</a></p>
                                <nav class ="Cart">
                                    <ul>
                                        <li><a href ="#Cart">Cart</a>
                                            <ul class ="Cart-dropdown">
                                                <li><a href ="#product">Ring</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header">
		<div class="container">
			<div class="row">
				<div class="col-md-3 col-sm-3 col-xs-12">
					<div class="header_left floatleft">
						<a class="fa fa-search" href="#"></a>
						<input type="text" placeholder="search"/>
					</div>
				</div>
				<div class="col-md-6 col-sm-5 col-xs-12">
					<div class="header_center">
						<a href="Home.js"><img src="../assets/logo.jpg" alt="Site Logo" /></a>
					</div>
				</div>
				<div class="col-md-3 col-sm-4 col-xs-12">
					<div class="header_right floatright">
						<ul class="checkout">
							<li><a href="checkout.html"><i class="fa fa-heart-o"></i>wishlist</a></li>
							<li class="mobi_right_li"><a href="checkout.html"><i class="fa fa-shopping-cart"></i>checklist</a></li>
						</ul>
						<div class="w_likes">
							<span>3</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

            {/* <div className="Header_Search">
                <Input placeholder="Search..." />
            </div>
            <div>
                <SearchOutlined className="Searchicon" />
            </div>
            <div className="Header_Logo">
                <img src="../assets/logo.jpg" alt="Logo" className="logo1" />
            </div>
            <div className="Header_Name">Klare</div>
            <div className="Header_Account_Cart">
                <UserOutlined className="Usericon" />
                <ShoppingCartOutlined className="Carticon" />
            </div>
            <div className="Header_Ads">
                <img src="../assets/logo.jpg" alt="Logo" className="logo1" />
                <img src="../assets/logo.jpg" alt="Logo" className="logo1" />
                <img src="../assets/logo.jpg" alt="Logo" className="logo1" />
            </div> */}
        </div>
    );
}

function Body() {
    return (
        <div className="Body">
            {/* Thêm nội dung cho phần Body tại đây */}

        </div>
    );
}

function Footer() {
    return (
        <div className="Footer">
            {/* Thêm nội dung cho phần Footer tại đây */}
        </div>
    );
}

export default function Home() {
    return (
        <>
            <Header />
            <Body />
            <Footer />
        </>
    );
}
