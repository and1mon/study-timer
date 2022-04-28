const timer = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const skipButton = document.getElementById("skip-button");
const status = document.getElementById("status");
const openModalButton = document.getElementById("settings-button");
const closeModalButton = document.getElementById("close-button");
const learnMoreButton = document.getElementById("learn-more-button");
const overlay = document.getElementById("overlay");
const workTimeSelector = document.getElementById("work-time");
const shortBreakTimeSelector = document.getElementById("short-break-time")
const longBreakTimeSelector = document.getElementById("long-break-time")
const learnMoreContent = document.getElementById("learn-more-content");
const bellSound = new Audio();
const modal = document.getElementById("settings")
bellSound.src = "sound/bell-sound.mp3";

const StateEnum = {
    work: 1,
    shortBreak: 2,
    longBreak: 3
}

workTimeSelector.value = "25";
shortBreakTimeSelector.value = "5";
longBreakTimeSelector.value = "15";

let workTime = workTimeSelector.value * 60;
let shortBreakTime = shortBreakTimeSelector.value * 60;
let longBreakTime = longBreakTimeSelector.value * 60;
let timeLeft = workTime;
let minutesLeft = Math.floor(timeLeft / 60);
let secondsLeft = timeLeft % 60;
let isRunning = false;
let workCounter = 1;
let nextState = StateEnum.shortBreak;
let state = StateEnum.work;

DisplayTimer();

startButton.addEventListener("click", () => {
    ClickManager();
});

skipButton.addEventListener("click", () => {
    if (confirm("Do you want to finish the round early?")) {
        ResetTimer();
        DisplayTimer();
    }
})

learnMoreButton.addEventListener("click", () => {
    learnMoreButton.classList.toggle("learn-more-button-active");
    learnMoreContent.classList.toggle("active");
});

openModalButton.addEventListener("click", () => {
    OpenModal();
})


overlay.addEventListener("click", () => {
    CloseModal();
})

closeModalButton.addEventListener("click", () => {
    CloseModal();
})



function ClickManager() {
    if (isRunning) {
        startButton.addEventListener("click", () => clearInterval(interval));
        startButton.removeEventListener("click", () => ClickManager());
        startButton.innerHTML = "<img src='img/play-icon.svg' alt='Start'></img>";
    } else {
        var interval = setInterval(UpdateTimer, 1000);
        startButton.removeEventListener("click", () => ClickManager());
        startButton.addEventListener("click", () => clearInterval(interval));
        startButton.innerHTML = "<img src='img/pause-icon.svg' alt='Pause'>";
    }
    isRunning = !isRunning;
}

function UpdateTimer() {
    timeLeft--;
    if (timeLeft == 0) {
        bellSound.play();
    } else if (timeLeft == -1) {
        ResetTimer();
    }
    DisplayTimer();
}

function DisplayTimer() {
    minutesLeft = Math.floor(timeLeft / 60);
    secondsLeft = timeLeft % 60;
    secondsLeft < 10 ? timer.innerText = `${minutesLeft}:0${secondsLeft}` : timer.innerText = `${minutesLeft}:${secondsLeft}`;
}

function ResetTimer() {
    switch (nextState) {
        case 1:
            timeLeft = workTime;
            status.innerText = "Work";
            workCounter++;
            if (workCounter % 4 == 0) {
                nextState = StateEnum.longBreak;
            } else {
                nextState = StateEnum.shortBreak;
            }
            state = StateEnum.work;
            break;
        case 2:
            timeLeft = shortBreakTime;
            status.innerText = "Short Break";
            nextState = StateEnum.work;
            state = StateEnum.shortBreak;
            break;
        case 3:
            timeLeft = longBreakTime;
            status.innerText = "Long Break";
            nextState = StateEnum.work;
            state = StateEnum.longBreak;
            break;
    }
}

function OpenModal() {
    modal.classList.add("active");
    overlay.classList.add("active");
}

function CloseModal() {

    if (longBreakTimeSelector.value < 1 || shortBreakTimeSelector.value < 1 || workTimeSelector.value < 1 || longBreakTimeSelector.value > 60 || shortBreakTimeSelector.value > 60 || workTimeSelector.value > 60) {
        alert("Please enter numbers between 1 and 60");
        return;
    }

    workTime = workTimeSelector.value * 60;
    shortBreakTime = shortBreakTimeSelector.value * 60;
    longBreakTime = longBreakTimeSelector.value * 60;

    if (!isRunning) {
        switch (state) {
            case StateEnum.work:
                timeLeft = workTime;
                break;
            case StateEnum.shortBreak:
                timeLeft = shortBreakTime;
                break;
            case StateEnum.longBreak:
                timeLeft = longBreakTime;

        }
    }

    DisplayTimer();

    modal.classList.remove("active")
    overlay.classList.remove("active")
}