import React, { useEffect, useRef } from "react";
import "../styles/Home.css";
import Transition from "../components/Transition";
import { gsap } from "gsap";

export default function Main() {
    const main = gsap.timeline();
    const mainh1 = useRef(null);
    const mainimg = useRef(null);

    useEffect(() => {
        // main.from(mainh1.current, 1, {height: "0%"}, {height: '80%', ease: Power2.easeInOut})
        // main.from(mainimg.current, 1.2, {width:'100%'}, {width:'80%', ease: Power2.easeInOut})
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
    });

    return (
        <div>
            <Transition timeline={main} />
            <div className="main-image main-overlay" ref={mainimg}></div>
            <div className="container-main">
                <h1 ref={mainh1}>See the Path</h1>
            </div>
        </div>
    );
}
