import React from "react";

export default function Modal({
    time,
    shortestPathLength,
    totalVisitedNodes,
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
                            <p>Time: {time}</p>
                            <p>Total Nodes Visited: {totalVisitedNodes}</p>
                            <p>Shortest Path Length: {shortestPathLength}</p>
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
