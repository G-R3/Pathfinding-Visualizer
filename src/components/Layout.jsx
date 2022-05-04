import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="App">
            <div className="header">
                <div className="logo">
                    Path <br /> Visualizer
                </div>
                <ul>
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
        </div>
    );
}
