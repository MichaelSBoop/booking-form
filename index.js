const floorSelect = document.querySelector("#floor");
const roomSelect = document.querySelector("#room");

// Create a set of option tags inside of a select menu
function createOptions(rangeStart, rangeEnd, elementSelect) {
  for (let i = rangeStart; i <= rangeEnd; i++) {
    const newOption = new Option(i, i);
    elementSelect.appendChild(newOption);
  }
}

// Remove options from a select menu
function removeOptions(lengthLeft, parentElement) {
  parentElement.length = lengthLeft;
}

// Responsive room selection dropdown list #1
// Empty selection menu when floor changes, fill it with rooms that correspond to the current floor
// Rooms represented in order
floorSelect.addEventListener("change", (event) => {
  const roomChoice = parseInt(event.target.value);
  removeOptions(1, roomSelect);
  const roomCorresponds = (roomChoice - 3) * 10;
  createOptions(roomCorresponds + 1, roomCorresponds + 10, roomSelect);
});

//
// Responsive room selection dropdown list #2
// Rooms represented as [[11, 12, 13, 14...], [21, 22, 23, 24...], [31, 32, 33, 34...]]
//
// floorSelect.addEventListener("change", event => {
//     let choice = parseInt(event.target.value);
//     removeOptions(1, roomSelect);
//     let roomNum = new String(choice);
//     for (let i = 1; i < 10; i++) {
        // const newOption = new Option(toomNum + i, choice + i);
        // elementSelect.appendChild(newOption);
//     }
// });
//


// Room options
createOptions(1, 10, roomSelect);
// Floor options
createOptions(3, 27, floorSelect);

// Time constraints
const hoursStart = document.querySelector("#hours-start");
const minutesStart = document.querySelector("#mins-start");
const hoursEnd = document.querySelector("#hours-end");
const minutesEnd = document.querySelector("#mins-end");

// Initial fill of hours and minutes
function fillHoursOptions(hourStart, hourEnd, hourSelect) {
  for (let i = hourStart; i <= hourEnd; i++) {
    if (i - 10 < 0) {
        const newOption = new Option("0" + i, "0" + i);
        hourSelect.appendChild(newOption);
    } else {
        const newOption = new Option(i, i);
        hourSelect.appendChild(newOption);
    }
  }
}

fillHoursOptions(7, 20, hoursStart);
fillHoursOptions(8, 21, hoursEnd);

function fillMinsOptions(minuteSelect) {
  for (let i = 0; i <= 45; i += 15) {
    if (i - 10 < 0) {
        const newOption = new Option("0" + i, "0" + i);
        minuteSelect.appendChild(newOption);
    } else {
        const newOption = new Option(i, i);
        minuteSelect.appendChild(newOption);
    }
  }
}

fillMinsOptions(minutesStart);
fillMinsOptions(minutesEnd);

// Responsive adjustments for time constraints
hoursStart.addEventListener("change", (event) => {
  let hourChoice = parseInt(event.target.value);
  removeOptions(0, hoursEnd);
  fillHoursOptions(hourChoice + 1, 21, hoursEnd);
});

// To make time constraints look like this: {"timeStart": "00:00"; "timeEnd": "00:00"}
function joinTime(data) {
  data.timeStart = data.hoursStart + ":" + data.minsStart;
  delete data.hoursStart;
  delete data.minsStart;
  data.timeEnd = data.hoursEnd + ":" + data.minsEnd;
  delete data.hoursEnd;
  delete data.minsEnd;
}

// Submission window
const initSubmit = document.querySelector("#initial-submit");
const initReset = document.querySelector("#initial-reset");
const confirmSubmit = document.querySelector(".confirm");
const confirmReset = document.querySelector(".reset");

// Open window
function askConfirmation(confirmAction) {
  switch (confirmAction) {
    case "submit":
      confirmSubmit.classList.add("fade-in");
      confirmSubmit.style.display = "flex";
      initSubmit.disabled = true;
      initReset.disabled = true;
      break;
    case "reset":
      confirmReset.classList.add("fade-in");
      confirmReset.style.display = "flex";
      initSubmit.disabled = true;
      initReset.disabled = true;
      break;
    default:
      break;
  }
}

// Close window
function returnToForm(confirmAction) {
  switch (confirmAction) {
    case "submit":
      confirmSubmit.classList.remove("fade-in");
      confirmSubmit.style.display = "none";
      initSubmit.disabled = false;
      initReset.disabled = false;
      break;
    case "reset":
      confirmReset.classList.remove("fade-in");
      confirmReset.style.display = "none";
      initSubmit.disabled = false;
      initReset.disabled = false;
      break;
    default:
      break;
  }
}

function customReset() {
  removeOptions(1, roomSelect);
  removeOptions(0, hoursEnd);
  createOptions(1, 10, roomSelect);
  fillHoursOptions(8, 21, hoursEnd);
}

// Recieve form data, convert it to JSON, log and reset the form
function sendData(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  joinTime(data);
  const result = JSON.stringify(data);
  console.log(result);
  customReset();
  let formReset = document.getElementsByTagName("form")[0];
  formReset.reset();
}
