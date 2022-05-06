import React from "react";
import ReactPlayer from "react-player";

function DijkstraPage() {
    return (
        <>
            <div className="video-container">
                <ReactPlayer
                    url="https://www.youtube.com/embed/GazC3A4OQTE"
                    className="video"
                />
            </div>
            <div className="Grid-layout">
                <div className="item">
                    <h2>Dijkstra's Algorithm Information</h2>
                    <section className="algo-section">
                        <div>
                            <p>
                                Finds the fastest path between nodes with
                                weighted edges. Used in navigational maps
                            </p>
                            <ul className="list-padded">
                                <li>
                                    Uses Priority Queue or Heap and orders based
                                    on the weight each element has
                                </li>
                                <li>
                                    Weighted Graph represented by an adjacency
                                    list
                                </li>
                                <li>
                                    each node in the list points to an array of
                                    neighboring nodes
                                </li>
                                <li>
                                    each node in the list points to an array of
                                    neighboring nodes
                                </li>
                                <li>the weight of each edge</li>
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
                                <b>Time</b>: O(E + V log V) (Worse Case
                                Performance)
                            </li>
                            <li>
                                <b>Space</b>: O(|V|)
                            </li>
                        </ul>
                    </section>
                </div>
                <div className="item">
                    <h2>Dijkstra's Pseudocode</h2>

                    <ol>
                        <li>Create a priority queue to store nodes</li>
                        <li>put the starting node in the queue</li>
                        <li>while the queue is not empty</li>
                        <li>get the node with the smallest weight</li>
                        <li>check if node has been visited</li>
                        <li>if not visited: add node to visited nodes</li>
                        <li>
                            check all the nodes connected to the current node
                        </li>
                        <li>check the weight of the edge</li>
                        <li>if the weight is less than the current distance</li>
                        <li>update the distance</li>
                        <li>add the node tot he queue</li>
                        <li>return the distance</li>
                    </ol>
                </div>
            </div>
        </>
    );
}
export default DijkstraPage;
