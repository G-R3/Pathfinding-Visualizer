const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const { col, row } = node;
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export const bfs = (grid, startNode, endNode) => {
    const list = [];
    const visitedNodesInOrder = [];
    startNode.isVisited = true;
    startNode.distance = 0;
    list.push(startNode);

    while (list.length !== 0) {
        const currentNode = list.shift();
        // if the current node is a wall, go on to the next node
        if (currentNode.isWall) continue;
        // push node into list of visited nodes
        visitedNodesInOrder.push(currentNode);
        // shortest path found return visited nodes
        if (currentNode === endNode) return visitedNodesInOrder;

        // update neighbors of our current node
        let neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (let neighbor of neighbors) {
            neighbor.isVisited = true;
            neighbor.previousNode = currentNode;
            list.push(neighbor);
        }
    }

    // no path found return explored nodes
    return visitedNodesInOrder;
};

export const getNodesInShortestPathOrderBFS = (finishNode) => {
    const shortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null && currentNode.isVisited) {
        shortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPathOrder;
};
