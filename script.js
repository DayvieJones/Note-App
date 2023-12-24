const createNoteEl = document.querySelector(".createNote");
const saveNoteEl = document.querySelector(".saveNote");
const deleteNoteEl = document.querySelector(".deleteNote");
const inputHeaderElement = document.querySelector("#inputHeader");
const inputTextAreaElement = document.querySelector("#inputTextArea");

const LOCAL_STORAGE_NOTES = "noteApp-Notes";

createNoteEl.addEventListener("click", clickNewNote);
saveNoteEl.addEventListener("click", clickSaveButton);
deleteNoteEl.addEventListener("click", deleteSelectedCard);

let cardNotes = [];
let currentSelectedCardID = null;

loadCardsFromLocalStorage();

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTES)) || [];
}

function loadCardsFromLocalStorage() {
  //Method to exchange a JSON String into object/array
  const cardNotes = getNotes();

  cardNotes.forEach((element) => {
    appendCard(element);
  });
}

function saveCardsToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_NOTES, JSON.stringify(cardNotes));
}

function getCurrentlySelectedNote() {
  return document.querySelector(".selectedNote");
}

//clear the input fields
function clickNewNote() {
  inputHeaderElement.value = "";
  inputTextAreaElement.value = "";

  removeSelectedClassFromAllNotes();
}

function getNextId() {
  const notes = getNotes();

  const sortedNotes = notes.sort((noteA, noteB) => noteA.id - noteB.id);

  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId < note.id) break;

    nextId = note.id + 1;
  }
  return nextId;
}

//create a new card with values and checks input before append
function clickSaveButton() {
  const header = inputHeaderElement.value;
  const text = inputTextAreaElement.value;

  if (!header) {
    alert("Please write text in the header area to safe the note");
    return;
  } else if (!text) {
    alert("Please write text in the text area to safe the note");
    return;
  }
  let currentId = undefined;

  const currentlySelectedNoteEl = getCurrentlySelectedNote();

  if (currentlySelectedNoteEl) currentId = currentlySelectedNoteEl.id;

  saveCard(text, header, Number(currentId));

  inputHeaderElement.value = "";
  inputTextAreaElement.value = "";
}

function saveCard(text, header, id = undefined) {
  console.log(id);
  //creating the Card Object
  if (!id) {
    const newCard = {
      id: getNextId(),
      header,
      text,
      dateStamp: new Date().toLocaleString("de-DE"),
    };
    cardNotes.push(newCard);
    appendCard(newCard);
  } else {
    const indexOfNoteWithId = cardNotes.findIndex((note) => note.id === id);

    if (indexOfNoteWithId > -1) {
      cardNotes[indexOfNoteWithId] = {
        id,
        header,
        text,
        dateStamp: new Date().toLocaleString("de-DE"),
      };
    }
    getCurrentlySelectedNote().remove();
    appendCard(cardNotes[indexOfNoteWithId]);

    //
  }
  saveCardsToLocalStorage();
  clickNewNote();
}

//get a created card w/ values and append these into wrapper
function appendCard(newCard) {
  const cardEl = document.createElement("div");
  cardEl.classList.add("noteCard");
  cardEl.id = newCard.id;

  cardEl.addEventListener("click", () => {
    selectCard(newCard.id);
  });

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("cardHeader");
  cardHeader.textContent = newCard.header;

  const cardText = document.createElement("div");
  cardText.classList.add("cardText");
  cardText.textContent = newCard.text;

  const cardDate = document.createElement("div");
  cardDate.classList.add("cardDate");
  cardDate.textContent = newCard.dateStamp;

  cardEl.appendChild(cardHeader);
  cardEl.appendChild(cardText);
  cardEl.appendChild(cardDate);
  document.querySelector(".cardWrapper").appendChild(cardEl);

  clickNewNote();
}

//select a card and shows the current content
function selectCard(id) {
  const selectedCardEl = document.querySelector(`.noteCard[id="${id}"]`);

  if (selectedCardEl.classList.contains("selectedNote")) return;

  removeSelectedClassFromAllNotes();

  selectedCardEl.classList.add("selectedNote");

  const selectedCard = cardNotes.find((card) => card.id == Number(id));

  if (!selectedCard) return;

  inputHeaderElement.value = selectedCard.header;
  inputTextAreaElement.value = selectedCard.text;
  currentSelectedCardID = selectedCard.id;
}

//delete the selected card from DOM and Array "cardNotes"
function deleteSelectedCard() {
  if (!currentSelectedCardID) return;

  document.getElementById(currentSelectedCardID).remove();

  const cardIndex = cardNotes.findIndex(
    (card) => card.id == currentSelectedCardID
  );
  if (cardIndex !== -1) {
    cardNotes.splice(cardIndex, 1);
  }
  saveCardsToLocalStorage();
  clickNewNote();
}

function removeSelectedClassFromAllNotes() {
  const noteCards = document.querySelectorAll(".noteCard");

  noteCards.forEach((noteCard) => {
    noteCard.classList.remove("selectedNote");
  });
}
