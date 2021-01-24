const todoForm = document.querySelector("#todoForm"),
  todoInput = todoForm.querySelector("#todoInput"),
  ifTodoNull = todoForm.querySelector("#ifTodoNull"),
  todoList = document.querySelector("#todoList"),
  routineList = document.querySelector("#routineList"),
  doNow = document.querySelector("#doNow"),
  recordButton = document.querySelector("#recordButton"),
  stopRecordButton = document.querySelector("#stopRecordButton"),
  besideRecord = document.querySelector("#besideRecord"),
  timeDoNow = document.querySelector("#timeDoNow"),
  timeline = document.querySelector("#timeline"),
  chart = document.querySelector("#chart"),
  timelineBtn = document.querySelector("#timelineBtn"),
  chartBtn = document.querySelector("#chartBtn");

const todos = [],
  routines = [],
  timelines = [];
let lastClicked,
  currentClicked,
  nowRecord,
  recordBool = false,
  index = 0,
  recordCheck,
  timeBool = false,
  lastTimeline = true,
  firstEnter,
  timelineArray,
  timelineCheck,
  timeInterval = setInterval(function () {
    if (timeBool === true) {
      timeSpendHandler();
    } else {
    }
  }, 1000);

function todoSubmitHandler(e) {
  e.preventDefault();
  const todoValue = todoInput.value;
  if (todoValue === "") {
    ifTodoNull.style.color = "violet";
    ifTodoNull.innerText = `Let us know your todo, ${nameCheck}.`;
  } else {
    ifTodoNull.innerText = "";
    addTodo(todoValue);
  }
  todoInput.value = "";
}

function loadClickHandler() {
  recordButton.style.display = "none";
  stopRecordButton.style.display = "inline";
  nowRecord = currentClicked.querySelector("span").innerText;
  besideRecord.innerText = `Youre ${nowRecord} right now!`;
  doNow.style.display = "block";
  doNow.innerText = nowRecord;
  recordBool = true;
  timeBool = true;
}
function timelineLoad(object) {
  if (object === undefined) {
    console.log(1);
  } else {
    const timelineList = document.createElement("li"),
      timelineSpan = document.createElement("span");
    if (object.bool) {
      timelineSpan.innerText = `You started ${object.text} at ${
        object.hour < 10 ? `0${object.hour}` : object.hour
      }:${object.minute < 10 ? `0${object.minute}` : object.minute}!`;
    } else {
      timelineSpan.innerText = `You finished ${object.text} at ${
        object.hour < 10 ? `0${object.hour}` : object.hour
      }:${object.minute < 10 ? `0${object.minute}` : object.minute}!`;
    }
    timelineList.appendChild(timelineSpan);
    timeline.appendChild(timelineList);
    const timelineObject = {
      text: object.text,
      hour: object.hour,
      minute: object.minute,
      time: object.time,
      bool: object.bool,
    };
    timelines.push(timelineObject);
    saveTimeline();
    lastTimeline = object;
  }
}

function timelineHandler(bool) {
  const timelineTime = new Date();
  const timelineList = document.createElement("li"),
    timelineSpan = document.createElement("span");
  if (bool) {
    timelineSpan.innerText = `You started ${nowRecord} at ${
      timelineTime.getHours() < 10
        ? `0${timelineTime.getHours()}`
        : timelineTime.getHours()
    }:${
      timelineTime.getMinutes() < 10
        ? `0${timelineTime.getMinutes()}`
        : timelineTime.getMinutes()
    }!`;
  } else {
    timelineSpan.innerText = `You finished ${nowRecord} at ${
      timelineTime.getHours() < 10
        ? `0${timelineTime.getHours()}`
        : timelineTime.getHours()
    }:${
      timelineTime.getMinutes() < 10
        ? `0${timelineTime.getMinutes()}`
        : timelineTime.getMinutes()
    }!`;
  }
  timelineList.appendChild(timelineSpan);
  timeline.appendChild(timelineList);
  const timelineObject = {
    text: nowRecord,
    hour: timelineTime.getHours(),
    minute: timelineTime.getMinutes(),
    time: timelineTime.getTime(),
    bool,
  };
  timelines.push(timelineObject);
  saveTimeline();
}

