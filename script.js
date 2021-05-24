let countdownElement = document.getElementById("timer");
let startButtonElement = document.getElementById("start-button");
let statusElement = document.getElementById("status");

let workTime = 10;
let breakTime = 5;
let timeLeft = workTime;
let minutesLeft = Math.floor(timeLeft / 60);
let secondsLeft = timeLeft % 60;
let isBreak = false;
let isRunning = false;
DisplayTimer();

startButtonElement.addEventListener("click", () => ClickManager());

function ClickManager() {
    if (isRunning) {
        isRunning = false;
        startButtonElement.addEventListener("click", () => clearInterval(interval));
        startButtonElement.removeEventListener("click", () => ClickManager());
        startButtonElement.innerHTML = "Weiter";
    }
    else {
        var interval = setInterval(UpdateTimer, 1000);
        isRunning = true;
        startButtonElement.removeEventListener("click", () => ClickManager());
        startButtonElement.addEventListener("click", () => clearInterval(interval));
        startButtonElement.innerHTML = "Pause";
    }
}

function UpdateTimer() {
    timeLeft--;
    if (timeLeft == -1) {
        ResetTimer();
    }
    DisplayTimer();
}

function DisplayTimer() {
    minutesLeft = Math.floor(timeLeft / 60);
    secondsLeft = timeLeft % 60;
    secondsLeft < 10 ? countdownElement.innerHTML = `${minutesLeft}:0${secondsLeft}` : countdownElement.innerHTML = `${minutesLeft}:${secondsLeft}`;
}

function ResetTimer() {
    if (isBreak) {
        timeLeft = workTime;
        statusElement.innerHTML = "Worksession";
        isBreak = false;
    }
    else {
        timeLeft = breakTime;
        statusElement.innerHTML = "Pause";
        isBreak = true;
    }
}

