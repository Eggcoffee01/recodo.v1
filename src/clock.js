const clock = document.querySelector("#clock");
const feeling = document.querySelector("#feeling");

function setClock() {
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  const currentTime = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${second < 10 ? `0${second}` : second}`;
  clock.innerText = currentTime;
  if (hour > 20) {
    feeling.innerText = `Good night, ${nameCheck}!`;
  } else if (hour > 11) {
    feeling.innerText = `Good afternoon, ${nameCheck}!`;
  } else {
    feeling.innerText = `Good morning, ${nameCheck}!`;
  }
}

function clockInit() {
  setInterval(setClock, 1000);
}
