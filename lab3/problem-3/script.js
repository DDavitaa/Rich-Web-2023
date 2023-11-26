
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
    else { // if there are notes in the array
        // hide error
        error.style.display = "none";

        // boolean to keep track of whether the value in the input field is found in the notes array
        let found = false;

        // check if the value in the input field is found in the notes array
        for(let i = 0; i < notes.length; i++) {
            // if the value in the input field is found in the notes array, found is true and break out of the loop
            if(value == notes[i].id || value == "") {
                found = true;
                break;
            }
        }

        // if found is true, hide error and allow create note
        if (found) {
            error2.style.display = "none";
            doCreate = true;
        } else { // if found is false, display parent does not exist error and don't allow create note
            error2.style.display = "block";
            doCreate = false;
        }
    }
});

// subscribe to create$
create$.subscribe(() => {
    // if there is a value in the input field, convert it to a number, if not, set it to null
    const number = input.value ? parseInt(input.value) : null;

    // create new note object and assign parentID to number if there is one, otherwise assign it to null
    const newNote= new Note(id, number);

    // add new note to notes array
    notes.push(newNote);
    
    // function to create note in the DOM
    createNote(newNote, number)

    // increment id
    id+=1;
    
});

// function to create note in the DOM
function createNote(newNote, number) {
    // create div element to hold note
    const divNote = document.createElement("div");
    divNote.id = newNote.id;
    divNote.classList.add("note");

    // create p element to display note id and parent id
    const pNote = document.createElement("p");
    if (number) {
        pNote.innerHTML = `Note #${newNote.id}, child of Note #${newNote.parentID}`;
    }
    else {
        pNote.innerHTML = `Note #${newNote.id}`;
    }

    // create delete button
    const deleteNote = document.createElement("button");
    deleteNote.classList.add("delete_note");
    deleteNote.innerHTML = "Delete";

    // create observable from click event
    const deleteButton$ = rxjs.fromEvent(deleteNote, 'click').pipe(
        // get the id of the note to be deleted
        rxjs.map(() => newNote.id)
    );

    // add delete button to deleteButtons$ subject
    deleteButtons$.next(deleteButton$);

    // append elements to divNote
    divNote.appendChild(pNote);
    divNote.appendChild(deleteNote);

    // append divNote to list_notes
    list_notes.appendChild(divNote);
}

// merge all observables from deleteButtons$ subject
const delete$ = deleteButtons$.pipe(
    rxjs.mergeAll()
);

// subscribe to delete$
delete$.subscribe(id => {
    deleteNoteAndDescendants(id);
});

function deleteNoteAndDescendants(id) {
    // find the note to be deleted
    const noteIndex = notes.findIndex(note => note.id === id);

    // if the note is found, delete it and remove it from the DOM
    if (noteIndex !== -1) {
        // Remove the note from the notes array
        notes.splice(noteIndex, 1);

        // Remove the note from the DOM
        const element = document.getElementById(id);
        if (element) {
            element.remove();
        }
    }

    // find the child notes of the note to be deleted
    const childNotes = notes.filter(note => note.parentID === id);

    // recursively delete the child notes and their descendants
    childNotes.forEach(childNote => {
        deleteNoteAndDescendants(childNote.id);
    });
}

// note class
class Note {
    constructor(id, parentID) {
        this.id = id;
        this.parentID = parentID;
    }
}