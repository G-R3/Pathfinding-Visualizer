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
                            <p>Total Nodes Visited: {visitedNodesLength}</p>
                            <p>
                                Shortest Path Length:{" "}
                                {shortestPathLength !== 0
                                    ? shortestPathLength
                                    : "No path found"}
                            </p>
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
