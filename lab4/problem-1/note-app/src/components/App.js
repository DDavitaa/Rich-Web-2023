import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './Note.js';
import ColorPicker from './ColorPicker.js';

// App component
const App = () => {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("note-app_notes") || "[]"));
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [colorIsSelected, setColorIsSelected] = useState(null);

    useEffect(() => {
        localStorage.setItem("note-app_notes", JSON.stringify(notes));
    }, 
    [notes]);

    const showColorPickerMenu = () => {
        if (!showColorPicker) {
            setShowColorPicker(true);
        }
        else {
            setColorIsSelected(colorIsSelected);
            setShowColorPicker(false);
            addNote(colorIsSelected);
        }
    };

    const addNote = (color) => {
        const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: "",
        color: color
        };
        setNotes([...notes, noteObject]);
        
    };

    const updateNote = (id, newContent) => {
        setNotes(notes.map(note => note.id === id ? { ...note, content: newContent } : note));
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <div>
            <h1>Note App</h1>
            <hr />
            <div id="note-app">
                <ColorPicker onSelectColor={setColorIsSelected} show={showColorPicker} setShowColorPicker={setShowColorPicker} addNote={addNote} />
                {notes.map(note => (
                    <Note
                        key={note.id}
                        id={note.id}
                        content={note.content}
                        color={note.color}
                        onDelete={deleteNote}
                        onUpdate={updateNote}
                    />
                ))}
                <button className="add-note" type="button" onClick={showColorPickerMenu}>Add a Note</button>
            </div>
        </div>
    );
};

export default App;