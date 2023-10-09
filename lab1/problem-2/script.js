
// represents the container app
const notesContainer = document.getElementById("note-app");

// refers to the add-note button
const addNoteButton = notesContainer.querySelector(".add-note");

// displays to user when called
getNotes().forEach(note => {
    const noteElement = createNote(note.id, note.content, note.backgroundColor);

    

    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

// array of colors: white, light red, light yellow, light green, light blue, light purple, light pink
var colors = ["#ffffff","#fcacac","#fffead","#a4faa2","#a3fdff","#cfa8ff","#faa0eb"];

// color picker menu
var colorPicker = document.getElementById("color-picker");
var colorIsSelected;

function openColors() 
{
    // shows color picker
    colorPicker.style.display = "block";

    // sets colors
    document.getElementById("color_white").style.backgroundColor = colors[0];
    document.getElementById("color_red").style.backgroundColor = colors[1];
    document.getElementById("color_yellow").style.backgroundColor = colors[2];
    document.getElementById("color_green").style.backgroundColor = colors[3];
    document.getElementById("color_blue").style.backgroundColor = colors[4];
    document.getElementById("color_purple").style.backgroundColor = colors[5];
    document.getElementById("color_pink").style.backgroundColor = colors[6];
    
}

// will be called from html and passes corresponding value of color selected
function selectColor(colorId)
{
    colorIsSelected = colorId;
    colorPicker.style.display = "none";
    addNote();
}

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
function createNote(id, content, color) 
{
    colors = ["#ffffff","#fcacac","#fffead","#a4faa2","#a3fdff","#cfa8ff","#faa0eb"];

    // creates a new textarea element
    const element = document.createElement("textarea");

    // adds 'note' to classList for CSS to recognise
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty note";

    color = colors[colorIsSelected];
    element.backgroundColor = color;
    element.style.backgroundColor = colors[colorIsSelected];

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
    if(colorIsSelected == null)
    {
        openColors();
    }
    else
    {
        const notes = getNotes();

        // sets id to random number
        const noteObject = {
            id: Math.floor(Math.random() * 100000),
            content: "",
            backgroundColor: ""
        };
    
        // creates new note element
        const noteElement = createNote(noteObject.id, noteObject.content, noteObject.backgroundColor);
    
        // puts note before the add note button
        notesContainer.insertBefore(noteElement, addNoteButton);

        noteObject.backgroundColor = noteElement.backgroundColor;

        console.log(noteObject.backgroundColor);

        notes.push(noteObject);
        saveNotes(notes);
        colorIsSelected = null;
    }
}

// editing the note
function updateNote(id, newContent)
{
    const notes = getNotes();

    // filters the note by id
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    targetNote.backgroundColor = colorIsSelected;
    saveNotes(notes);
}

// deletes the note
function deleteNote(id, element)
{
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}