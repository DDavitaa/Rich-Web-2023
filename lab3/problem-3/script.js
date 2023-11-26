
const input = document.querySelector("input");
const create_btn = document.getElementById("create_note");
const error = document.getElementById("error");
const list_notes = document.getElementById("list_notes");
const note = document.getElementsByClassName("note");
const delete_btn = document.getElementsByClassName("delete_note");

const input$ = rxjs.fromEvent(input, "input").pipe(
    rxjs.map(event => event.target.value)
);

const create$ = rxjs.fromEvent(create_btn, "click");
//const delete$ = rxjs.fromEvent(delete_btn, "click");
const delete$ = rxjs.fromEvent(delete_btn, "click").pipe(
    rxjs.map(event => event.target.id)
);

let notes = [];
let id = 1;


create$.subscribe(() => {

    const number = parseInt(input.value);
    let newNote;
    if(id == 1) {
        if (number) {
            error.style.display = "block";
        }
        else {
            newNote = new Note(id, number);
            createNote(newNote, number)
            id+=1;
        }
    }
    else {
        newNote = new Note(id, number);
        createNote(newNote, number)
        id+=1;
    }
    
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