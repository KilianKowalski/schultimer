// script.js

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const colorBtn = document.getElementById('color-btn');
    const fullscreenEventBtn = document.getElementById('fullscreen-event-btn');
    const eventColorBtn = document.getElementById('event-color-btn');
    const colorPicker = document.getElementById('color-picker');
    const eventColorPicker = document.getElementById('event-color-picker');
    const timeSection = document.getElementById('time');
    const eventsSection = document.getElementById('events');
    const startScreen = document.getElementById('start-screen');
    const privateSection = document.getElementById('private-section');
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const pinInput = document.getElementById('pin');
    const welcomeMessage = document.getElementById('welcome-message');
    const privateContent = document.getElementById('private-content');
    const userGreeting = document.getElementById('user-greeting');

    // Initialisierung der Uhr
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Initialisierung des Ereignis-Timers
    function updateEventTimer() {
        const now = new Date();
        const nextEventTime = new Date(now);
        if (now.getMinutes() < 45) {
            nextEventTime.setMinutes(45);
        } else {
            nextEventTime.setHours(now.getHours() + 1, 45, 0, 0);
        }
        const timeDifference = nextEventTime - now;
        const hoursDiff = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutesDiff = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsDiff = Math.floor((timeDifference % (1000 * 60)) / 1000);
        document.getElementById('event-timer').textContent = `${hoursDiff.toString().padStart(2, '0')}:${minutesDiff.toString().padStart(2, '0')}:${secondsDiff.toString().padStart(2, '0')}`;
    }

    // Aktualisierung der Uhr und des Ereignis-Timers alle 1 Sekunde
    setInterval(() => {
        updateClock();
        updateEventTimer();
    }, 1000);

    // Vollbildmodus für Uhrzeit-Sektion
    fullscreenBtn.addEventListener('click', () => {
        timeSection.classList.toggle('fullscreen');
        if (timeSection.classList.contains('fullscreen')) {
            fullscreenBtn.textContent = 'Beenden';
        } else {
            fullscreenBtn.textContent = 'Vollbildmodus';
        }
    });

    // Hintergrundfarbe ändern für Uhrzeit-Sektion
    colorBtn.addEventListener('click', () => {
        colorPicker.click();
    });

    colorPicker.addEventListener('input', () => {
        document.body.style.backgroundColor = colorPicker.value;
    });

    // Vollbildmodus für Ereignis-Sektion
    fullscreenEventBtn.addEventListener('click', () => {
        eventsSection.classList.toggle('fullscreen');
        if (eventsSection.classList.contains('fullscreen')) {
            fullscreenEventBtn.textContent = 'Beenden';
        } else {
            fullscreenEventBtn.textContent = 'Vollbildmodus';
        }
    });

    // Hintergrundfarbe ändern für Ereignis-Sektion
    eventColorBtn.addEventListener('click', () => {
        eventColorPicker.click();
    });

    eventColorPicker.addEventListener('input', () => {
        eventsSection.style.backgroundColor = eventColorPicker.value;
    });

    // Anmeldelogik für den privaten Bereich
    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value;
        const pin = pinInput.value;

        fetch('users.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.username === username && user.pin === pin);
                if (user) {
                    loginForm.classList.add('hidden');
                    privateContent.classList.remove('hidden');
                    welcomeMessage.classList.remove('hidden');
                    welcomeMessage.textContent = `Willkommen ${user.username}`;
                    userGreeting.textContent = user.username;
                } else {
                    alert('Ungültiger Benutzername oder PIN');
                }
            });
    });
});
