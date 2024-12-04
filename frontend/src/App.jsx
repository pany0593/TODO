import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Schedule from "./components/Schedule/Schedule";
import "./App.css";

const App = () => {
    return (
        <div className="app">
            <Header />
            <div className="main-container">
                <Sidebar />
                <Schedule />
            </div>
        </div>
    );
};

export default App;
