document.addEventListener("DOMContentLoaded", loadCardsFromLocalStorage);
let cardNotes = [];
let currentSelectedCardID = null;
let currentSelectedCard = {};

function loadCardsFromLocalStorage() {
  console.log(cardNotes); //Methode um ein JSON String in Objekt/Array umzuwandeln
  cardNotes = JSON.parse(localStorage.getItem("cardNotes")) || [];
  cardNotes.forEach((element) => {
    console.log(element);
    appendCard(element);
  });
}

function saveCardsToLocalStorage() {
  console.log(cardNotes);
  console.log(JSON.stringify(cardNotes));
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

//clear the input fields
function createNewNote() {
  getInputHeader().value = "";
  getInputTextArea().value = "";
}

//create a new card with values and checks input before append
function createNewCard() {
  const randomID = Math.floor(Math.random() * 1000000);

  const getTimestamp = () => new Date().toLocaleString("de-DE");
  const timeStamp = getTimestamp();

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
  const card = document.createElement("div");
  card.classList.add("noteCard");
  card.id = newCard.id;

  card.addEventListener("click", () => {
    selectCard(newCard.id);
  });

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("cardHeader");
  cardHeader.innerHTML = newCard.header;

  const cardText = document.createElement("div");
  cardText.classList.add("cardText");
  cardText.innerHTML = newCard.text;

  const cardDate = document.createElement("div");
  cardDate.classList.add("cardDate");
  cardDate.innerHTML = newCard.dateStamp;

  card.appendChild(cardHeader);
  card.appendChild(cardText);
  card.appendChild(cardDate);
  document.querySelector(".cardWrapper").appendChild(card);
  saveCardsToLocalStorage();
  createNewNote();
}

//select a card and shows the current content
function selectCard(id) {
  const selectedCard = cardNotes.find((card) => card.id == id);
  getInputHeader().value = selectedCard.header;
  getInputTextArea().value = selectedCard.text;
  currentSelectedCardID = selectedCard.id;
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
