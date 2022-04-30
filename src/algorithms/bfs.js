const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export const bfs = (grid, startNode, endNode) => {
    let visited = [];
    let visitedNodesInOrder = [];
    startNode.isVisited = true;
    startNode.distance = 0;
    visited.push(startNode);

    while (visited.length !== 0) {
        let currentNode = visited.shift();

        if (currentNode.isWall) continue; // if the current node is a wall, go on to the next node
        if (currentNode === endNode) return visitedNodesInOrder;
        if (currentNode.distance === Infinity) return visitedNodesInOrder;

        visitedNodesInOrder.push(currentNode);
        let neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (let neighbor of neighbors) {
            if (!neighbor.isVisited) {
                visited.push(neighbor);
                neighbor.isVisited = true;
                neighbor.previousNode = currentNode;
                neighbor.distance = currentNode.distance + 1;
            }
        }
    }
};

export const getNodesInShortestPathOrderBFS = (finishNode) => {
    const shortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        shortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPathOrder;
};
