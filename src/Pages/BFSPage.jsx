import React from "react";
import ReactPlayer from "react-player";

function BFSPage() {
    return (
        <>
            <div className="video-container">
                <ReactPlayer
                    url="https://www.youtube.com/embed/oDqjPvD54Ss"
                    className="video"
                />
            </div>
            <div className="Grid-layout">
                <div className="item">
                    <h2>BFS Information</h2>
                    <section className="algo-section">
                        <div>
                            <p>
                                Used in network analysis, GPS, Search Engines,
                                Scheduling and other types of graph analysis.
                            </p>
                            <ul className="list-padded">
                                <li>BFS uses a Queue (First In First Out)</li>
                                <li>
                                    Explores equally in all directions until the
                                    end node is found
                                </li>
                                <li> Guarantees the shortest path</li>
                            </ul>
                        </div>
                    </section>

                    <section className="algo-section">
                        <h2>Time and Space Complexity</h2>
                        <ul>
                            <li>
                                <b>|V|</b>: the number of nodes (vertices)
                            </li>
                            <li>
                                <b>|E|</b>: the number of edges
                            </li>
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
                    <h2>BFS Pseudocode</h2>
                    <p>
                        Input: graph G, starting node root at g Output: shortest
                        path to end node
                    </p>
                    <ol>
                        <li> Create a queue</li>
                        <li>
                            Create an array for nodes that have been visited
                        </li>
                        <li> add graph to the queue</li>
                        <li> while the queue is not empty</li>
                        <li> check if node has been visited </li>
                        <li> if no: visit neighboring nodes</li>
                        <li> check if node is the end node </li>
                        <li> if no: add node to array and mark as visited</li>
                        <li> search next node in the queue</li>
                        <li> else:</li>
                        <li> return True, end node is found</li>
                    </ol>
                </div>
            </div>
        </>
    );
}
export default BFSPage;
