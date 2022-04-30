import React, { useState, useEffect, useContext } from "react";
import { GridContext } from "../context/gridContext";
import { AiOutlineClear } from "react-icons/ai";
import { GiPathDistance } from "react-icons/gi";
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
    gridName,
    clearGrid,
    clearPath,
    handleNodeClick = null,
    handleMouseUp = null,
    handleMouseEnter = null,
    handleMouseDown = null,
    parentGrid,
    setParentGrid,
    isMouseDown,
}) {
    // const [isMouseDown, setIsMouseDown] = useState(false);
    const [algorithm, setAlgorithm] = useState("");
    const [grid, setGrid] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const { visualize, setGridOneAnimating, setGridTwoAnimating } =
        useContext(GridContext);

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
            setGrid(parentGrid);
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
                    setIsFinished(true);
                    if (gridName === "first") {
                        setGridOneAnimating(false);
                    } else {
                        setGridTwoAnimating(false);
                    }
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

    const mouseDown = (evt, grid, node) => {
        if (visualize) return;
        const newGrid = handleMouseDown(evt, grid, node);
        if (!newGrid) return;
        if (parentGrid) {
            setParentGrid(newGrid);
            return;
        }
        setGrid(newGrid);
    };

    const mouseEnter = (evt, grid, node) => {
        if (!isMouseDown || visualize) return;
        const newGrid = handleMouseEnter(evt, grid, node);
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
                    isAnimating={visualize}
                />
                <div className="Grid-Controller-buttons">
                    <button
                        className="btn clearpath-button"
                        onClick={() => setNewGrid(grid, gridName)}
                        disabled={visualize}
                    >
                        Clear Grid
                        <AiOutlineClear size={25} />
                    </button>
                    <button
                        className="btn cleargrid-button"
                        onClick={() => clearCurrentPath(grid, gridName)}
                        disabled={visualize}
                    >
                        Clear Path
                        <GiPathDistance size={25} />
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
                                        onMouseDown={(evt) =>
                                            mouseDown(evt, grid, node)
                                        }
                                        onMouseEnter={(evt) =>
                                            mouseEnter(evt, grid, node)
                                        }
                                        onMouseUp={handleMouseUp}
                                        // onClick={(e) =>
                                        //     handleNodeClick(e, node)
                                        // }
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
