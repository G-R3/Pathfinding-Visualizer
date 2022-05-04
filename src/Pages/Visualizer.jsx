import React, { useContext, useEffect, useState } from "react";
import { GridContext } from "../context/gridContext";
import Navbar from "../components/Navbar";
import Grid from "../components/Grid";

export default function Visualizer() {
    const [error, setError] = useState(false);
    // idk how I feel about doing it this way. There is probably some better way but for now this works
    const [gridOneIsReady, setGridOneIsReady] = useState(false);
    const [gridTwoIsReady, setGridTwoIsReady] = useState(false);
    const [mirrorGrids, setMirrorGrids] = useState(false);
    const [parentGrid, setParentGrid] = useState([]);
    const [parentStartNodePos, setParentStartNodePos] = useState({
        row: 2,
        col: 10,
    });
    const [parentEndNodePos, setParentEndNodePos] = useState({
        row: 47,
        col: 10,
    });
    const { setGridOneAnimating, setGridTwoAnimating } =
        useContext(GridContext);

    useEffect(() => {
        if (!mirrorGrids) {
            setParentGrid([]);
            setParentStartNodePos({
                row: 2,
                col: 10,
            });
            setParentEndNodePos({ row: 47, col: 10 });
            return;
        }
        const newGrid = getGrid(50, 20);
        setParentGrid(newGrid);
    }, [mirrorGrids]);

    const getGrid = (
        numRows = 50,
        numCols = 20,
        startNodeRows = 2,
        startNodeCols = 10,
        endNodeRows = 47,
        endNodeCols = 10,
    ) => {
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
                    isShortestPath: false,
                    f: Infinity,
                    g: Infinity,
                    h: Infinity,
                });
            }
            initialGrid.push(gridRow);
        }

        return initialGrid;
    };

    const getGridWithoutPath = (
        grid,
        startNodeRows,
        startNodeCols,
        endNodeRows,
        endNodeCols,
    ) => {
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
                    isShortestPath: false,
                    f: Infinity,
                    g: Infinity,
                    h: Infinity,
                };
                newGrid[node.row][node.col] = newNode;
            }
        }
        return newGrid;
    };

    const clearPath = (
        grid,
        gridName,
        startNodeRows,
        startNodeCols,
        endNodeRows,
        endNodeCols,
    ) => {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                let node = grid[row][col];
                if (node.isWall) continue;
                if (node.startNode) {
                    document.getElementById(
                        `${gridName}-${row}-${col}`,
                    ).className = "node start-node";
                } else if (node.endNode) {
                    document.getElementById(
                        `${gridName}-${row}-${col}`,
                    ).className = "node end-node";
                } else {
                    document.getElementById(
                        `${gridName}-${row}-${col}`,
                    ).className = "node";
                }
            }
        }
        const newGrid = getGridWithoutPath(
            grid,
            startNodeRows,
            startNodeCols,
            endNodeRows,
            endNodeCols,
        );
        return newGrid;
    };

    // this is a cursed function. A better way would be to reset properties of the nodes. Those properties would be in charge of adding/removing classes
    // for example: if node.isShortestPath then we give the class of node-shortest-path
    // with this method, if we reset the grids, classes are also reset
    const clearAllGrids = (grid) => {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                let node = grid[row][col];
                if (node.startNode)
                    document.getElementById(`first-${row}-${col}`).className =
                        "node start-node";
                else if (node.endNode) {
                    document.getElementById(`first-${row}-${col}`).className =
                        "node end-node";
                } else {
                    document.getElementById(`first-${row}-${col}`).className =
                        "node";
                }
            }
        }
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                let node = grid[row][col];
                if (node.startNode)
                    document.getElementById(`second-${row}-${col}`).className =
                        "node start-node";
                else if (node.endNode) {
                    document.getElementById(`second-${row}-${col}`).className =
                        "node end-node";
                } else {
                    document.getElementById(`second-${row}-${col}`).className =
                        "node";
                }
            }
        }
    };

    const clearGrid = (
        grid,
        gridName,
        startNodeRows,
        startNodeCols,
        endNodeRows,
        endNodeCols,
    ) => {
        if (mirrorGrids) {
            clearAllGrids(grid);
        } else {
            for (let row = 0; row < grid.length; row++) {
                for (let col = 0; col < grid[row].length; col++) {
                    let node = grid[row][col];
                    if (node.startNode)
                        document.getElementById(
                            `${gridName}-${row}-${col}`,
                        ).className = "node start-node";
                    else if (node.endNode) {
                        document.getElementById(
                            `${gridName}-${row}-${col}`,
                        ).className = "node end-node";
                    } else {
                        document.getElementById(
                            `${gridName}-${row}-${col}`,
                        ).className = "node";
                    }
                }
            }
        }

        let newGrid = getGrid(
            50,
            20,
            startNodeRows,
            startNodeCols,
            endNodeRows,
            endNodeCols,
        );

        return newGrid;
    };

    const handleClick = () => {
        if (!gridOneIsReady || !gridTwoIsReady) {
            console.log("Choose Algorithms");
            setError(true);
            return;
        }

        setError(false);
        setGridOneAnimating(true);
        setGridTwoAnimating(true);
        return;
    };

    return (
        <div>
            <Navbar
                handleClick={handleClick}
                error={error}
                setMirrorGrids={setMirrorGrids}
                mirroredGrids={mirrorGrids}
            />
            <main>
                <div className="Grid-container">
                    <Grid
                        getGrid={getGrid}
                        setIsReady={setGridOneIsReady}
                        gridName="first"
                        clearGrid={clearGrid}
                        clearPath={clearPath}
                        parentGrid={mirrorGrids ? parentGrid : null}
                        setParentGrid={mirrorGrids ? setParentGrid : null}
                        startNodeParent={parentStartNodePos}
                        endNodeParent={parentEndNodePos}
                        setStartNodeParent={setParentStartNodePos}
                        setEndNodeParent={setParentEndNodePos}
                    />
                </div>
                <div className="Grid-container">
                    <Grid
                        getGrid={getGrid}
                        setIsReady={setGridTwoIsReady}
                        gridName="second"
                        clearGrid={clearGrid}
                        clearPath={clearPath}
                        parentGrid={mirrorGrids ? parentGrid : null}
                        setParentGrid={mirrorGrids ? setParentGrid : null}
                        startNodeParent={parentStartNodePos}
                        setStartNodeParent={setParentStartNodePos}
                        setEndNodeParent={setParentEndNodePos}
                        endNodeParent={parentEndNodePos}
                    />
                </div>
            </main>
        </div>
    );
}
