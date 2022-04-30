import React from "react";

export default function Node({
    mouseDown,
    mouseEnter,
    mouseUp,
    node,
    gridName,
}) {
    const classes = node.startNode
        ? "start-node"
        : node.endNode
        ? "end-node"
        : node.isWall
        ? "wall"
        : "";
    const id = `${gridName}-${node.row}-${node.col}`;
    return (
        <div
            className={`node ${classes}`}
            id={id}
            onMouseDown={(evt) => mouseDown(evt, node)}
            onMouseEnter={(evt) => mouseEnter(evt, node)}
            onMouseUp={mouseUp}
        ></div>
    );
}
