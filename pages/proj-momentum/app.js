const timeS = document.getElementById("time"),
  greeting = document.querySelector("#greeting"),
  nameForm = document.querySelector("#nameForm"),
  nameWhat = document.querySelector("#nameWhat");
(nameInput = document.querySelector("#nameInput")),
  (focus = document.querySelector("#focus")),
  (focusForm = document.querySelector("#focusForm")),
  (focusInput = document.querySelector("#focusInput")),
  (focusImg = document.querySelector("#focus > img")),
  (focusText = document.querySelector("#focus > span")),
  (quote = document.getElementById("quoteContent")),
  (author = document.getElementById("author")),
  (todoWrapper = document.querySelector("#todoWrapper")),
  (dtdContainer = document.querySelector("#dtdContainer"));
(quoteWrapper = document.querySelector("#quoteWrapper")),
  (refreshWrapper = document.querySelector("#refresh")),
  (bgInfoWrapper = document.querySelector("#bgInfo")),
  (clockWrapper = document.querySelector("#clock")),
  (HIDDEN_CLASSNAME = "hidden"),
  (USERNAME_KEY = "username"),
  (CHECKED_KEY = "checked"),
  (STRIKETHROUGH_KEY = "through"),
  (FOCUS_KEY = "focus"),
  (UNCHECKED_PATH = "./icon/unchecked.png"),
  (CHECKED_PATH = "./icon/checked.png"),
  (DATE_KEY = "date");

//clock code

function displayTime() {
  setTimeout(displayTime, 1000);
  const dateTime = new Date();
  let time = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  timeS.innerHTML = time;
}

displayTime();

localStorage.setItem(DATE_KEY, new Date().getDate());
const savedDate = localStorage.getItem(DATE_KEY);

//name input

function onNameSubmit(event) {
  //preventDefault for input data going to action src
  event.preventDefault();

  //make sure form is hidden
  nameForm.classList.add(HIDDEN_CLASSNAME);

  //sets username in local storage with the "name input" value
  const username = nameInput.value;
  localStorage.setItem(USERNAME_KEY, username);

  //display name and directs for focus form to be visible (unhide)
  displayGreetings(username);
  focusForm.classList.remove(HIDDEN_CLASSNAME);
  todoWrapper.classList.remove(HIDDEN_CLASSNAME);
  quoteWrapper.classList.remove(HIDDEN_CLASSNAME);
  refreshWrapper.classList.remove(HIDDEN_CLASSNAME);
  bgInfoWrapper.classList.remove(HIDDEN_CLASSNAME);
  clockWrapper.classList.remove(HIDDEN_CLASSNAME);
  dtdContainer.classList.add(HIDDEN_CLASSNAME);

  focusForm.addEventListener("submit", onFocusSubmit);
}

function displayGreetings(username) {
  //sets greeting based on time

  const greetArr = ["evening", "morning", "afternoon"];
  const timeNow = new Date().getHours();
  let greetTxt;
  if ((timeNow >= 0 && timeNow <= 5) || timeNow >= 19) {
    greetTxt = greetArr[0];
  } else if (timeNow >= 6 && timeNow <= 11) {
    greetTxt = greetArr[1];
  } else if (timeNow >= 12 && timeNow <= 18) {
    greetTxt = greetArr[2];
  }
  //greeting string
  greeting.innerHTML = `Good ${greetTxt}, ${username}.`;
  //display greeting by removing hidden class
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  nameForm.classList.remove(HIDDEN_CLASSNAME);
  nameForm.addEventListener("submit", onNameSubmit);
} else {
  displayGreetings(savedUsername);
  dtdContainer.classList.add(HIDDEN_CLASSNAME);
  todoWrapper.classList.remove(HIDDEN_CLASSNAME);
  quoteWrapper.classList.remove(HIDDEN_CLASSNAME);
  refreshWrapper.classList.remove(HIDDEN_CLASSNAME);
  bgInfoWrapper.classList.remove(HIDDEN_CLASSNAME);
  clockWrapper.classList.remove(HIDDEN_CLASSNAME);
}

//focus

//sets checked attribute in localStorage, 0 = unchecked (undone yet), 1 = checked (strikethrough)

