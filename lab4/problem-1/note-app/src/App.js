import React, { useState, useEffect } from 'react';
import './App.css';
import ColorPicker from './ColorPicker.js';

// App component
const App = () => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [colorIsSelected, setColorIsSelected] = useState(null);

    const showColorPickerMenu = () => {
        if (!showColorPicker) {
            setShowColorPicker(true);
        }
    };

    return (
        <div>
            <h1>Note App</h1>
            <hr />
            <div id="note-app">
                <ColorPicker onSelectColor={setColorIsSelected} show={showColorPicker} setShowColorPicker={setShowColorPicker} />
                <textarea className="note" placeholder='TEST NOTE'/>
                <button className="add-note" type="button" onClick={showColorPickerMenu}>Add a Note</button>
            </div>
        </div>
    );
};

export default App;