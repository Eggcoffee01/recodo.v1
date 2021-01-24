const ls = window.localStorage;
const greet = document.querySelector("#greetings"),
  greetInput = greet.querySelector("input"),
  ifTextNull = greet.querySelector("#ifTextNull"),
  god = document.querySelector("#god");
let nameCheck = ls.getItem("name");

function nameSubmitHandler(e) {
  e.preventDefault();
  const word = greetInput.value;
  if (word === "") {
    ifTextNull.innerText = "Let us know your name, stranger.";
  } else {
    ls.setItem("name", word);
    indexInit();
  }
}
function indexInit() {
  nameCheck = ls.getItem("name");
  if (nameCheck) {
    greet.style.display = "none";
    backgroundInit();
    clockInit();
    god.style.display = "block";
  } else {
    greet.style.display = "block";
    bg.style.backgroundImage = "url(src/images/door.jpg)";
    bg.style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;
    window.addEventListener("resize", resized);
    greet.addEventListener("submit", nameSubmitHandler);
  }
}
indexInit();