function saveTimeline() {
  const timelineDb = JSON.stringify(timelines);
  ls.setItem("timeline", timelineDb);
}

function timeSpendHandler() {
  const timeSpend = new Date().getTime() - recordCheck.time;
  const spendMinute = Math.floor(timeSpend / 60000);
  const spendSecond = Math.floor((timeSpend % 60000) / 1000);
  timeDoNow.innerText = `Youre doing ${nowRecord} for ${spendMinute}minutes ${spendSecond}seconds`;
  timeDoNow.style.display = "block";
}
function listClickHandler(e) {
  if (recordBool === false) {
    currentClicked = e.target.parentNode;
    currentClicked.classList.toggle("clicked");
    if (lastClicked && lastClicked !== currentClicked) {
      lastClicked.classList.remove("clicked");
    }
    lastClicked = e.target.parentNode;
    if (currentClicked.classList[1] === "clicked") {
      nowRecord = currentClicked.querySelector("span").innerText;
      doNow.style.display = "block";
      doNow.innerText = nowRecord;
      recordButton.style.display = "inline";
      besideRecord.innerText = `You choose ${nowRecord}!`;
    } else {
      besideRecord.innerText = "Click record button in the list!";
      doNow.style.display = "none";
      recordButton.style.display = "none";
      stopRecordButton.style.display = "none";
    }
  } else {
    besideRecord.innerText = "You have to stop recording first!";
    besideRecord.style.color = "violet";
  }
}
function recordActivate() {
  recordButton.style.display = "none";
  stopRecordButton.style.display = "inline";
  besideRecord.innerText = `Youre ${nowRecord} right now!`;
  recordBool = true;
  const time = new Date().getTime();
  const recordId = parseInt(currentClicked.id);
  const trCheck = currentClicked.classList[0];
  let now = "no";
  let recordIndex;
  if (trCheck === "todo") {
    now = "todo";
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === recordId) {
        recordIndex = i;
      }
    }
  } else if (trCheck === "routine") {
    now = "routine";
    for (let i = 0; i < routines.length; i++) {
      if (routines[i].id === recordId) {
        recordIndex = i;
      }
    }
  }
  let recordObject = {
    time,
    now,
    recordIndex,
  };
  recordObject = JSON.stringify(recordObject);
  ls.setItem("record", recordObject);
  recordCheck = JSON.parse(ls.getItem("record"));
  timeInterval;
  timeBool = true;
  timelineHandler(true);
}
function recordDisactivate() {
  recordButton.style.display = "inline";
  stopRecordButton.style.display = "none";
  besideRecord.innerText = `You choose ${nowRecord}!`;
  besideRecord.style.color = "white";
  recordBool = false;
  timeBool = false;
  ls.removeItem("record");
  timeDoNow.style.display = "none";
  timelineHandler(false);
}
function addTodo(text, clickedCheck) {
  const time = new Date();
  index += 1;
  const id = time.getTime() + index;
  const li = document.createElement("li"),
    span = document.createElement("span"),
    delBtn = document.createElement("button"),
    infiBtn = document.createElement("button"),
    recordBtn = document.createElement("button"),
    todoBtn = document.createElement("button");
  span.innerText = text;
  delBtn.id = "delete";
  delBtn.innerText = "❌";
  todoBtn.innerText = "✔️";
  todoBtn.addEventListener("click", todoBtnPressed);
  delBtn.addEventListener("click", deleteList);
  infiBtn.innerText = "♾️";
  infiBtn.addEventListener("click", changeList);
  recordBtn.id = "record";
  recordBtn.innerText = "⏺️";
  recordBtn.addEventListener("click", listClickHandler);
  li.appendChild(todoBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(recordBtn);
  li.appendChild(infiBtn);
  li.classList.add("todo");
  if (clickedCheck) {
    li.classList.add("clicked");
    lastClicked = li;
    currentClicked = li;
  }
  li.id = id;
  todoList.appendChild(li);
  const todoObject = {
    text,
    id,
  };
  todos.push(todoObject);
  saveTodos();
  saveRoutines();
}

function todoBtnPressed(e) {
  const parent = e.target.parentNode;
  const span = parent.querySelector("span");
  span.classList.toggle("todoCheck");
}

function addRoutine(text, clickedCheck) {
  const time = new Date();
  index += 1;
  const id = time.getTime() + index;
  const li = document.createElement("li"),
    span = document.createElement("span"),
    delBtn = document.createElement("button"),
    infiBtn = document.createElement("button"),
    recordBtn = document.createElement("button");
  span.innerText = text;
  delBtn.id = "delete";
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteList);
  infiBtn.innerText = "✅";
  infiBtn.addEventListener("click", changeList);
  recordBtn.id = "record";
  recordBtn.innerText = "⏺️";
  recordBtn.addEventListener("click", listClickHandler);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(recordBtn);
  li.appendChild(infiBtn);
  li.classList.add("routine");
  if (clickedCheck) {
    li.classList.add("clicked");
    currentClicked = li;
    lastClicked = li;
  }
  li.id = id;
  routineList.appendChild(li);
  const routineObject = {
    text,
    id,
  };
  routines.push(routineObject);
  saveTodos();
  saveRoutines();
}

