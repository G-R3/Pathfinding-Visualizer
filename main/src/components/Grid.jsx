import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { astar, getNodesInShortestPathOrderAStar } from "../algorithms/astar";
import { bfs, getNodesInShortestPathOrderBFS } from "../algorithms/bfs";
import { dfs, getNodesInShortestPathOrderDFS } from "../algorithms/dfs";

let startTime = 0;
let endTime = 0;
let shortestPathLength = 0;
let totalVisitedNodes = 0;

export default function Grid({
    startNodeRows,
    startNodeCols,
    endNodeRows,
    endNodeCols,
    setIsReady,
    setVisualize,
    visualize,
    gridName,
    isAnimating,
    setIsAnimating,
    clearGrid,
    clearPath,
    handleNodeClick = null,
    handleMouseUp = null,
    handleMouseEnter = null,
    handleMouseDown = null,
    parentGrid,
    setParentGrid,
}) {
    // const [isMouseDown, setIsMouseDown] = useState(false);
    const [algorithm, setAlgorithm] = useState("");
    const [grid, setGrid] = useState([]);
    const [isFinished, setIsFinished] = useState(false);

    const getInitialGrid = (numRows = 50, numCols = 20) => {
        let initialGrid = [];

        for (let row = 0; row < numRows; row++) {
            let gridRow = [];
            for (let col = 0; col < numCols; col++) {
                gridRow.push({
                    row,
                    col,
                    startNode: row === startNodeRows && col === startNodeCols,
                    endNode: row === endNodeRows && col === endNodeCols,
                    previousNode: null,
                    distance: Infinity,
                    isWall: false,
                    isVisited: false,
                });
            }
            initialGrid.push(gridRow);
        }

        return initialGrid;
    };

    useEffect(() => {
        if (parentGrid) {
            console.log("replicating grids");
            setGrid(parentGrid);
            console.log("new Grid");
            console.log(grid);
            return;
        }
        // this is hardcoded based on the values of the CSS height & weight properties of the Grid class.
        // const initialGrid = getInitialGrid(720 / 20, 600 / 20);
        const initialGrid = getInitialGrid(50, 20);
        setGrid(initialGrid);
    }, [parentGrid]);

    useEffect(() => {
        if (!visualize) {
            return;
        }
        clearCurrentPath(grid, gridName);
        setIsFinished(false);
        visualizeAlgo(algorithm);
    }, [visualize]);

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

    // clear walls
    const setNewGrid = (grid, gridName) => {
        const newGrid = clearGrid(grid, gridName);
        if (parentGrid) {
            setParentGrid(newGrid);
            return;
        }
        setGrid(newGrid);
    };

    // clear path
    const clearCurrentPath = (grid, gridName) => {
        const newGrid = clearPath(grid, gridName);
        if (parentGrid) {
            setParentGrid(newGrid);
            return;
        }
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
                                        onClick={(e) =>
                                            handleNodeClick(e, node)
                                        }
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
