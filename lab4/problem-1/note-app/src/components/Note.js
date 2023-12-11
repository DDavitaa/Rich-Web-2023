import React, { useState, useEffect } from 'react';
import { fromEvent } from 'rxjs';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// Note component
const Note = ({ id, content, color, onDelete, onUpdate }) => {
    const [noteContent, setNoteContent] = useState(content);
    // const [reminder, setReminder] = useState(null);
    const noteRef = React.useRef(null);

    // const handleSetReminder = (date) => {
    //     setReminder(date);
    
    //     const timeout = date.getTime() - new Date().getTime();
    //     setTimeout(() => {
    //       new Notification(`Reminder for note ${id}`, {
    //         body: noteContent,
    //       });
    //     }, timeout);
    // };
  
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
        <div>
          <textarea
            ref={noteRef}
            className="note"
            value={noteContent}
            placeholder="Empty note"
            style={{ backgroundColor: color }}
            onChange={(e) => setNoteContent(e.target.value)}
          />
          {/* <DatePicker selected={reminder} onChange={handleSetReminder} showTimeSelect /> */}
        </div>
    );
};

export default Note;