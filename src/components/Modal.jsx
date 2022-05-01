import React from "react";

export default function Modal({
    shortestPathLength,
    visitedNodesLength,
    setIsFinished,
}) {
    return (
        <>
            <div className="Modal">
                <div className="Modal-Container">
                    {/*content*/}
                    <div className="Modal-Content">
                        {/*header*/}
                        <div className="Modal-Header">
                            <h3>Stats</h3>
                        </div>
                        {/*body*/}

                        <div className="Modal-Body">
                            <div className="Modal-stat">
                                <span className="label">Nodes Visited</span>
                                <span className="stat">
                                    {visitedNodesLength}
                                </span>
                            </div>
                            <div className="Modal-stat">
                                <span className="label">
                                    Shortest Path Length
                                </span>
                                <span className="stat">
                                    {shortestPathLength !== 0
                                        ? shortestPathLength
                                        : "No path found"}
                                </span>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="Modal-Footer">
                            <button
                                className="Modal-Footer-Button Button-Exit"
                                type="button"
                                onClick={() => setIsFinished(false)}
                            >
                                EXIT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
