document.addEventListener("DOMContentLoaded", loadCardsFromLocalStorage);
const createNoteEl = document.querySelector(".createNote");
const saveNoteEl = document.querySelector(".saveNote");
const deleteNoteEl = document.querySelector(".deleteNote");

createNoteEl.addEventListener("click", createNewNote);
saveNoteEl.addEventListener("click", createNewCard);
deleteNoteEl.addEventListener("click", deleteSelectedCard);

let cardNotes = [];
let currentSelectedCardID = null;

function loadCardsFromLocalStorage() {
  //Methode um ein JSON String in Objekt/Array umzuwandeln
  cardNotes = JSON.parse(localStorage.getItem("cardNotes")) || [];
  cardNotes.forEach((element) => {
    appendCard(element);
  });
}

function saveCardsToLocalStorage() {
  localStorage.setItem("cardNotes", JSON.stringify(cardNotes));
}

//gets the input of header
function getInputHeader() {
  return document.querySelector("#inputHeader");
}

//gets the input of the Textarea
function getInputTextArea() {
  return document.querySelector("#inputTextArea");
}

function getCurrentlySelectedNote() {
  return document.querySelector(".selected-note");
}

//clear the input fields
function createNewNote() {
  getInputHeader().value = "";
  getInputTextArea().value = "";
}

//create a new card with values and checks input before append
function createNewCard() {
  const randomID = Math.floor(Math.random() * 1000000);
  const timeStamp = new Date().toLocaleString("de-DE");

  //creating the Card Object
  const newCard = {
    id: randomID,
    header: getInputHeader().value,
    text: getInputTextArea().value,
    dateStamp: timeStamp,
  };

  if (!newCard.header) {
    alert("Please write text in the header area to safe the note");
  } else if (!newCard.text) {
    alert("Please write text in the text area to safe the note");
  } else {
    cardNotes.push(newCard);
    appendCard(newCard);
  }
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
  saveCardsToLocalStorage();
  createNewNote();
}

//select a card and shows the current content
function selectCard(id) {
  const selectedCardEl = document.querySelector(`.noteCard[id="${id}"]`);
  if (selectedCardEl.classList.contains("selectedNote")) return;

  const noteEntrysElements = document.querySelectorAll(".noteCard");

  noteEntrysElements.forEach((noteEntry) => {
    noteEntry.classList.remove("selectedNote");
  });

  selectedCardEl.classList.add("selectedNote");

  //
  const selectedCard = cardNotes.find((card) => card.id == Number(id));

  if (!selectedCard) return;

  getInputHeader().value = selectedCard.header;
  getInputTextArea().value = selectedCard.text;
  // currentSelectedCardID = selectedCard.id;
}

//delete the selected card from DOM and Array "cardNotes"
function deleteSelectedCard() {
  document.getElementById(currentSelectedCardID).remove();

  const cardIndex = cardNotes.findIndex(
    (card) => card.id == currentSelectedCardID
  );
  if (cardIndex !== -1) {
    cardNotes.splice(cardIndex, 1);
  }
  saveCardsToLocalStorage();
  createNewNote();
}
