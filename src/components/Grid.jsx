/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from "react";
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
    const timers = useRef(new Map());
    const [algorithm, setAlgorithm] = useState("");
    const [grid, setGrid] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isMovingStartNode, setIsMovingStartNode] = useState(false);
    const [isMovingEndNode, setIsMovingEndNode] = useState(false);
    const [stats, setStats] = useState({
        visitedNodesLength: 0,
        shortestPathLength: 0,
    });

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
        const initialGrid = getGrid(
            50,
            20,
            startNodePos.row,
            startNodePos.col,
            endNodePos.row,
            endNodePos.col,
        );
        clearCurrentPath(
            grid,
            gridName,
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

    useEffect(() => {
        const initialGrid = getGrid(
            50,
            20,
            startNodePos.row,
            startNodePos.col,
            endNodePos.row,
            endNodePos.col,
        );
        setGrid(initialGrid);
        setGridOneAnimating(false);
        setGridTwoAnimating(false);
        return () => {
            [...timers.current.values()].forEach((timer) => {
                clearTimeout(timer);
            });
        };
    }, []);

    const animateShortestPath = (nodesInShortestPathOrder, delay) => {
        return new Promise((resolve, reject) => {
            for (let j = 0; j <= nodesInShortestPathOrder.length; j++) {
                const node = nodesInShortestPathOrder[j];
                const timeout2 = setTimeout(() => {
                    const nodeElem = document.getElementById(
                        `${gridName}-${node.row}-${node.col}`,
                    );

                    // ????
                    if (!nodeElem) {
                        return;
                    }

                    nodeElem.className = "node node-shortest-path";
                }, (delay + j) * 10);

                timers.current.set(timeout2, timeout2);

                if (j >= nodesInShortestPathOrder.length) {
                    clearTimeout(timeout2);
                    setTimeout(() => {
                        if (!algorithm) {
                            setIsReady(false);
                        }
                        if (gridName === "first") {
                            setGridOneAnimating(false);
                        } else {
                            setGridTwoAnimating(false);
                        }
                        setIsFinished(true);
                    }, (delay + nodesInShortestPathOrder.length + 1) * 10);

                    resolve();
                    return;
                }
            }
        });
    };

    const animate = (visitedNodesInOrder) => {
        return new Promise((resolve, reject) => {
            for (let i = 0; i <= visitedNodesInOrder.length; i++) {
                const node = visitedNodesInOrder[i];

                const timeout1 = setTimeout(() => {
                    const nodeElem = document.getElementById(
                        `${gridName}-${node.row}-${node.col}`,
                    );

                    // ????
                    if (!nodeElem) {
                        return;
                    }

                    nodeElem.className = "node node-visited";
                }, i * 10);

                timers.current.set(timeout1, timeout1);

                if (i >= visitedNodesInOrder.length) {
                    clearTimeout(timeout1);
                    resolve();
                    return;
                }
            }
        });
    };

    const visualizeDijkstra = async () => {
        const startNode = grid[startNodePos.row][startNodePos.col];
        const endNode = grid[endNodePos.row][endNodePos.col];

        const visitedNodes = dijkstra(grid, startNode, endNode);
        const shortestPath = getNodesInShortestPathOrder(endNode);

        await animate(visitedNodes);
        await animateShortestPath(shortestPath, visitedNodes.length);

        setStats({
            visitedNodesLength: visitedNodes.length,
            shortestPathLength: shortestPath.length,
        });
    };

    const visualizeAStar = async () => {
        const startNode = grid[startNodePos.row][startNodePos.col];
        const endNode = grid[endNodePos.row][endNodePos.col];
        const visitedNodes = astar(grid, startNode, endNode);
        const shortestPath = getNodesInShortestPathOrderAStar(endNode);

        await animate(visitedNodes);
        await animateShortestPath(shortestPath, visitedNodes.length);

        setStats({
            visitedNodesLength: visitedNodes.length,
            shortestPathLength: shortestPath.length,
        });
    };

    const visualizeBFS = async () => {
        const startNode = grid[startNodePos.row][startNodePos.col];
        const endNode = grid[endNodePos.row][endNodePos.col];
        const visitedNodes = bfs(grid, startNode, endNode);
        const shortestPath = getNodesInShortestPathOrderBFS(endNode);

        await animate(visitedNodes);
        await animateShortestPath(shortestPath, visitedNodes.length);

        setStats({
            visitedNodesLength: visitedNodes.length,
            shortestPathLength: shortestPath.length,
        });

        return;
    };

    const visualizeDFS = async () => {
        const startNode = grid[startNodePos.row][startNodePos.col];
        const endNode = grid[endNodePos.row][endNodePos.col];
        const visitedNodes = dfs(grid, startNode, endNode);
        const shortestPath = getNodesInShortestPathOrderDFS(endNode);

        await animate(visitedNodes);
        await animateShortestPath(shortestPath, visitedNodes.length);

        setStats({
            visitedNodesLength: visitedNodes.length,
            shortestPathLength: shortestPath.length,
        });

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

    const clearCurrentGrid = (
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

    const moveStartNode = (grid, node) => {
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

    const moveEndNode = (grid, node) => {
        if (
            grid[node.row][node.col].startNode ||
            grid[node.row][node.col].isWall
        )
            return grid;
        const newGrid = grid.slice();
        if (parentGrid) {
            newGrid[endNodeParent.row][endNodeParent.col].endNode = false;
        } else {
            newGrid[endNodePos.row][endNodePos.col].endNode = false;
        }
        newGrid[node.row][node.col].endNode =
            !newGrid[node.row][node.col].endNode;

        if (parentGrid) {
            setEndNodeParent({ row: node.row, col: node.col });
            return newGrid;
        }
        setEndNodePos({ row: node.row, col: node.col });
        return newGrid;
    };

    const handleMouseDown = (node) => {
        if (visualize) return;

        if (node.startNode) {
            setIsMovingStartNode(true);
        } else if (node.endNode) {
            setIsMovingEndNode(true);
        } else {
            const newGrid = createWall(grid, node);
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
    const handleMouseEnter = (node) => {
        if (visualize || !isMouseDown) return;
        let newGrid = null;
        if (isMovingStartNode) {
            newGrid = moveStartNode(grid, node);
        } else if (isMovingEndNode) {
            newGrid = moveEndNode(grid, node);
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
        setIsMovingStartNode(false);
        setIsMovingEndNode(false);
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
                            clearCurrentGrid(
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
            <div className={`${gridName}-Grid`}>
                {isFinished && (
                    <Modal
                        shortestPathLength={stats.shortestPathLength}
                        visitedNodesLength={stats.visitedNodesLength}
                        setIsFinished={setIsFinished}
                    />
                )}
                {grid.map((row, i) => {
                    return (
                        <div key={i} className="row">
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
