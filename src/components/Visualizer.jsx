import React, { useContext, useEffect, useState } from "react";
import { GridContext } from "../context/gridContext";
import Navbar from "./Navbar";
import Grid from "./Grid";

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
    const { visualize, setGridOneAnimating, setGridTwoAnimating } =
        useContext(GridContext);

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
        const newGrid = getGridWithoutPath(
            grid,
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

    const getInitialGrid = (
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
                });
            }
            initialGrid.push(gridRow);
        }

        return initialGrid;
    };

    const clearGrid = (
        grid,
        gridName,
        startNodeRows,
        startNodeCols,
        endNodeRows,
        endNodeCols,
    ) => {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (grid[row][col].startNode || grid[row][col].endNode)
                    continue;
                document.getElementById(`${gridName}-${row}-${col}`).className =
                    "node";
            }
        }

        let newGrid = getInitialGrid(
            50,
            20,
            startNodeRows,
            startNodeCols,
            endNodeRows,
            endNodeCols,
        );
        return newGrid;
    };

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
        const newGrid = getInitialGrid(50, 20);
        setParentGrid(newGrid);
    }, [mirrorGrids]);

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
                        getGrid={getInitialGrid}
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
                        getGrid={getInitialGrid}
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
