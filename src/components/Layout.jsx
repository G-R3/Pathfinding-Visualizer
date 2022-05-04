import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/Layout.css";

export default function Layout() {
    return (
        <>
            <div className="header">
                <div className="logo">Path Visualizer</div>
                <ul className="header-nav">
                    <li className="link">
                        <Link to="/">Main</Link>
                    </li>
                    <li className="link">
                        <Link to="/visualizer">Visualizer</Link>
                    </li>
                    <li className="link">
                        <Link to="/algo">Algorithm Info</Link>
                    </li>
                </ul>
            </div>
            <Outlet />
        </>
    );
}
