
const input = document.querySelector("input");
const create_btn = document.getElementById("create_note");
const error = document.getElementById("error");
const error2 = document.getElementById("error2");
const list_notes = document.getElementById("list_notes");
const note = document.getElementsByClassName("note");
const delete_btn = document.getElementsByClassName("delete_note");

const input$ = rxjs.fromEvent(input, "input").pipe(
    rxjs.map(event => event.target.value)
);

let doCreate = true;

const create$ = rxjs.fromEvent(create_btn, "click").pipe(
    rxjs.filter(() => doCreate)   
);
//const delete$ = rxjs.fromEvent(delete_btn, "click");
const delete$ = rxjs.fromEvent(delete_btn, "click").pipe(
    rxjs.map(event => event.target.id)
);

let notes = [];
let id = 1;

input$.subscribe((value) => {
    if(id == 1) {
        if (value) {
            error.style.display = "block";
            doCreate = false;
        }
        else if(!value) {
            error.style.display = "none";
            doCreate = true;
        }
    }
    else {
        error.style.display = "none";

        let found = false;
        for(let i = 0; i < notes.length; i++) {
            console.log(notes[i].id);
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
    deleteNote.id = newNote.id;

    divNote.appendChild(pNote);
    divNote.appendChild(deleteNote);
    list_notes.appendChild(divNote);
}


class Note {
    constructor(id, parentID) {
        this.id = id;
        this.parentID = parentID;

        delete$.subscribe((deletedId) => {
            console.log("delete");

            if (this.id === deletedId || this.parent === deletedId) {
                console.log("delete");
                this.delete();
                
            }
        });
    }

    delete() {

    }
}