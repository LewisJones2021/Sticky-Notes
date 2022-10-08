const notesContainer = document.getElementById('app');
const addNoteButton = notesContainer.querySelector('.add-note');

// when the page loads, get all notes to display//
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  //in sert new note before the button//
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener('click', () => addNote());

//get all of the notes stored in local storage//
function getNotes() {
  return JSON.parse(localStorage.getItem('stickynotes-notes') || '[]');
}
//save notes to the local storage//
function saveNotes(notes) {
  localStorage.setItem('stickynotes-notes', JSON.stringify(notes));
}

//build a new element to represnt a note//
function createNoteElement(id, content) {
  const element = document.createElement('textarea');

  element.classList.add('note');
  element.value = content;
  element.placeholder = 'Add a new note here!';
  //when the note is edited, call the 'updateNote func to update the id & the value//
  element.addEventListener('change', () => {
    updateNote(id, element.value);
  });

  //check to see if the user wants to delete first//
  element.addEventListener('dblclick', () => {
    const doDelete = confirm('Are you sure you want to delete?');

    if (doDelete) {
      deleteNote(id, element);
    }
  });
  return element;
}

//add a new note//
function addNote() {
  const notes = getNotes();
  //generate a new id up to 100000//
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    //default content of a new note//
    content: '',
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  //append new notes to the array//

  notes.push(noteObject);
  saveNotes(notes);
}

//update a note//
function updateNote(id, newContent) {
  const notes = getNotes();
  //filter through the notes updated to match the id//
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

//delete a note//
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}
