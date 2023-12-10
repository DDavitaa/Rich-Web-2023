import React, { useState, useEffect } from 'react';
import { fromEvent } from 'rxjs';

// ColorPicker component
const ColorPicker = ({ onSelectColor, show, setShowColorPicker }) => {
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
                      console.log(color); 
                    }}
                />
                ))}
            </div>
        </div>
    );
};

export default ColorPicker;

