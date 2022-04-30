import "../styles/App.css";
import React from "react";
import { GridProvider } from "../context/gridContext";
import Visualizer from "./Visualizer";

function App() {
    return (
        <GridProvider>
            <div className="App">
                <Visualizer />
            </div>
        </GridProvider>
    );
}

export default App;
