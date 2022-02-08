import React from 'react';
import './header.css';


function Header() {
    return (
            
        <div className="header">
            <h1 className="logo"><a href="/">Joe Artist</a></h1>

            <div className="navbar">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/music">Music</a></li>
                    <li><a href="/merce">Merce</a></li>
                    <li><a href="/video">Video</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;