let checkedNow = localStorage.getItem(CHECKED_KEY);

function focusBox() {
  checkedNow = localStorage.getItem(CHECKED_KEY);

  if (checkedNow === null || checkedNow === "0") {
    localStorage.setItem(CHECKED_KEY, "1");
  } else if (checkedNow === "1") {
    localStorage.setItem(CHECKED_KEY, "0");
  }
  displayFocus();
}

focusImg.addEventListener("click", focusBox);

function onFocusSubmit(event) {
  event.preventDefault();
  focusForm.classList.add(HIDDEN_CLASSNAME);

  const newFocus = focusInput.value;
  localStorage.setItem(FOCUS_KEY, newFocus);
  localStorage.setItem(DATE_KEY, new Date().getDate());

  displayFocus();
}

function displayFocus() {
  checkedNow = localStorage.getItem(CHECKED_KEY);

  if (checkedNow === null || checkedNow === "0") {
    focusImg.src = UNCHECKED_PATH;
    focus.classList.remove(STRIKETHROUGH_KEY);
  } else if (checkedNow === "1") {
    focusImg.src = CHECKED_PATH;
    focus.classList.add(STRIKETHROUGH_KEY);
  }
  focusText.innerText = localStorage.getItem(FOCUS_KEY);

  today.classList.remove(HIDDEN_CLASSNAME);
  focus.classList.remove(HIDDEN_CLASSNAME);
}

//remove if new day

if (savedDate !== String(new Date().getDate())) {
  localStorage.removeItem(FOCUS_KEY);
}

const savedFocus = localStorage.getItem(FOCUS_KEY);

if (savedUsername === null && savedFocus === null) {
  today.classList.add(HIDDEN_CLASSNAME);
  focus.classList.add(HIDDEN_CLASSNAME);
} else if (savedUsername !== null && savedFocus === null) {
  focusForm.classList.remove(HIDDEN_CLASSNAME);
  focusForm.addEventListener("submit", onFocusSubmit);
} else {
  displayFocus();
}

//todolist code

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const doneToDoList = document.getElementById("done-list");
const doneButton = document.querySelector("#showDone-button > img");

const TODOS_KEY = "todos";
const DONETODOS_KEY = "doneTodos";
const DONEOPEN_KEY = "doneOpen";

let toDos = [];
let doneToDos = [];

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function saveDTDs() {
  localStorage.setItem("donetodos", JSON.stringify(doneToDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;

  //add removed item to done to do list array and convert to JSON before
  const spice = event.target.nextSibling.innerText;
  const newDTD = spice;
  const newDTDObj = {
    text: newDTD,
    id: Date.now(),
  };
  doneToDos.push(newDTDObj);
  localStorage.setItem("donetodos", JSON.stringify(doneToDos));

  //remove item from to do list
  li.remove();

  //update the toDos array without the removed li element
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));

  //save the updated atodo array to the local storage
  saveToDos();
  displayParsedDone();
}

function displayToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("img");
  button.src = UNCHECKED_PATH;
  button.classList.add("todocheck");
  li.appendChild(button);
  li.appendChild(span);
  button.addEventListener("click", deleteToDo);
  toDoList.appendChild(li);
}

function onToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  saveToDos();
  displayToDo(newTodoObj);
}

toDoForm.classList.remove(HIDDEN_CLASSNAME);
toDoForm.addEventListener("submit", onToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(displayToDo);
}

const savedDTDs = localStorage.getItem("donetodos");

if (savedDTDs !== null) {
  const parsedDTDs = JSON.parse(savedDTDs);
  doneToDos = parsedDTDs;
  parsedDTDs.forEach(displayItems);
}

doneButton.addEventListener("click", openWindowDone);

function openWindowDone() {
  openWindow(DONEOPEN_KEY, dtdContainer);
  displayParsedDone();
}

function displayParsedDone() {
  doneToDoList.innerHTML = "";
  const parsedDone = JSON.parse(localStorage.donetodos);
  doneToDos = parsedDone;
  parsedDone.forEach(displayItems);
}