function changeList(e) {
  const listClass = e.target.parentNode.classList[0];
  const clickedCheck = e.target.parentNode.classList[1];
  const listText = e.target.parentNode.querySelector("span").innerText;
  if (listClass === "todo") {
    if (clickedCheck) {
      deleteList(e);
      addRoutine(listText, true);
    } else {
      deleteList(e);
      addRoutine(listText, false);
    }
  } else {
    if (clickedCheck) {
      addTodo(listText, true);
      deleteList(e);
    } else {
      addTodo(listText, false);
      deleteList(e);
    }
  }
}

function deleteList(e) {
  const List = e.target.parentNode;
  const listClass = List.classList[0];
  const deletedId = parseInt(List.id);
  if (listClass === "todo") {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === deletedId) {
        todos.splice(i, 1);
        saveTodos();
      }
    }
    todoList.removeChild(List);
  } else {
    for (let i = 0; i < routines.length; i++) {
      if (routines[i].id === deletedId) {
        routines.splice(i, 1);
        saveRoutines();
      }
    }
    routineList.removeChild(List);
  }
}

function saveTodos() {
  const saveTodos = JSON.stringify(todos);
  ls.setItem("todos", saveTodos);
}

function saveRoutines() {
  const saveRoutines = JSON.stringify(routines);
  ls.setItem("routines", saveRoutines);
}

