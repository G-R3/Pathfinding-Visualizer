import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Grid from "./Grid";

const startNodeRows = 2;
const startNodeCols = 10;
const endNodeRows = 47;
const endNodeCols = 10;

export default function Visualizer() {
    const [visualize, setVisualize] = useState(false);
    const [error, setError] = useState(false);
    // idk how I feel about doing it this way. There is probably some better way but for now this works
    const [gridOneIsReady, setGridOneIsReady] = useState(false);
    const [gridTwoIsReady, setGridTwoIsReady] = useState(false);
    const [isGridOneAnimating, setIsGridOneAnimating] = useState(false);
    const [isGridTwoAnimating, setIsGridTwoAnimating] = useState(false);
    const [mirrorGrids, setMirrorGrids] = useState(false);
    const [parentGrid, setParentGrid] = useState([]);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const getGridWithoutPath = (grid) => {
        let newGrid = grid.slice();
        for (let row of grid) {
            for (let node of row) {
                let newNode = {
                    row: node.row,
                    col: node.col,
                    startNode:
                        node.row === startNodeRows &&
                        node.col === startNodeCols,
                    endNode:
                        node.row === endNodeRows && node.col === endNodeCols,
                    previousNode: null,
                    distance: Infinity,
                    isWall: node.isWall,
                    isVisited: false,
                };
                newGrid[node.row][node.col] = newNode;
            }
        }
        return newGrid;
    };

    const clearPath = (grid, gridName) => {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                let node = document.getElementById(`${gridName}-${row}-${col}`);
                if (
                    node.className === "node node-shortest-path" ||
                    node.className === "node node-visited"
                ) {
                    document.getElementById(
                        `${gridName}-${row}-${col}`,
                    ).className = "node";
                }
            }
        }
        const newGrid = getGridWithoutPath(grid);
        return newGrid;
    };

    const handleClick = () => {
        if (!gridOneIsReady || !gridTwoIsReady) {
            console.log("Choose Algorithms");
            setError(true);
            return;
        }

        setError(false);
        setVisualize(true);
        setIsGridOneAnimating(true);
        setIsGridTwoAnimating(true);
        return;
    };

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

    const clearGrid = (grid, gridName) => {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (grid[row][col].isWall) {
                    document.getElementById(
                        `${gridName}-${row}-${col}`,
                    ).className = "node";
                }
            }
        }

        let newGrid = getInitialGrid();
        return newGrid;
    };

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

    const handleNodeClick = (e, node) => {
        if (!node.startNode && !node.endNode) {
            e.target.classList.toggle("wall");
            node.isWall = !node.isWall;
        }
    };

    useEffect(() => {
        if (!mirrorGrids) {
            setParentGrid([]);
            return;
        }
        const newGrid = getInitialGrid();
        setParentGrid(newGrid);
    }, [mirrorGrids]);

    return (
        <div>
            <Navbar
                handleClick={handleClick}
                visualize={visualize}
                error={error}
                setMirrorGrids={setMirrorGrids}
                mirrorGrids={mirrorGrids}
            />
            <main>
                <div className="Grid-container">
                    <Grid
                        startNodeRows={startNodeRows}
                        startNodeCols={startNodeCols}
                        endNodeRows={endNodeRows}
                        endNodeCols={endNodeCols}
                        setIsReady={setGridOneIsReady}
                        setVisualize={setVisualize}
                        visualize={visualize}
                        gridName="first"
                        isAnimating={isGridOneAnimating}
                        setIsAnimating={setIsGridOneAnimating}
                        clearGrid={clearGrid}
                        clearPath={clearPath}
                        handleNodeClick={handleNodeClick}
                        handleMouseUp={handleMouseUp}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseDown={handleMouseDown}
                        parentGrid={mirrorGrids ? parentGrid : null}
                        setParentGrid={mirrorGrids ? setParentGrid : null}
                    />
                </div>
                <div className="Grid-container">
                    <Grid
                        startNodeRows={startNodeRows}
                        startNodeCols={startNodeCols}
                        endNodeRows={endNodeRows}
                        endNodeCols={endNodeCols}
                        setIsReady={setGridTwoIsReady}
                        setVisualize={setVisualize}
                        visualize={visualize}
                        gridName="second"
                        isAnimating={isGridTwoAnimating}
                        setIsAnimating={setIsGridTwoAnimating}
                        clearGrid={clearGrid}
                        clearPath={clearPath}
                        handleNodeClick={handleNodeClick}
                        handleMouseUp={handleMouseUp}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseDown={handleMouseDown}
                        parentGrid={mirrorGrids ? parentGrid : null}
                        setParentGrid={mirrorGrids ? setParentGrid : null}
                    />
                </div>
            </main>
        </div>
    );
}
