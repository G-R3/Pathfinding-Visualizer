import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { astar, getNodesInShortestPathOrderAStar } from "../algorithms/astar";
import { bfs, getNodesInShortestPathOrderBFS } from "../algorithms/bfs";
import { dfs, getNodesInShortestPathOrderDFS } from "../algorithms/dfs";

const startNodeRows = 2;
const startNodeCols = 10;
const endNodeRows = 47;
const endNodeCols = 10;

let startTime = 0;
let endTime = 0;
let shortestPathLength = 0;
let totalVisitedNodes = 0;

export default function Grid({
    setIsReady,
    setVisualize,
    visualize,
    gridName,
    isAnimating,
    setIsAnimating,
    clearGrid,
    getInitialGrid,
    clearPath,
}) {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [algorithm, setAlgorithm] = useState("");
    const [grid, setGrid] = useState([]);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        // this is hardcoded based on the values of the CSS height & weight properties of the Grid class.
        // const initialGrid = getInitialGrid(720 / 20, 600 / 20);
        const initialGrid = getInitialGrid(50, 20);

        setGrid(initialGrid);
    }, []);

    useEffect(() => {
        if (!visualize) {
            return;
        }
        clearCurrentPath(grid, gridName);
        setIsFinished(false);
        visualizeAlgo(algorithm);
    }, [visualize]);

    const handleMouseDown = (node) => {
        if (visualize) return;
        setIsMouseDown(true);
    };
    const handleMouseEnter = (evt, node) => {
        if (visualize) return;
        if (isMouseDown && !node.startNode && !node.endNode) {
            evt.target.classList.toggle("wall");
            node.isWall = !node.isWall;
        }
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleClick = (e, node) => {
        if (!node.startNode && !node.endNode) {
            e.target.classList.toggle("wall");
            node.isWall = !node.isWall;
        }
    };

    const animateShortestPath = (nodesInShortestPathOrder) => {
        return new Promise((resolve, reject) => {
            let i = 0;
            let interval = setInterval(() => {
                if (i < nodesInShortestPathOrder.length) {
                    const node = nodesInShortestPathOrder[i];
                    document.getElementById(
                        `${gridName}-${node.row}-${node.col}`,
                    ).className = "node node-shortest-path";
                }
                i++;
                if (i >= nodesInShortestPathOrder.length) {
                    clearInterval(interval);
                    if (!algorithm) {
                        setIsReady(false);
                    }
                    setVisualize(false);
                    setIsAnimating(false);
                    setIsFinished(true);
                    resolve();
                }
            }, 20);
        });
    };

    const animate = (visitedNodesInOrder) => {
        return new Promise((resolve, reject) => {
            let i = 0;
            let interval = setInterval(() => {
                if (visitedNodesInOrder && i < visitedNodesInOrder.length) {
                    const node = visitedNodesInOrder[i];
                    document.getElementById(
                        `${gridName}-${node.row}-${node.col}`,
                    ).className = "node node-visited";
                }
                i++;
                if (visitedNodesInOrder && i >= visitedNodesInOrder.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, 20);
        });
    };

    const visualizeDijkstra = async () => {
        const startNode = grid[startNodeRows][startNodeCols];
        const endNode = grid[endNodeRows][endNodeCols];
        const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
        const nodesInShortestPath = getNodesInShortestPathOrder(endNode);

        shortestPathLength = nodesInShortestPath.length;
        totalVisitedNodes = visitedNodesInOrder.length;
        console.log(nodesInShortestPath);
        startTime = performance.now();
        await animate(visitedNodesInOrder);
        await animateShortestPath(nodesInShortestPath);
        endTime = performance.now();

        return;
    };

    const visualizeAStar = async () => {
        const startNode = grid[startNodeRows][startNodeCols];
        const endNode = grid[endNodeRows][endNodeCols];
        const visitedNodesInOrder = astar(grid, startNode, endNode);
        const nodesInShortestPath = getNodesInShortestPathOrderAStar(endNode);

        shortestPathLength = nodesInShortestPath.length;
        totalVisitedNodes = visitedNodesInOrder.length;

        startTime = performance.now();
        await animate(visitedNodesInOrder);
        await animateShortestPath(nodesInShortestPath);
        endTime = performance.now();

        return;
    };

    const visualizeBFS = async () => {
        const startNode = grid[startNodeRows][startNodeCols];
        const endNode = grid[endNodeRows][endNodeCols];
        const visitedNodesInOrder = bfs(grid, startNode, endNode);
        const nodesInShortestPath = getNodesInShortestPathOrderBFS(endNode);

        shortestPathLength = nodesInShortestPath.length;
        totalVisitedNodes = visitedNodesInOrder.length;

        startTime = performance.now();
        await animate(visitedNodesInOrder);
        await animateShortestPath(nodesInShortestPath);
        endTime = performance.now();

        return;
    };

    const visualizeDFS = async () => {
        const startNode = grid[startNodeRows][startNodeCols];
        const endNode = grid[endNodeRows][endNodeCols];
        const visitedNodesInOrder = dfs(grid, startNode, endNode);
        const nodesInShortestPath = getNodesInShortestPathOrderDFS(endNode);

        shortestPathLength = nodesInShortestPath.length;
        totalVisitedNodes = visitedNodesInOrder.length;

        startTime = performance.now();
        await animate(visitedNodesInOrder);
        await animateShortestPath(nodesInShortestPath);
        endTime = performance.now();

        return;
    };

    const visualizeAlgo = (algorithm) => {
        switch (algorithm) {
            case "Dijkstra":
                visualizeDijkstra();
                break;
            case "A* Pathfinding":
                visualizeAStar();
                break;
            case "Breath First Search":
                visualizeBFS();
                break;
            case "Depth First Search":
                visualizeDFS();
                break;
            default:
                break;
        }
    };

    const setNewGrid = (grid, gridName) => {
        const newGrid = clearGrid(grid, gridName);
        setGrid(newGrid);
    };

    const clearCurrentPath = (grid, gridName) => {
        const newGrid = clearPath(grid, gridName);
        setGrid(newGrid);
    };

    return (
        <>
            <div className="Grid-Controller">
                <Dropdown
                    setAlgorithm={setAlgorithm}
                    visualize={visualize}
                    setIsReady={setIsReady}
                    isAnimating={isAnimating}
                />
                <div className="Grid-Controller-buttons">
                    <button
                        className="btn"
                        onClick={() => setNewGrid(grid, gridName)}
                        disabled={isAnimating}
                    >
                        Clear Grid
                    </button>
                    <button
                        className="btn"
                        onClick={() => clearCurrentPath(grid, gridName)}
                        disabled={isAnimating}
                    >
                        Clear Path
                    </button>
                </div>
            </div>
            <div className="Grid">
                {isFinished ? (
                    <Modal
                        time={(endTime - startTime).toFixed(4)}
                        shortestPathLength={shortestPathLength}
                        totalVisitedNodes={totalVisitedNodes}
                        setIsFinished={setIsFinished}
                    />
                ) : (
                    ""
                )}
                {grid.map((row, i) => {
                    return (
                        <div key={i}>
                            {row.map((node, i) => {
                                const classes = node.startNode
                                    ? "start-node"
                                    : node.endNode
                                    ? "end-node"
                                    : node.isWall
                                    ? "wall"
                                    : "";

                                return (
                                    <div
                                        key={i}
                                        className={`node ${classes}`}
                                        id={`${gridName}-${node.row}-${node.col}`}
                                        onMouseDown={() =>
                                            handleMouseDown(node)
                                        }
                                        onMouseEnter={(e) =>
                                            handleMouseEnter(e, node)
                                        }
                                        onMouseUp={handleMouseUp}
                                        onClick={(e) => handleClick(e, node)}
                                    ></div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
