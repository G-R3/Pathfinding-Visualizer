// return all nodes in a single array
const getAllNodes = (grid) => {
    let nodes = [];
    for (let rows of grid) {
        for (let node of rows) {
            nodes.push(node);
        }
    }

    return nodes;
};

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

// update the distance of the neighbors of the current node and set them to point to the current node
const updateUnvisitedNeighbors = (node, grid) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
};

// return the unvisited neightboads to the left, right, top, and bottom of the current node that have not yet been visisted
const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export const getNodesInShortestPathOrder = (finishNode) => {
    const shortestPathOrder = [];
    let currentNode = finishNode.previousNode;
    while (!currentNode.startNode) {
        shortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPathOrder;
};

export const dijkstra = (grid, startNode, endNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (unvisitedNodes.length !== 0) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.isWall) continue; // if the current node is a wall, go on to the next node
        if (closestNode.distance === Infinity) return visitedNodesInOrder; // if no path is found return nodes
        if (closestNode === endNode) return visitedNodesInOrder; // if the end node is reached
        closestNode.isVisited = true;
        if (!closestNode.startNode) visitedNodesInOrder.push(closestNode);
        updateUnvisitedNeighbors(closestNode, grid);
    }
};
