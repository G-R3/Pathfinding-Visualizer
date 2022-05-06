import React from "react";
import ReactPlayer from "react-player";

function DFSPage() {
    return (
        <>
            <div className="video-container">
                <ReactPlayer
                    url="https://www.youtube.com/embed/7fujbpJ0LB4"
                    className="video"
                />
            </div>
            <div className="Grid-layout">
                <div className="item">
                    <h2>DFS Information</h2>
                    <section className="algo-section">
                        <div>
                            <p>
                                Used genereate mazes, traverse trees in specific
                                order, build decision trees, detect a cycle in a
                                graph.
                            </p>
                            <ul className="list-padded">
                                <li>DFS uses a Stack (Last In First Out)</li>
                                <li>
                                    Explores deep through each node before
                                    backtracking
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="algo-section">
                        <h2>Time and Space Complexity</h2>
                        <ul>
                            <li>
                                <b>Time</b>: O(|V| + |E|) (Worse Case
                                Performance)
                            </li>
                            <li>
                                <b>Space</b>: O(|V|)
                            </li>
                        </ul>
                    </section>
                </div>
                <div className="item">
                    <h2>DFS Pseudocode</h2>
                    <p>
                        Input: graph G, starting node root at g Output: shortest
                        path to end node
                    </p>
                    <ol>
                        <li> Initialize empty stack for all nodes, S</li>
                        <li> Push start node to S</li>
                        <li> While S is not empty</li>
                        <li> Pop node, U </li>
                        <li> check if node is visited</li>
                        <li> if no: mark node, U, as visited</li>
                        <li> visit neighboring node, W, of U </li>
                        <li> Push node W into S </li>
                        <li> End when all nodes are visited</li>
                    </ol>
                </div>
            </div>
        </>
    );
}
export default DFSPage;
