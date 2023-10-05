
// represents the container app
const notesContainer = document.getElementById("note-app");

// refers to the add-note button
const addNoteButton = notesContainer.querySelector(".add-note");

// displays to user when called
getNotes().forEach(note => {
    const noteElement = createNote(note.id, note.content);

    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

// gets all notes
function getNotes()
{
    return JSON.parse(localStorage.getItem("note-app_notes") || "[]");
}

// saves notes to local storage
function saveNotes(notes) 
{
    localStorage.setItem("note-app_notes", JSON.stringify(notes));
}

// Builds new element to represent a new note
function createNote(id, content) 
{
    // creates a new textarea element
    const element = document.createElement("textarea");

    // adds 'note' to classList for CSS to recognise
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty note";

    // when changed, then call update function
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    })

    // when double clicked, then call delete function
    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete this note?");

        if(doDelete)
        {
            deleteNote(id,element);
        }
    })

    return element;
}

// added new note to html
function addNote() 
{
    const notes = getNotes();

    // sets id to random number
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    // creates new note element
    const noteElement = createNote(noteObject.id, noteObject.content);

    // puts note before the add note button
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

// editing the note
function updateNote(id, newContent)
{
    const notes = getNotes();

    // filters the note by id
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

// deletes the note
function deleteNote(id, element)
{
    
}