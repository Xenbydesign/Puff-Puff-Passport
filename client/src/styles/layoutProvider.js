import React, { createContext, useContext, useState, useEffect } from 'react';

const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

const LayoutProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <LayoutContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </LayoutContext.Provider>
    );
};

export default LayoutProvider;
