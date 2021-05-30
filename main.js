const timer = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const skipButton = document.getElementById("skip-button");
const status = document.getElementById("status");
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const learnMoreButton = document.getElementById("learn-more-button");
const overlay = document.getElementById("overlay");
const workTimeSelector = document.getElementById("work-time");
const shortBreakTimeSelector = document.getElementById("short-break-time")
const longBreakTimeSelector = document.getElementById("long-break-time")
const learnMoreContent = document.getElementById("learn-more-content");
const bellSound = new Audio();
bellSound.src = "bell-sound.mp3";

const StateEnum = {
    work: 1,
    shortBreak: 2,
    longBreak: 3
}

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


workTimeSelector.oninput = function() {
    workTime = workTimeSelector.value * 60;
    if (!isRunning && state == StateEnum.work) {
        timeLeft = workTime;
        DisplayTimer();
    }
}

shortBreakTimeSelector.oninput = function() {
    shortBreakTime = shortBreakTimeSelector.value * 60;
    if (!isRunning && state == StateEnum.shortBreak) {
        timeLeft = shortBreakTime;
        DisplayTimer();
    }
}

longBreakTimeSelector.oninput = function() {
    longBreakTime = longBreakTimeSelector.value * 60;
    if (!isRunning && state == StateEnum.longBreak) {
        timeLeft = longBreakTime;
        DisplayTimer();
    }
}


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

openModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        OpenModal(modal);
    })
})

overlay.addEventListener("click", () => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach(modal => {
        CloseModal(modal);
    })
  })

closeModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        CloseModal(modal);
    })
})



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
    if (timeLeft == 0)
    {
        bellSound.play();
    }else if (timeLeft == -1) {
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
    switch (nextState) {
        case 1:
            timeLeft = workTime;
            status.innerHTML = "Work";
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
            status.innerHTML = "Short Break";
            nextState = StateEnum.work;
            state = StateEnum.shortBreak;
            break;
        case 3:
            timeLeft = longBreakTime;
            status.innerHTML = "Long Break";
            nextState = StateEnum.work;
            state = StateEnum.longBreak;
            break;
    }
}

function OpenModal(modal){
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
}

function CloseModal(modal) {
    if (modal == null) return
    modal.classList.remove("active")
    overlay.classList.remove("active")
  }