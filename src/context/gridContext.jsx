import { createContext, useState } from "react";

export const GridContext = createContext(null);

export const GridProvider = ({ children }) => {
    const [gridOneIsAnimating, setGridOneAnimating] = useState(false);
    const [gridTwoIsAnimating, setGridTwoAnimating] = useState(false);

    let visualize = false;
    if (gridOneIsAnimating || gridTwoIsAnimating) visualize = true;

    return (
        <GridContext.Provider
            value={{
                visualize,
                setGridOneAnimating,
                setGridTwoAnimating,
            }}
        >
            {children}
        </GridContext.Provider>
    );
};
