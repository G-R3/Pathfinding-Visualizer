// manhattan heuristics
function heuristic(neighbor, endNode) {
    // let D = 0;
    let dx = Math.abs(neighbor.row - endNode.row);
    let dy = Math.abs(neighbor.col - endNode.col);
    return dx + dy; //Math.sqrt(dx * dx + dy * dy);
}

const updateUnvisitedNeighbors = (
    currentNode,
    endNode,
    grid,
    openList,
    closedList,
) => {
    let neighbors = getNeighbors(grid, currentNode);
    for (let neighbor of neighbors) {
        if (neighbor.closed || neighbor.isWall) continue;

        // tentative gscore
        let gScore =
            currentNode.g +
            (neighbor.row - currentNode.row === 0 ||
            neighbor.col - currentNode.col === 0
                ? 1
                : Math.SQRT2);

        // find the best current path
        if (!neighbor.isVisited || gScore < neighbor.g) {
            neighbor.previousNode = currentNode;
            neighbor.g = gScore;
            neighbor.h = neighbor.h || 1 * heuristic(neighbor, endNode);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.distance = currentNode.distance + 1;

            if (!neighbor.isVisited) {
                openList.push(neighbor);
                neighbor.isVisited = true;
            } else {
                openList.map((node) => {
                    if (
                        node.row === neighbor.row &&
                        node.col === neighbor.col
                    ) {
                        let a = {
                            ...node,
                            ...neighbor,
                        };
                        return a;
                    }
                    return node;
                });
            }
        }
    }
};

//neighbors of currentNode
function getNeighbors(grid, node, diagonals = false) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (diagonals) {
        // Southwest
        if (grid[row - 1] && grid[row - 1][col - 1]) {
            neighbors.push(grid[row - 1][col - 1]);
        }
        // Southeast
        if (grid[row + 1] && grid[row + 1][col - 1]) {
            neighbors.push(grid[row + 1][col - 1]);
        }
        // Northwest
        if (grid[row - 1] && grid[row - 1][col + 1]) {
            neighbors.push(grid[row - 1][col + 1]);
        }
        // Northeast
        if (grid[row + 1] && grid[row + 1][col + 1]) {
            neighbors.push(grid[row + 1][col + 1]);
        }
    }
    return neighbors.filter((neighbor) => !neighbor.isVisited);
}

const sortList = (openList) => {
    openList.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
};

export const astar = (grid, startNode, endNode) => {
    let openList = []; //nodes to be explored
    let closedList = []; //nodes already explored

    // set initial properties of start node
    startNode.distance = 0;
    startNode.g = 0;
    startNode.f = 0;

    // add start node to nodes that have been explored
    openList.push(startNode);
    startNode.isVisited = true;

    while (openList.length !== 0) {
        // sort list in order of min to max fscore
        sortList(openList);
        // get the node with the lowest fscore
        let currentNode = openList.shift();
        currentNode.closed = true;

        // if no path return the explored nodes
        if (currentNode.distance === Infinity) return closedList;

        // if end goal is reached, return explored nodes
        if (currentNode === endNode) return closedList;

        // add current node to explored nodes
        if (!currentNode.startNode) closedList.push(currentNode);

        // update the neighbors of our current node
        updateUnvisitedNeighbors(
            currentNode,
            endNode,
            grid,
            openList,
            closedList,
        );
    }
};

// get the nodes in the shortest path
export const getNodesInShortestPathOrderAStar = (finishNode) => {
    const shortestPathOrder = [];
    let currentNode = finishNode.previousNode;
    while (currentNode !== null && currentNode.isVisited) {
        shortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    return shortestPathOrder;
};
