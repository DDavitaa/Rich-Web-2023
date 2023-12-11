// importing necessary modules and components
import React from 'react';

// ColorPicker component receives props from the App component
const ColorPicker = ({ onSelectColor, show, setShowColorPicker, addNote }) => {
    // array of colors
    const colors = ["#ffffff","#fcacac","#fffead","#a4faa2","#a3fdff","#cfa8ff","#faa0eb"];

    // if the color picker is not visible, return null
    if (!show) {
        return null;
    }

    // render the color picker
    return (
        <div id="color-picker">
            <h2>Pick Color</h2>
            <div id="color-menu">
                {colors.map((color, index) => ( // Map over the colors array
                <div
                    key={index}
                    className="color-square"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      onSelectColor(color); // Pass the selected color instead of the index
                      setShowColorPicker(false); // Hide the color picker
                      addNote(color); // Add a note with the selected color
                    }}
                />
                ))}
            </div>
        </div>
    );
};

export default ColorPicker;
