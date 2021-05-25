const timer = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const status = document.getElementById("status");
let workTime = 1500;
let breakTime = 600;
let timeLeft = workTime;
let minutesLeft = Math.floor(timeLeft / 60);
let secondsLeft = timeLeft % 60;
let isBreak = false;
let isRunning = false;

DisplayTimer();

startButton.addEventListener("click", function() {
    ClickManager();
});

function ClickManager() {
    if (isRunning) {
        startButton.addEventListener("click", () => clearInterval(interval));
        startButton.removeEventListener("click", () => ClickManager());
        startButton.innerHTML = "<img src='play-icon.svg' alt='Start'></img>";
    } else {
        var interval = setInterval(UpdateTimer, 1000);
        startButton.removeEventListener("click", () => ClickManager());
        startButton.addEventListener("click", () => clearInterval(interval));
        startButton.innerHTML = "<img src='pause-icon.svg' alt='Pause'>";
    }
    isRunning = !isRunning;
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
    secondsLeft < 10 ? timer.innerHTML = `${minutesLeft}:0${secondsLeft}` : timer.innerHTML = `${minutesLeft}:${secondsLeft}`;
}

function ResetTimer() {
    if (isBreak) {
        timeLeft = workTime;
        status.innerHTML = "Work";
        isBreak = false;
    } else {
        timeLeft = breakTime;
        status.innerHTML = "Short Break";
        isBreak = true;
    }
}