
// get DOM elements
const input = document.querySelector("input");
const create_btn = document.getElementById("create_note");
const error = document.getElementById("error");
const error2 = document.getElementById("error2");
const list_notes = document.getElementById("list_notes");

// create observable from input event
const input$ = rxjs.fromEvent(input, "input").pipe(
    // get the value of the input field
    rxjs.map(event => event.target.value)
);

// boolean to keep track of whether the note can be created or not
let doCreate = true;

// create observable from click event
const create$ = rxjs.fromEvent(create_btn, "click").pipe(
    // if doCreate is true, create the note
    rxjs.filter(() => doCreate)   
);

// subject to keep track of delete button clicks
const deleteButtons$ = new rxjs.Subject();

// array to keep track of notes
let notes = [];

// id of the next note to be created
let id = 1;

// subscribe to input$
input$.subscribe((value) => {
    // if the input field is empty, display cannot assign parent to first note
    if(notes.length == 0) {
        // if there is a value in the input field, display error and don't allow create note
        if (value) {
            error.style.display = "block";
            doCreate = false;
        }
        // if the input field is empty, hide error and allow create note
        else if(!value) {
            error.style.display = "none";
            doCreate = true;
        }
    }
    else {
        error.style.display = "none";

        let found = false;
        for(let i = 0; i < notes.length; i++) {
            if(value == notes[i].id || value == "") {
                found = true;
                break;
            }
        }

        if (found) {
            error2.style.display = "none";
            doCreate = true;
        } else {
            error2.style.display = "block";
            doCreate = false;
        }
    }
});

create$.subscribe(() => {

    const number = input.value ? parseInt(input.value) : null;
    let newNote;
    newNote = new Note(id, number);
    notes.push(newNote);
    console.log(notes);
    createNote(newNote, number)
    id+=1;
    
});

function createNote(newNote, number) {
    const divNote = document.createElement("div");
    divNote.id = newNote.id;
    divNote.classList.add("note");
    const pNote = document.createElement("p");
    if (number) {
        pNote.innerHTML = `Note #${newNote.id}, child of Note #${newNote.parentID}`;
    }
    else {
        pNote.innerHTML = `Note #${newNote.id}`;
    }
    const deleteNote = document.createElement("button");
    deleteNote.classList.add("delete_note");
    deleteNote.innerHTML = "Delete";

    const deleteButton$ = rxjs.fromEvent(deleteNote, 'click').pipe(
        rxjs.map(() => newNote.id)
    );

    deleteButtons$.next(deleteButton$);

    divNote.appendChild(pNote);
    divNote.appendChild(deleteNote);
    list_notes.appendChild(divNote);
}

const delete$ = deleteButtons$.pipe(
    rxjs.mergeAll()
);


delete$.subscribe(id => {
    console.log(`Deleting note with id: ${id}`);
    deleteNoteAndDescendants(id);
});

function deleteNoteAndDescendants(id) {
    // Find and delete the note with the given id
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
        const element = document.getElementById(id);
        if (element) {
            element.remove();
        } else {
            console.log(`Element with id: ${id} not found in the DOM.`);
        }
    } else {
        console.log(`Note with id: ${id} not found in the notes array.`);
    }

    // Find any notes that have the deleted note as their parent
    const childNotes = notes.filter(note => note.parentID === id);
    childNotes.forEach(childNote => {
        // Recursively delete the child note and its descendants
        deleteNoteAndDescendants(childNote.id);
    });
}

class Note {
    constructor(id, parentID) {
        this.id = id;
        this.parentID = parentID;
    }
}