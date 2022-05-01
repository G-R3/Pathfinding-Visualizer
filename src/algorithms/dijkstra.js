// return all nodes in a single array
// const getAllNodes = (grid) => {
//     let nodes = [];
//     for (let rows of grid) {
//         for (let node of rows) {
//             nodes.push(node);
//         }
//     }

//     return nodes;
// };

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

// update the distance of the neighbors of the current node and set them to point to the current node (previous node)
const updateUnvisitedNeighbors = (node, grid, unvisitedNodes) => {
    // get all neighbors of the node
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;

        if (!neighbor.isVisited) unvisitedNodes.push(neighbor);
        neighbor.isVisited = true;
    }
};

// return the unvisited neightboads to the left, right, top, and bottom of the current node that have not been visisted
const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export const dijkstra = (grid, startNode, endNode) => {
    const visitedNodes = []; // list of nodes visited
    const unvisitedNodes = []; // list of nodes not visited
    startNode.distance = 0;
    unvisitedNodes.push(startNode);

    while (unvisitedNodes.length !== 0) {
        // sort by distance and find the closest neighbor
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        // if the current node is a wall, go on to the next node
        if (closestNode.isWall) continue;
        // shortest path not found :(
        if (closestNode.distance === Infinity) {
            return visitedNodes;
        }
        closestNode.isVisited = true; // node was visited
        // shortest path found :D
        if (closestNode === endNode) {
            return visitedNodes;
        }

        // push node into list of visited nodes
        if (!closestNode.startNode) visitedNodes.push(closestNode);

        // update the distance and previous nodes of all nieghbors of our current node
        updateUnvisitedNeighbors(closestNode, grid, unvisitedNodes);
    }

    return visitedNodes;
};

export const getNodesInShortestPathOrder = (finishNode) => {
    const shortestPath = [];
    let currentNode = finishNode.previousNode;
    while (currentNode !== null && currentNode.isVisited) {
        if (currentNode.startNode) break;
        shortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPath;
};
