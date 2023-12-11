// importing necessary modules and components
import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './Note.js';
import ColorPicker from './ColorPicker.js';
import Jokes from './Jokes.js';
import YouTubePlayer from './YoutubePlayer.js';

// main App component
const App = () => {
    // state for storing notes, initially fetched from local storage
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("note-app_notes") || "[]"));

    // state for controlling the visibility of the color picker
    const [showColorPicker, setShowColorPicker] = useState(false);

    // state for storing the selected color from the color picker
    const [colorIsSelected, setColorIsSelected] = useState(null);

    // state for controlling the visibility of the YouTube player
    const [showPlayer, setShowPlayer] = useState(false);

    // state for storing the YouTube player instance
    const [player, setPlayer] = useState(null);

    // effect hook for saving notes to local storage whenever they change
    useEffect(() => {
        localStorage.setItem("note-app_notes", JSON.stringify(notes));
    }, 
    [notes]);

    // function for showing the color picker menu
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

    // function for adding a note
    const addNote = (color) => {
        const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: "",
        color: color
        };
        setNotes([...notes, noteObject]);
        
    };

    // function for updating a note
    const updateNote = (id, newContent) => {
        setNotes(notes.map(note => note.id === id ? { ...note, content: newContent } : note));
    };

    // function for deleting a note
    const deleteNote = (id) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            setNotes(notes.filter(note => note.id !== id));
        }
    };

    // function for moving a note to the left
    const moveNoteLeft = (id) => {
        const index = notes.findIndex(note => note.id === id);

        if (index > 0) {
            const newNotes = [...notes];
            [newNotes[index - 1], newNotes[index]] = [newNotes[index], newNotes[index - 1]];

            setNotes(newNotes);
        }
    };
      
    // function for moving a note to the right
    const moveNoteRight = (id) => {
        const index = notes.findIndex(note => note.id === id);

        if (index < notes.length - 1) {
            const newNotes = [...notes];
            [newNotes[index], newNotes[index + 1]] = [newNotes[index + 1], newNotes[index]];

            setNotes(newNotes);
        }
    };

    // return the app
    return (
        <div>
            <h1>Note App</h1>
            <hr />
            <div className='above_notes'>
                <Jokes player={player} setShowPlayer={setShowPlayer} /> {/* JokeS component */}
                {showPlayer && <YouTubePlayer // YoutubePlayer component
                    videoId="f8mL0_4GeV0" // Video ID
                    setPlayer={setPlayer} // Set the player instance
                    shouldPlay={showPlayer} // Play the video if showPlayer is true
                    style={{ display: showPlayer ? 'block' : 'none' }} 
                />}
            </div>
            <div id="note-app">
                <ColorPicker // ColorPicker component
                    onSelectColor={setColorIsSelected} // Set the selected color
                    show={showColorPicker} // Show the color picker if showColorPicker is true
                    setShowColorPicker={setShowColorPicker} // Set the visibility of the color picker
                    addNote={addNote} // Add a note
                />
                {notes.map(note => ( // map over the notes array
                    <Note // Note component
                        key={note.id}
                        id={note.id}
                        content={note.content}
                        color={note.color}
                        onDelete={deleteNote} // Delete a note
                        onUpdate={updateNote} // Update a note
                        onMoveLeft={() => moveNoteLeft(note.id)} // Move a note left
                        onMoveRight={() => moveNoteRight(note.id)} // Move a note right
                    />
                ))}
                <button className="add-note" type="button" onClick={showColorPickerMenu}>Add a Note</button>
            </div>
        </div>
    );
};

export default App;