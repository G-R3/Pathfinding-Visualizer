import React from "react";
import { FaPlay } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";

export default function Navbar({ handleClick, visualize, error }) {
    return (
        <nav className="navbar">
            <p className="nav-title">Visualizer</p>
            <div className="navbar-container">
                {error && (
                    <div className="error-msg">
                        <FiAlertTriangle size={25} />
                        <p> Choose Algorithms</p>
                    </div>
                )}
                <button
                    className="btn nav-button"
                    onClick={handleClick}
                    disabled={visualize}
                >
                    Visualize
                    <FaPlay size={14} className="nav-button-icon" />
                </button>
            </div>
        </nav>
    );
}
