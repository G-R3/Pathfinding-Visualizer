import React, { useState, useEffect, useContext } from "react";
import Node from "./Node";
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
    getGrid,
    setIsReady,
    gridName,
    clearGrid,
    clearPath,
    parentGrid,
    setParentGrid,
    startNodeParent,
    endNodeParent,
    setStartNodeParent,
    setEndNodeParent,
}) {
    // const [isMouseDown, setIsMouseDown] = useState(false);
    const [algorithm, setAlgorithm] = useState("");
    const [grid, setGrid] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [moveStartNode, setMoveStartNode] = useState(false);
    const [moveEndNode, setMoveEndNode] = useState(false);

    const [startNodePos, setStartNodePos] = useState(
        parentGrid ? startNodeParent : { row: 2, col: 10 },
    );
    const [endNodePos, setEndNodePos] = useState(
        parentGrid ? endNodeParent : { row: 47, col: 10 },
    );

    const { visualize, setGridOneAnimating, setGridTwoAnimating } =
        useContext(GridContext);

    useEffect(() => {
        if (parentGrid) {
            setStartNodePos(startNodeParent);
            setEndNodePos(endNodeParent);
            setGrid(parentGrid);
            return;
        }
        // this is hardcoded based on the values of the CSS height & weight properties of the Grid class.
        // const initialGrid = getInitialGrid(720 / 20, 600 / 20);
        const initialGrid = getGrid(
            50,
            20,
            startNodePos.row,
            startNodePos.col,
            endNodePos.row,
            endNodePos.col,
        );
        setGrid(initialGrid);
    }, [parentGrid]);

    useEffect(() => {
        if (!visualize) {
            return;
        }
        clearCurrentPath(
            grid,
            gridName,
            startNodePos.row,
            startNodePos.col,
            endNodePos.row,
            endNodePos.col,
        );
        setIsFinished(false);
        visualizeAlgo(algorithm);
    }, [visualize]);

    const animateShortestPath = (nodesInShortestPathOrder) => {
        return new Promise((resolve, reject) => {
            let i = 0;
            let interval = setInterval(() => {
                if (i < nodesInShortestPathOrder.length) {
                    const node = nodesInShortestPathOrder[i];
                    if (!node.startNode && !node.endNode) {
                        document.getElementById(
                            `${gridName}-${node.row}-${node.col}`,
                        ).className = "node node-shortest-path";
                    }
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
                    if (!node.startNode && !node.endNode) {
                        document.getElementById(
                            `${gridName}-${node.row}-${node.col}`,
                        ).className = "node node-visited";
                    }
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
        const startNode = grid[startNodePos.row][startNodePos.col];
        const endNode = grid[endNodePos.row][endNodePos.col];
        const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
        const nodesInShortestPath = getNodesInShortestPathOrder(endNode);

        shortestPathLength = nodesInShortestPath.length;
        totalVisitedNodes = visitedNodesInOrder.length;
        startTime = performance.now();
        await animate(visitedNodesInOrder);
        await animateShortestPath(nodesInShortestPath);
        endTime = performance.now();

        return;
    };

    const visualizeAStar = async () => {
        const startNode = grid[startNodePos.row][startNodePos.col];
        const endNode = grid[endNodePos.row][endNodePos.col];
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
        const startNode = grid[startNodePos.row][startNodePos.col];
        const endNode = grid[endNodePos.row][endNodePos.col];
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
        const startNode = grid[startNodePos.row][startNodePos.col];
        const endNode = grid[endNodePos.row][endNodePos.col];
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
    const setNewGrid = (
        grid,
        gridName,
        startNodeRow,
        startNodeCol,
        endNodeRow,
        endNodeCol,
    ) => {
        const newGrid = clearGrid(
            grid,
            gridName,
            startNodeRow,
            startNodeCol,
            endNodeRow,
            endNodeCol,
        );
        if (parentGrid) {
            setParentGrid(newGrid);
            return;
        }
        setGrid(newGrid);
    };

    // clear path
    const clearCurrentPath = (
        grid,
        gridName,
        startNodeRow,
        startNodeCol,
        endNodeRow,
        endNodeCol,
    ) => {
        const newGrid = clearPath(
            grid,
            gridName,
            startNodeRow,
            startNodeCol,
            endNodeRow,
            endNodeCol,
        );
        if (parentGrid) {
            setParentGrid(newGrid);
            return;
        }
        setGrid(newGrid);
    };

    const createWall = (grid, node) => {
        if (
            grid[node.row][node.col].startNode ||
            grid[node.row][node.col].endNode
        )
            return grid;
        const newGrid = grid.slice();
        newGrid[node.row][node.col].isWall =
            !newGrid[node.row][node.col].isWall;
        return newGrid;
    };

    const moveStart = (grid, node) => {
        if (grid[node.row][node.col].endNode || grid[node.row][node.col].isWall)
            return grid;
        const newGrid = grid.slice();
        if (parentGrid) {
            newGrid[startNodeParent.row][startNodeParent.col].startNode = false;
        } else {
            newGrid[startNodePos.row][startNodePos.col].startNode = false;
        }
        newGrid[node.row][node.col].startNode =
            !newGrid[node.row][node.col].startNode;

        if (parentGrid) {
            setStartNodeParent({ row: node.row, col: node.col });
            return newGrid;
        }
        setStartNodePos({ row: node.row, col: node.col });
        return newGrid;
    };

    const moveEnd = (grid, node) => {
        if (
            grid[node.row][node.col].startNode ||
            grid[node.row][node.col].isWall
        )
            return grid;
        const newGrid = grid.slice();
        newGrid[endNodePos.row][endNodePos.col].endNode = false;
        newGrid[node.row][node.col].endNode =
            !newGrid[node.row][node.col].endNode;

        if (parentGrid) {
            setEndNodeParent({ row: node.row, col: node.col });
            return newGrid;
        }
        setEndNodePos({ row: node.row, col: node.col });
        return newGrid;
    };

    const handleMouseDown = (evt, node) => {
        if (visualize) return;
        evt.preventDefault();
        if (node.startNode) {
            setMoveStartNode(true);
        } else if (node.endNode) {
            setMoveEndNode(true);
        } else {
            let newGrid = createWall(grid, node);
            setIsMouseDown(true);
            if (parentGrid) {
                setParentGrid(newGrid);
                return;
            }
            setGrid(newGrid);
        }
        setIsMouseDown(true);
        return null;
    };
    const handleMouseEnter = (evt, node) => {
        if (visualize || !isMouseDown) return;
        let newGrid = null;
        if (moveStartNode) {
            newGrid = moveStart(grid, node);
        } else if (moveEndNode) {
            newGrid = moveEnd(grid, node);
        } else {
            newGrid = createWall(grid, node);
        }

        if (!newGrid) return;
        if (parentGrid) {
            setParentGrid(newGrid);
            return;
        }
        setGrid(newGrid);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
        setMoveStartNode(false);
        setMoveEndNode(false);
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
                        onClick={() =>
                            setNewGrid(
                                grid,
                                gridName,
                                startNodePos.row,
                                startNodePos.col,
                                endNodePos.row,
                                endNodePos.col,
                            )
                        }
                        disabled={visualize}
                    >
                        Clear Grid
                        <AiOutlineClear size={25} />
                    </button>
                    <button
                        className="btn cleargrid-button"
                        onClick={() =>
                            clearCurrentPath(
                                grid,
                                gridName,
                                startNodePos.row,
                                startNodePos.col,
                                endNodePos.row,
                                endNodePos.col,
                            )
                        }
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
                                return (
                                    <Node
                                        key={i}
                                        mouseDown={handleMouseDown}
                                        mouseEnter={handleMouseEnter}
                                        mouseUp={handleMouseUp}
                                        node={node}
                                        gridName={gridName}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