function displayItems(dtd) {
  let li = document.createElement("li");
  li.id = dtd.id;
  console.log("success");
  let span = document.createElement("span");
  span.innerText = dtd.text;
  let time = document.createElement("span");

  let timeAgo = Date.now() - parseInt(dtd.id);

  if (timeAgo <= 60000) {
    timeText = "1 min ago";
  } else if (timeAgo < 3600000) {
    let diff = Math.floor(timeAgo / 60000);
    timeText = diff + " mins ago";
  } else if (timeAgo < 7200000) {
    timeText = "1 hr ago";
  } else if (timeAgo < 86400000) {
    let diff = Math.floor(timeAgo / 3600000);
    timeText = diff + " hrs ago";
  } else {
    timeText = "more than a day ago";
  }

  time.innerText = timeText;
  let button = document.createElement("img");
  let deleteButton = document.createElement("img");
  deleteButton.src = "icon/trashcan_icon.svg";
  button.src = CHECKED_PATH;
  span.classList.add("through");
  time.classList.add("timeAgo");
  deleteButton.classList.add("icon");
  deleteButton.addEventListener("click", deleteDTD);
  button.classList.add("iconWhite");
  li.appendChild(button);
  li.appendChild(span);

  li.appendChild(time);
  li.appendChild(deleteButton);
  doneToDoList.append(li);
  displayDone();
}

function displayDone() {
  displayOption(DONEOPEN_KEY, dtdContainer);
}

function deleteDTD(event) {
  const li = event.target.parentElement;
  //remove item from to do list
  li.remove();

  //update the donetoDos array without the removed li element
  doneToDos = doneToDos.filter((dtd) => dtd.id !== parseInt(li.id));

  //save the updated atodo array to the local storage
  saveDTDs();
}

//modified general function

function openWindow(xKEY, elementX) {
  let openOrClosed = localStorage.getItem(xKEY);

  if (openOrClosed === null || openOrClosed === "0") {
    localStorage.setItem(xKEY, "1");
  } else if (openOrClosed === "1") {
    localStorage.setItem(xKEY, "0");
  }

  displayOption(xKEY, elementX);
}

function displayOption(yKEY, elementY) {
  let openOrClosed = localStorage.getItem(yKEY);

  if (openOrClosed === null || openOrClosed === "0") {
    elementY.classList.add("hidden");
  } else if (openOrClosed === "1") {
    elementY.classList.remove("hidden");
  }
}

////quote code
let quotes = [
  {
    quote: "FRESH BEANS!",
    author: "Naomi Abiah",
  },
  {
    quote:
      "Never ask an elf for help; they might decide your better off dead, eh?",
    author: "Christopher Paolini, Eldest ",
  },
  {
    quote: "I'm about as intimidating as a butterfly.",
    author: "Dan Howell",
  },
  {
    quote:
      "Not that I can think of. In fact, I have never met anyone who did not like gargoyles.",
    author: "Shayla Orick",
  },
  {
    quote: "Hand me my pants.",
    author: " Michael Grant, Hunger ",
  },
  {
    quote:
      "Life would be a great deal easier if dead things had the decency to remain dead.",
    author: "Doug MacLeod",
  },
  {
    quote:
      "Tried to escape, to block out the fact that I was being eaten alive by arachnids. For some reason the only thing I could replace it with was the image of being eaten by tiny clowns.",
    author: "David Wong, This Book Is Full of Spiders ",
  },
  {
    quote:
      "When they figure out how to bottle up orgasms and sell them as a food additive, I'll be first in line.",
    author: "Nenia Campbell, Bound to Accept ",
  },
  {
    quote:
      "I never knew how much I missed pickles and pickle juice. It's like, an overwhelming feeling that I can't even explain.",
    author: "Snooki",
  },
  {
    quote: "Awesome ends with me; but Ugly starts with you...",
    author: "Stephan ",
  },
];

const QUOTES_KEY = "quotes";
const savedQuotes = localStorage.getItem(QUOTES_KEY);

if (savedQuotes !== null) {
  let parsedQuotes = JSON.parse(localStorage.quotes);
  quotes = parsedQuotes;
  displayQuote();
} else {
  displayQuote();
}

function displayQuote() {
  todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quote.innerText = todaysQuote.quote;
  author.innerText = todaysQuote.author;
}

