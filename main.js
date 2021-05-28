const timer = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const status = document.getElementById("status");
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const bellSound = new Audio();
bellSound.src = "bell-sound.mp3";

let workTime = 15;
let breakTime = 600;
let timeLeft = workTime;
let minutesLeft = Math.floor(timeLeft / 60);
let secondsLeft = timeLeft % 60;
let isBreak = false;
let isRunning = false;

DisplayTimer();

startButton.addEventListener("click", () => {
    ClickManager();
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