import "../styles/App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { GridProvider } from "../context/gridContext";
import Layout from "./Layout";
import {
    Home,
    Algo,
    Visualizer,
    DijkstraPage,
    AStarPage,
    BFSPage,
    DFSPage,
} from "../Pages";

function App() {
    return (
        <GridProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/visualizer" element={<Visualizer />} />
                    <Route path="/algo" element={<Algo />}>
                        <Route index element={<DijkstraPage />} />
                        <Route path="DFSPage" element={<DFSPage />} />
                        <Route path="BFSPage" element={<BFSPage />} />
                        <Route path="AStarPage" element={<AStarPage />} />
                    </Route>
                </Route>
            </Routes>
        </GridProvider>
    );
}

export default App;
