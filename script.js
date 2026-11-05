
// =========================
// WELCOME SCREEN
// =========================

const startButton = document.getElementById("startButton");
const welcomeSection = document.querySelector(".welcome");
const mainContent = document.getElementById("mainContent");

startButton.addEventListener("click", () => {
    welcomeSection.classList.add("hidden");
    mainContent.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// =========================
// LOVE NOTE POPUPS
// =========================

const noteCards = document.querySelectorAll(".note-card");
const messageModal = document.getElementById("messageModal");
const modalMessage = document.getElementById("modalMessage");

const closeModal = document.getElementById("closeModal");
const modalOkay = document.getElementById("modalOkay");

noteCards.forEach(card => {

    card.addEventListener("click", () => {

        const message = card.getAttribute("data-message");

        modalMessage.textContent = message;

        messageModal.classList.remove("hidden");

    });

});

function closeMessage() {
    messageModal.classList.add("hidden");
}

closeModal.addEventListener("click", closeMessage);
modalOkay.addEventListener("click", closeMessage);

messageModal.addEventListener("click", (event) => {

    if (event.target === messageModal) {
        closeMessage();
    }

});


// =========================
// MUSIC PLAYER
// =========================

const music = document.getElementById("music");
const playButton = document.getElementById("playButton");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

playButton.addEventListener("click", () => {

    if (music.paused) {

        music.play().then(() => {
            playButton.textContent = "Ⅱ";
        }).catch(error => {
            console.log("Music could not play:", error);
            alert("Please check your music file.");
        });

    } else {

        music.pause();
        playButton.textContent = "▶";

    }

});


// =========================
// MUSIC TIME FORMAT
// =========================

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ":" + String(remainingSeconds).padStart(2, "0");

}


// =========================
// UPDATE MUSIC PROGRESS
// =========================

music.addEventListener("loadedmetadata", () => {

    duration.textContent = formatTime(music.duration);

});

music.addEventListener("timeupdate", () => {

    if (music.duration) {

        const percentage = (music.currentTime / music.duration) * 100;

        progress.value = percentage;

        currentTime.textContent = formatTime(music.currentTime);

    }

});


// =========================
// SEEK MUSIC
// =========================

progress.addEventListener("input", () => {

    if (music.duration) {

        music.currentTime = (progress.value / 100) * music.duration;

    }

});


// =========================
// WHEN MUSIC ENDS
// =========================

music.addEventListener("ended", () => {

    playButton.textContent = "▶";
    progress.value = 0;
    currentTime.textContent = "0:00";

});
