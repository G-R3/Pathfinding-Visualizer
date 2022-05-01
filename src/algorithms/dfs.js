const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export function dfs(grid, startNode, endNode) {
    const stack = [];
    const visited = [];
    startNode.distance = 0;
    stack.push(startNode);

    while (stack.length !== 0) {
        let currentNode = stack.pop();

        if (currentNode.isWall) continue;
        // if (currentNode.distance === Infinity) return visited;
        currentNode.isVisited = true;
        if (currentNode === endNode) return visited;
        if (!currentNode.startNode) visited.push(currentNode);

        let neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (let neighbor of neighbors) {
            // neighbor.distance = currentNode.distance + 1;
            neighbor.previousNode = currentNode;

            stack.push(neighbor);
        }
    }
    return visited;
}

export const getNodesInShortestPathOrderDFS = (finishNode) => {
    const shortestPathOrder = [];
    let currentNode = finishNode.previousNode;
    while (currentNode !== null && currentNode.isVisited) {
        if (currentNode.startNode) break;
        shortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPathOrder;
};
