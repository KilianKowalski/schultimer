document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const colorBtn = document.getElementById('color-btn');
    const colorPicker = document.getElementById('color-picker');
    const fullscreenEventBtn = document.getElementById('fullscreen-event-btn');

    let lastScroll = 0;

    // Hide/show header on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    });

    // Display current time
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('de-DE', { hour12: false });
        document.getElementById('clock').textContent = timeString;
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Fullscreen clock
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.getElementById('time').requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // Change background color
    colorBtn.addEventListener('click', () => {
        colorPicker.click();
    });

    colorPicker.addEventListener('input', (event) => {
        document.getElementById('time').style.backgroundColor = event.target.value;
    });

    // Fullscreen event timer
    fullscreenEventBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.getElementById('events').requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // Timer for next event
    const events = [
        { name: 'Pause', time: '09:30' },
        { name: '3. Stunde', time: '09:50' },
        { name: '4. Stunde', time: '10:35' },
        { name: '2. Pause', time: '11:20' },
        { name: '5. Stunde', time: '11:35' },
        { name: 'Mittagspause', time: '12:20' },
        { name: 'Lernzeit', time: '13:15' },
        { name: 'Nachmittagsunterricht', time: '14:00' },
        { name: 'Schulschluss', time: '15:30' }
    ];

    function updateEventTimer() {
        const now = new Date();
        let nextEvent = events.find(event => {
            const [hours, minutes] = event.time.split(':').map(Number);
            const eventTime = new Date();
            eventTime.setHours(hours, minutes, 0, 0);
            return eventTime > now;
        });

        if (!nextEvent) {
            nextEvent = { name: 'Schulbeginn', time: '08:00' };
            now.setDate(now.getDate() + 1);
        }

        const [eventHours, eventMinutes] = nextEvent.time.split(':').map(Number);
        const eventTime = new Date();
        eventTime.setHours(eventHours, eventMinutes, 0, 0);

        const diff = eventTime - now;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        document.getElementById('event-timer').textContent = `${hours}:${minutes}:${seconds}`;
        document.querySelector('#events h2').textContent = `Zeit bis zu/r ${nextEvent.name}`;
    }

    setInterval(updateEventTimer, 1000);
    updateEventTimer();
});
