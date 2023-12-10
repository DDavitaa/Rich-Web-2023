import React, { useState, useEffect } from 'react';

// ColorPicker component
const ColorPicker = ({ onSelectColor, show, setShowColorPicker, addNote }) => {
    const colors = ["#ffffff","#fcacac","#fffead","#a4faa2","#a3fdff","#cfa8ff","#faa0eb"];

    if (!show) {
        return null;
    }

    return (
        <div id="color-picker">
            <h2>Pick Color</h2>
            <div id="color-menu">
                {colors.map((color, index) => (
                <div
                    key={index}
                    className="color-square"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      onSelectColor(color); // Pass the selected color instead of the index
                      setShowColorPicker(false); // Hide the color picker
                      addNote(color);
                    }}
                />
                ))}
            </div>
        </div>
    );
};

export default ColorPicker;
