function heuristic(node, endNode) {
    // let D = 0;
    // manhattan
    // let dx = Math.abs(node.row - endNode.row);
    // let dy = Math.abs(node.col - endNode.col);
    // return dx + dy; //Math.sqrt(dx * dx + dy * dy);

    return Math.sqrt(
        Math.pow(node.row - endNode.row, 2) +
            Math.pow(node.col - endNode.col, 2),
    );
}

const updateUnvisitedNeighbors = (currentNode, grid, endNode, openList) => {
    let neighbors = getNeighbors(grid, currentNode);
    for (let neighbor of neighbors) {
        // tentative gscore
        let gScore = currentNode.g + 1;
        // find the best current path
        if (gScore < neighbor.g) {
            neighbor.previousNode = currentNode;
            neighbor.g = gScore;
            neighbor.h = heuristic(neighbor, endNode);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.distance = currentNode.distance + 1;
            if (!openList.includes(neighbor)) {
                openList.push(neighbor);
            }
        }
    }
};

//neighbors of currentNode
function getNeighbors(grid, node) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.filter((neighbor) => !neighbor.isVisited);
}

const sortByFScore = (openList) => {
    openList.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
};

export const astar = (grid, startNode, endNode) => {
    let openList = []; //nodes to be explored
    let closedList = []; //nodes already explored

    // set initial properties of start node
    startNode.distance = 0;
    startNode.g = 0;
    startNode.h = heuristic(startNode, endNode);
    startNode.f = startNode.h;
    // add start node to nodes that have been explored
    openList.push(startNode);

    while (openList.length !== 0) {
        // sort list in order of min to max fscore
        sortByFScore(openList);
        // get the node with the lowest fscore
        const currentNode = openList.shift();

        // if the current node is a wall, go on to the next node
        if (currentNode.isWall) continue;

        // push node into list of visited nodes
        currentNode.isVisited = true;
        closedList.push(currentNode);

        // path was found, return visited nodes
        if (currentNode === endNode) return closedList;

        // update the neighbors of our current node
        updateUnvisitedNeighbors(currentNode, grid, endNode, openList);
    }
    // no path found return explored nodes
    return closedList;
};

// get the nodes in the shortest path
export const getNodesInShortestPathOrderAStar = (finishNode) => {
    const shortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null && currentNode.isVisited) {
        shortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    return shortestPathOrder;
};
