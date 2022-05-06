import React, { useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import gsap from "gsap";
import Transition from "../components/Transition";
import "../styles/Algo.css";

function Algo() {
    const algo = gsap.timeline();
    const algoh1 = useRef(null);
    const algoimg = useRef(null);

    useEffect(() => {
        algo.from(
            algoh1.current,
            { duration: 0.6, skewX: 10, x: -100, opacity: 0 },
            "-=3.5",
        );
        algo.from(
            algoimg.current,
            { duration: 0.5, y: -200, opacity: 0 },
            "-=3",
        );
    }, [algo]);

    return (
        <div>
            <Transition timeline={algo} />
            <div className="container">
                {/* <div className="algo-image algo-overlay" ref={algoimg}></div>
                <h1 ref={algoh1}>Algorithm Page</h1> */}
                <div className="links">
                    <Link to="/algo/BFSPage" className="page-link">
                        {" "}
                        Breadth First Search Algorithm{" "}
                    </Link>
                    <span> / </span>
                    <Link to="/algo/DFSPage" className="page-link">
                        Depth First Search Algorithm
                    </Link>
                    <span> / </span>
                    <Link to="/algo/" className="page-link">
                        {" "}
                        Dijkstra's Algorithm{" "}
                    </Link>
                    <span> / </span>
                    <Link to="/algo/AstarPage" className="page-link">
                        {" "}
                        A* Algorithm{" "}
                    </Link>
                </div>
                <Outlet />
            </div>
        </div>
    );
}
export default Algo;
