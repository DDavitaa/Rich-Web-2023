import React, { useState, useEffect } from 'react';
import { fromEvent } from 'rxjs';

// Note component
const Note = ({ id, content, color, onDelete, onUpdate }) => {
    const [noteContent, setNoteContent] = useState(content);
    const noteRef = React.useRef(null);
  
    useEffect(() => {
      const editNote = fromEvent(noteRef.current, 'change')
        .subscribe(() => onUpdate(id, noteRef.current.value));
  
      const deleteNote = fromEvent(noteRef.current, 'dblclick')
        .subscribe(() => onDelete(id));
  
      return () => {
        editNote.unsubscribe();
        deleteNote.unsubscribe();
      };
    }, [id, onUpdate, onDelete]);
  
    return (
      <textarea
        ref={noteRef}
        className="note"
        value={noteContent}
        placeholder="Empty note"
        style={{ backgroundColor: color }}
        onChange={(e) => setNoteContent(e.target.value)}
      />
    );
};

export default Note;