import "../styles/App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { GridProvider } from "../context/gridContext";
import Layout from "./Layout";
import { Home, Algo, Visualizer } from "../Pages";

function App() {
    return (
        <GridProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/algo" element={<Algo />} />
                    <Route path="/visualizer" element={<Visualizer />} />
                </Route>
            </Routes>
        </GridProvider>
    );
}

export default App;
