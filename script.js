// script.js

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const colorBtn = document.getElementById('color-btn');
    const colorPicker = document.getElementById('color-picker');
    const fullscreenEventBtn = document.getElementById('fullscreen-event-btn');
    const eventColorBtn = document.getElementById('event-color-btn');
    const eventColorPicker = document.getElementById('event-color-picker');
    const schoolBell = document.getElementById('school-bell');

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    });

    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('de-DE', { hour12: false });
        document.getElementById('clock').textContent = timeString;
    }
    setInterval(updateTime, 1000);
    updateTime();

    fullscreenBtn.addEventListener('click', () => {
        const timeSection = document.getElementById('time');
        if (!document.fullscreenElement) {
            timeSection.requestFullscreen();
            timeSection.classList.add('fullscreen');
        } else {
            document.exitFullscreen();
            timeSection.classList.remove('fullscreen');
        }
    });

    colorBtn.addEventListener('click', () => {
        colorPicker.click();
    });

    colorPicker.addEventListener('input', (event) => {
        document.getElementById('time').style.backgroundColor = event.target.value;
    });

    fullscreenEventBtn.addEventListener('click', () => {
        const eventsSection = document.getElementById('events');
        if (!document.fullscreenElement) {
            eventsSection.requestFullscreen();
            eventsSection.classList.add('fullscreen');
        } else {
            document.exitFullscreen();
            eventsSection.classList.remove('fullscreen');
        }
    });

    eventColorBtn.addEventListener('click', () => {
        eventColorPicker.click();
    });

    eventColorPicker.addEventListener('input', (event) => {
        document.getElementById('events').style.backgroundColor = event.target.value;
    });

    const events = [
        { name: 'zum Schulbeginn', time: '08:00' },
        { name: 'zur 2.Stunde', time: '08:45' },
        { name: 'zur Pause', time: '09:30' },
        { name: 'zur 3. Stunde', time: '09:50' },
        { name: 'zur 4. Stunde', time: '10:35' },
        { name: 'zur 2. Pause', time: '11:20' },
        { name: 'zur 5. Stunde', time: '11:35' },
        { name: 'zur Lernzeit', time: '12:20' },
        { name: 'zum Schulschluss', time: '13:05' }
    ];

    const fridayEvents = [
        { name: 'zum Schulbeginn', time: '08:00'},
        { name: 'zur 2. Stunde', time: '08:45' },
        { name: 'zur Pause', time: '09:30' },
        { name: 'zur 3. Stunde', time: '09:50' },
        { name: 'zur 4. Stunde', time: '10:35' },
        { name: 'zum Wochenende', time: '11:20' }
    ];

    function updateEventTimer() {
        const now = new Date();
        const day = now.getDay();
        const today = now.toISOString().split('T')[0];

        if (day === 0 || day === 6) {
            const nextMonday = new Date(now);
            nextMonday.setDate(now.getDate() + ((1 + 7 - day) % 7));
            nextMonday.setHours(8, 0, 0, 0);
            const diff = nextMonday - now;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('event-timer').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            let nextEvent = null;
            const eventsToday = day === 5 ? fridayEvents : events;

            for (let i = 0; i < eventsToday.length; i++) {
                const eventTime = new Date(`${today}T${eventsToday[i].time}:00`);
                if (eventTime > now) {
                    nextEvent = eventTime;
                    break;
                }
            }

            if (nextEvent) {
                const diff = nextEvent - now;
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                document.getElementById('event-timer').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                document.getElementById('event-timer').textContent = '00:00:00';
            }
        }
    }
    setInterval(updateEventTimer, 1000);
    updateEventTimer();

    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const pinInput = document.getElementById('pin');
    const welcomeMessage = document.getElementById('welcome-message');
    const privateContent = document.getElementById('private-content');
    const userGreeting = document.getElementById('user-greeting');

    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const pin = pinInput.value.trim();

        if (username === 'admin' && pin === '1234') {
            welcomeMessage.textContent = `Willkommen, ${username}!`;
            welcomeMessage.classList.remove('hidden');
            privateContent.classList.remove('hidden');
            userGreeting.textContent = `Hallo, ${username}!`;
            setTimeout(() => {
                welcomeMessage.classList.add('hidden');
            }, 3000);
        } else {
            alert('Ungültige Anmeldedaten.');
        }

        // Zurücksetzen der Eingabefelder
        usernameInput.value = '';
        pinInput.value = '';
    });
});