function loadChart() {
  timelineCheck = JSON.parse(ls.getItem("timeline"));
  timelineArray = [];
  if (timelineCheck) {
    for (let i = 0; i < timelineCheck.length; ) {
      if (
        timelineCheck[i + 2] &&
        timelineCheck[i].text === timelineCheck[i + 2].text
      ) {
        let forI = i;
        timelineArray.push(timelineCheck[i]);
        timelineArray.push(timelineCheck[i + 3]);
        i = forI + 4;
      } else {
        let forI = i;
        timelineArray.push(timelineCheck[i]);
        timelineArray.push(timelineCheck[i + 1]);
        i = forI + 2;
      }
    }
  }
}
function loadLs() {
  firstEnter = JSON.parse(ls.getItem("first"));
  if (!firstEnter || new Date().getDay() !== firstEnter.day) {
    ls.removeItem("todos");
    ls.removeItem("timeline");
    const time = new Date();
    const day = time.getDay();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const gettime = time.getTime();
    let firstObject = {
      day,
      hour,
      minute,
      time: gettime,
    };
    firstObject = JSON.stringify(firstObject);
    ls.setItem("first", firstObject);
    firstEnter = JSON.parse(ls.getItem("first"));
  }
  const routinesCheck = JSON.parse(ls.getItem("routines"));
  const todosCheck = JSON.parse(ls.getItem("todos"));
  recordCheck = JSON.parse(ls.getItem("record"));
  timelineCheck = JSON.parse(ls.getItem("timeline"));
  if (todosCheck) {
    todosCheck.forEach((todo) => {
      addTodo(todo.text);
    });
  }
  if (routinesCheck) {
    routinesCheck.forEach((routine) => {
      addRoutine(routine.text);
    });
  }
  if (recordCheck) {
    const nowIndex = recordCheck.recordIndex;
    let nowId;
    if (recordCheck.now === "todo") {
      nowId = todos[nowIndex].id;
      const nowLi = document.getElementById(nowId);
      currentClicked = nowLi;
      lastClicked = nowLi;
      nowLi.classList.add("clicked");
      loadClickHandler();
    } else {
      nowId = routines[nowIndex].id;
      const nowLi = document.getElementById(nowId);
      currentClicked = nowLi;
      lastClicked = nowLi;
      nowLi.classList.add("clicked");
      loadClickHandler();
    }
  }
  timelineArray = [];
  if (timelineCheck) {
    for (let i = 0; i < timelineCheck.length; ) {
      if (
        timelineCheck[i + 2] &&
        timelineCheck[i].text === timelineCheck[i + 2].text
      ) {
        let forI = i;
        timelineArray.push(timelineCheck[i]);
        timelineArray.push(timelineCheck[i + 3]);
        i = forI + 4;
      } else {
        let forI = i;
        timelineArray.push(timelineCheck[i]);
        timelineArray.push(timelineCheck[i + 1]);
        i = forI + 2;
      }
    }
    timelineArray.forEach((timeline) => {
      timelineLoad(timeline);
    });
  }
}

function chartOn() {
  console.log(1);
  timeline.style.display = "none";
  chart.style.display = "block";
  getChart();
}

function getChart() {
  chart.innerHTML = "";
  loadChart();
  const useRecodo = document.createElement("div");
  const date = new Date();
  const gap = date.getTime() - firstEnter.time;
  const hour = Math.floor(gap / 3600000);
  const minute = Math.floor((gap % 3600000) / 60000);
  useRecodo.innerText = `You use Recodo for ${hour}hours ${minute}minutes!`;
  chart.appendChild(useRecodo);
  if (timelineCheck) {
    const chartResult = getChartData();
    for (let i = 0; i < chartResult.length; i += 2) {
      if (chartResult[i + 1] !== undefined) {
        const div = document.createElement("div");
        const hour = Math.floor(chartResult[i + 1] / 3600000);
        const minute = Math.floor((chartResult[i + 1] % 3600000) / 60000);
        div.innerText = `You did ${chartResult[i]} for ${hour}hours ${minute}minutes`;
        chart.appendChild(div);
      }
    }
  }
}
function getChartData() {
  let chartArray = [];
  for (let i = 0; i < timelineArray.length; i += 2) {
    chartArray.push(timelineArray[i].text);
    if (timelineArray[i + 1] !== undefined) {
      chartArray.push(timelineArray[i + 1].time - timelineArray[i].time);
    }
  }
  let chartResultArray = [];
  chartResultArray.push(chartArray[0]);
  chartResultArray.push(chartArray[1]);
  for (let i = 2; i < chartArray.length; i += 2) {
    for (let j = 0; j < chartResultArray.length; j += 2) {
      if (chartArray[i] === chartResultArray[j]) {
        chartResultArray[j + 1] += chartArray[i + 1];
        j += chartResultArray.length;
      } else {
        if (j === chartResultArray.length - 2) {
          chartResultArray.push(chartArray[i]);
          chartResultArray.push(chartArray[i + 1]);
          j += 2;
        }
      }
    }
  }
  return chartResultArray;
}
function timelineOn() {
  chart.style.display = "none";
  timeline.style.display = "block";
}

function todoInit() {
  recordButton.addEventListener("click", recordActivate);
  stopRecordButton.addEventListener("click", recordDisactivate);
  todoForm.addEventListener("submit", todoSubmitHandler);
  timelineBtn.addEventListener("click", timelineOn);
  chartBtn.addEventListener("click", chartOn);
  loadLs();
}

todoInit();
