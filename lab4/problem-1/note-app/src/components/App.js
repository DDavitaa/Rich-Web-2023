import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './Note.js';
import ColorPicker from './ColorPicker.js';
import Jokes from './Jokes.js';
import YouTubePlayer from './YoutubePlayer.js';

// App component
const App = () => {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("note-app_notes") || "[]"));
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [colorIsSelected, setColorIsSelected] = useState(null);

    const [showPlayer, setShowPlayer] = useState(false);
    const [player, setPlayer] = useState(null);

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
        if (window.confirm('Are you sure you want to delete this note?')) {
            setNotes(notes.filter(note => note.id !== id));
        }
    };

    const moveNoteLeft = (id) => {
        const index = notes.findIndex(note => note.id === id);
        if (index > 0) {
          const newNotes = [...notes];
          [newNotes[index - 1], newNotes[index]] = [newNotes[index], newNotes[index - 1]];
          setNotes(newNotes);
        }
      };
      
      const moveNoteRight = (id) => {
        const index = notes.findIndex(note => note.id === id);
        if (index < notes.length - 1) {
          const newNotes = [...notes];
          [newNotes[index], newNotes[index + 1]] = [newNotes[index + 1], newNotes[index]];
          setNotes(newNotes);
        }
      };

    return (
        <div>
            <h1>Note App</h1>
            <hr />
            <div className='above_notes'>
                <Jokes player={player} setShowPlayer={setShowPlayer} />
                {showPlayer && <YouTubePlayer videoId="f8mL0_4GeV0" setPlayer={setPlayer} shouldPlay={showPlayer} style={{ display: showPlayer ? 'block' : 'none' }} />}
            </div>
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
                        onMoveLeft={() => moveNoteLeft(note.id)}
                        onMoveRight={() => moveNoteRight(note.id)}
                    />
                ))}
                <button className="add-note" type="button" onClick={showColorPickerMenu}>Add a Note</button>
            </div>
            
        </div>
    );
};

export default App;