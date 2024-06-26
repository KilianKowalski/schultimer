document.addEventListener("DOMContentLoaded", () => {
    const ferienDate = new Date("2024-07-20T00:00:00"); // Beispiel Ferienzeit
    const pauseDate = new Date(); // Beispiel Pausenzeit (wird später aktualisiert)

    function updateTimer(timerElement, targetDate) {
        const now = new Date();
        const timeLeft = targetDate - now;
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (timeLeft < 0) {
            timerElement.textContent = "Zeit abgelaufen!";
        }
    }

    const ferienTimerElement = document.getElementById("ferien-timer");
    const pauseTimerElement = document.getElementById("pause-timer");

    setInterval(() => {
        updateTimer(ferienTimerElement, ferienDate);
        updateTimer(pauseTimerElement, pauseDate);
    }, 1000);
});
