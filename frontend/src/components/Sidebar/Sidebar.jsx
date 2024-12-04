import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
    const handleAddMemo = () => {
        alert("Add Memo clicked!");
    };

    return (
        <div className="sidebar">
            <button className="add-memo-btn" onClick={handleAddMemo}>
                + Add Memo
            </button>
        </div>
    );
};

export default Sidebar;
