import React, { useEffect, useRef } from "react";
import "../styles/Home.css";
import Transition from "../components/Transition";
import { gsap } from "gsap";

export default function Main() {
    const main = gsap.timeline();
    const mainh1 = useRef(null);
    const mainimg = useRef(null);

    useEffect(() => {
        main.from(
            mainh1.current,
            {
                duration: 0.6,
                skewX: 10,
                x: -100,
                opacity: 0,
            },
            "-=3.5",
        );
        main.from(
            mainimg.current,
            {
                duration: 0.5,
                y: -200,
                opacity: 0,
            },
            "-=3",
        );
    }, [main]);

    return (
        <>
            <Transition timeline={main} />
            <div className="container-main">
                <div className="main-image main-overlay" ref={mainimg} />
                <h1 ref={mainh1}>See the Path</h1>
            </div>
        </>
    );
}
