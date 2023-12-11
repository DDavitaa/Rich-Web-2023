// importing necessary modules and components
import React, { useState, useEffect } from 'react';
import { fromEvent } from 'rxjs';

// Note component receives props from the App component
const Note = ({ id, content, color, onDelete, onUpdate, onMoveLeft, onMoveRight  }) => {
    // state for storing the note content
    const [noteContent, setNoteContent] = useState(content);

    // ref for the note textarea
    const noteRef = React.useRef(null);
  
    // effect hook for updating the note content whenever it changes
    useEffect(() => {
        // update the note content
        const editNote = fromEvent(noteRef.current, 'change')
            .subscribe(() => onUpdate(id, noteRef.current.value));

        // delete the note
        const deleteNote = fromEvent(noteRef.current, 'dblclick')
            .subscribe(() => onDelete(id));
    
        // unsubscribe from the events when the component unmounts
        return () => {
            editNote.unsubscribe();
            deleteNote.unsubscribe();
        };
    }, [id, onUpdate, onDelete]);

    
    // render the note
    return (
        <div>
            <textarea
                ref={noteRef}
                className="note"
                value={noteContent}
                placeholder="Empty note"
                style={{ backgroundColor: color }}
                onChange={(e) => setNoteContent(e.target.value)} // Update the note content
            />
            <div className="note-btns">
                <button className='move-note_btn' onClick={onMoveLeft}>&larr;</button> {/* Move the note left */}
                <button className='move-note_btn' onClick={onMoveRight}>&rarr;</button> {/* Move the note right */}
            </div>
        </div>
    );
};

export default Note;