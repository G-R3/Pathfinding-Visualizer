import React from "react";
import ReactPlayer from "react-player";

function AStarPage() {
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
                    <h2>A* Algorithm Information</h2>
                    <section className="algo-section">
                        <p>
                            Used in map vased applications, games for its
                            positioning system, string search applications, such
                            as NLP (Natural Language Processing).
                        </p>
                    </section>
                    <section className="algo-section">
                        <h2>Uses 3 parameters</h2>

                        <ol>
                            <li>
                                g(n): The actual cost of traversal from initial
                                state to the current state.
                            </li>
                            <li>
                                uses heuristic function: euclidian distance or
                                manhattan distance
                            </li>
                            <li>
                                f(n): The actual cost of traversal from the
                                initial state to the goal state.
                                <p>
                                    <b>f(n) = g(n) + h(n)</b>
                                </p>
                            </li>
                        </ol>
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
                                <b>Time</b>: O(|E|) = O(b^d) (Worse Case
                                Performance)
                            </li>
                            <li>
                                <b>Space</b>: O(|V|) = O(b^d)
                            </li>
                        </ul>
                    </section>
                </div>
                <div className="item">
                    <h2>A* Pseudocode</h2>
                    <ol>
                        <li>
                            Create Open List to store visited nodes, but
                            neighbor nodes are not visited.{" "}
                        </li>
                        <li>
                            Create Closed list to store visited nodes and
                            neighboring nodes are visited.
                        </li>
                        <li> put start node in Open List</li>
                        <li> while the Open List is not empty</li>
                        <li>
                            let current node equal to the node with least F
                            value
                        </li>
                        <li> remove the current Node from the Open List</li>
                        <li> add the current Node to the Closed List</li>
                        <li> check if the current node is the goal</li>
                        <li> if yes: backtrack to get the path</li>
                        <li>
                            let children nodes of current node equal the
                            adjacent nodes
                        </li>
                        <li> for each children node</li>
                        <li> if child node is in Closed List</li>
                        <li> create the f, g, h values</li>
                        <li> if child node is already in Open List</li>
                        <li>
                            if gscore of child node is higher than the Open List
                            gscore
                        </li>
                        <li> continue to beginning of for loop</li>
                        <li> add the child to the Open List</li>
                    </ol>
                </div>
            </div>
        </>
    );
}
export default AStarPage;
