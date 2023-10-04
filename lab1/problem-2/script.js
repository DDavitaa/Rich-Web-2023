const notesContainer = document.getElementById("note-app");
const addNoteButton = notesContainer.querySelector(".add-Note");

getNotes().forEach(note => {
    const noteElement = createNote(note.id, note.content);

    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes()
{
    return JSON.parse(localStorage.getItem("note-app_notes") || "[]");
}

function saveNotes(notes) 
{
    localStorage.setItem("note-app_notes", JSON.stringify(notes));
}

function createNote(id, content) 
{
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty note";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    })

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete this note?");

        if(doDelete)
        {
            deleteNote(id,element);
        }
    })

    return element;
}

function addNote() 
{
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = createNote(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent)
{

}

function deleteNote(id, element)
{

}