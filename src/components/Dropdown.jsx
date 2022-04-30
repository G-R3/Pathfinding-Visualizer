import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Dropdown({ setAlgorithm, setIsReady, isAnimating }) {
    const [isOpen, setIsOpen] = useState(false);
    const [val, setVal] = useState("");
    const ref = useRef(null);

    const dropdownValues = [
        {
            title: "Dijkstra",
        },
        {
            title: "A* Pathfinding",
        },
        {
            title: "Breath First Search",
        },
        {
            title: "Depth First Search",
        },
    ];

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (evt) => {
        if (ref.current && !ref.current.contains(evt.target)) {
            setIsOpen(false);
        }
    };

    const handleSetValue = (val) => {
        setVal(val.title);
        setAlgorithm(val.title);
        setIsReady(true);
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    return (
        <div ref={ref} className="dropdown">
            <button
                className="btn dropdown-toggle"
                onClick={handleClick}
                disabled={isAnimating}
            >
                {val ? val : "Choose Algorithm"}
                <Chevron isOpen={isOpen} />
            </button>

            {isOpen && (
                <ul className="dropdown-options">
                    {dropdownValues.map((item, i) => {
                        return (
                            <li
                                key={i}
                                onClick={() => handleSetValue(item)}
                                style={{
                                    backgroundColor:
                                        item.title === val
                                            ? "rgba(32, 32, 32, 0.8)"
                                            : "",
                                }}
                            >
                                {item.title}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

const Chevron = ({ isOpen }) => {
    return isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />;
};
