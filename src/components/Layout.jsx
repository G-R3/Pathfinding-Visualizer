import React from "react";
import { Link, Outlet } from "react-router-dom";
import { GiPathDistance } from "react-icons/gi";
import "../styles/Layout.css";

export default function Layout() {
    return (
        <>
            <div className="header">
                <h1 className="header-title">
                    <GiPathDistance size={40} className="header-logo" />
                    Pathfinding Visualizer
                </h1>
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
