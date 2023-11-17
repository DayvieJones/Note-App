const cardNotes = [];

const randomID = Math.floor(Math.random() * 1000000);

//Time Stamp
const getTimestamp = () => new Date().toLocaleString("de-DE");
const timestamp = getTimestamp();

const newCard = {
  id: randomID,
  header: "null",
  text: "null",
  dateStamp: timestamp,
};

function createNewNote() {
  const inputHeader = document.querySelector("#inputHeader");
  inputHeader.value = "";
  const inputTextArea = document.querySelector("#inputTextArea");
  inputTextArea.value = "";
}

function saveCurrentInput() {
  const cardHeader = document.querySelector(".cardHeader");
  const cardText = document.querySelector(".cardText");
  const cardDate = document.querySelector(".cardDate");

  const inputHeader = document.querySelector("#inputHeader").value;
  cardHeader.innerHTML = inputHeader;
  const inputTextArea = document.querySelector("#inputTextArea").value;
  cardText.innerHTML = inputTextArea;
  cardDate.innerHTML = timestamp;
}

function appendCard() {
  console.log(newCard.dateStamp);
  const card = document.createElement("div");
  card.classList.add("noteCard");

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("cardHeader");

  const cardText = document.createElement("div");
  cardText.classList.add("cardText");

  const cardDate = document.createElement("div");
  cardDate.classList.add("cardDate");
}
