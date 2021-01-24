const bg = document.querySelector("body");
const imageLength = 5;

function randomBg(number) {
  bg.style.backgroundImage = `url('src/images/${number + 1}.jpg')`;
  bg.style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;
  bg.style.backgroundRepeat = "none";
}

function randomNumber() {
  const number = Math.floor(Math.random() * imageLength);
  return number;
}

function resized() {
  bg.style.backgroundSize = `${window.innerWidth}px ${window.innerHeight}px`;
}

function backgroundInit() {
  const number = randomNumber();
  window.addEventListener("resize", resized);
  randomBg(number);
}