///quote edit button

const quoteButton = document.querySelector("#quoteButton");
const QUOTEOPEN_KEY = "quoteOpen";
const quoteFormDiv = document.querySelector("#quoteFormWrapper");

quoteButton.addEventListener("click", openQuoteEdit);

localStorage.setItem(QUOTEOPEN_KEY, "0");
displayOption(QUOTEOPEN_KEY, quoteFormDiv);

function openQuoteEdit() {
  openWindow(QUOTEOPEN_KEY, quoteFormDiv);
}

// quote edit form
const quoteForm = document.querySelector("#quoteForm");
const quoteInput = document.querySelector("#quoteInput");
const qAuthorInput = document.querySelector("#authorInput");
const addQuoteButton = document.querySelector("#addQuoteButton");

addQuoteButton.addEventListener("click", onQuoteFormSubmit);

function onQuoteFormSubmit() {
  localStorage.setItem(QUOTEOPEN_KEY, "0");
  displayOption(QUOTEOPEN_KEY, quoteFormDiv);

  const newQuoteContent = quoteInput.value;
  const newQuoteAuthor = qAuthorInput.value;
  const newQuoteObj = {
    quote: newQuoteContent,
    author: newQuoteAuthor,
  };

  quotes.push(newQuoteObj);
  quote.innerText = newQuoteObj.quote;
  author.innerText = newQuoteObj.author;
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

//upon refresh

///bg_img 01-Stein Liland, https://www.pexels.com/photo/aurora-borealis-1933239/, Lofoten Islands, Norway
///bg_img 02-Stein Liland, https://www.pexels.com/photo/on-the-road-to-nusfjord-14188511/, Flakstad, Norway
///bg_img 03-Stein Liland, https://www.pexels.com/photo/reine-in-moskenes-municipality-lofotn-islands-13587589/, Reine, Norway
///bg_img 04-Stein Liland, https://www.pexels.com/photo/from-the-laugarvegurin-trail-on-iceland-14145821/, Laugavegur, Iceland
///bg_img 05-Stein Liland, https://www.pexels.com/photo/wintermoods-12992307/, Nordland, Norway

const BGIMAGES_KEY = "bgimages";

const bgImages = [
  {
    id: "01",
    link: "https://www.pexels.com/photo/aurora-borealis-1933239/",
    author: "Stein Liland",
    location: "Lofoten Islands, Norway",
  },

  {
    id: "02",
    link: "https://www.pexels.com/photo/on-the-road-to-nusfjord-14188511/",
    author: "Stein Liland",
    location: "Flakstad, Norway",
  },

  {
    id: "03",
    link: "https://www.pexels.com/photo/star-mountain-in-flakstad-14332493/",
    author: "Stein Liland",
    location: "Flakstad, Norway",
  },

  {
    id: "04",
    link: "https://www.pexels.com/photo/from-the-laugarvegurin-trail-on-iceland-14145821/",
    author: "Stein Liland",
    location: "Laugavegur, Iceland",
  },

  {
    id: "05",
    link: "https://www.pexels.com/photo/wintermoods-12992307/",
    author: "Stein Liland",
    location: "Nordland, Norway",
  },
];

const bgLink = document.querySelector("#bgInfo > a");
const bgLocation = document.querySelector("#bgInfo :nth-child(3)");
const bgAuthor = document.querySelector("#bgInfo :nth-child(1)");

function selectBG() {
  localStorage.setItem(BGIMAGES_KEY, JSON.stringify(bgImages));
  const selectImage = bgImages[Math.floor(Math.random() * bgImages.length)];

  let bgImageID = selectImage.id;
  bgLink.href = selectImage.link;
  bgLocation.innerText = selectImage.location;
  bgAuthor.innerText = selectImage.author;

  let bgImageCreate = document.createElement("img");
  bgImageCreate.classList.add("background");
  bgImageCreate.src = `./bg_img/${bgImageID}` + ".jpg";
  document.body.appendChild(bgImageCreate);
}

selectBG();

//refresh button

const refreshButton = document.querySelector("#refresh > img");

refreshButton.addEventListener("click", refreshNow);

function refreshNow() {
  localStorage.clear();
  window.location.reload();
}
