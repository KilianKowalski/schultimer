document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const colorBtn = document.getElementById('color-btn');
    const colorPicker = document.getElementById('color-picker');
    const fullscreenEventBtn = document.getElementById('fullscreen-event-btn');
    const eventColorBtn = document.getElementById('event-color-btn');
    const eventColorPicker = document.getElementById('event-color-picker');

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
        const timeSection = document.getElementById('time');
        if (!document.fullscreenElement) {
            timeSection.requestFullscreen();
            timeSection.classList.add('fullscreen');
        } else {
            document.exitFullscreen();
            timeSection.classList.remove('fullscreen');
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
        const eventsSection = document.getElementById('events');
        if (!document.fullscreenElement) {
            eventsSection.requestFullscreen();
            eventsSection.classList.add('fullscreen');
        } else {
            document.exitFullscreen();
            eventsSection.classList.remove('fullscreen');
        }
    });

    // Change event timer background color
    eventColorBtn.addEventListener('click', () => {
        eventColorPicker.click();
    });

    eventColorPicker.addEventListener('input', (event) => {
        document.getElementById('events').style.backgroundColor = event.target.value;
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
        const today = now.toISOString().split('T')[0];

        let nextEventTime;
        let nextEvent = events.find(event => {
            const eventTime = new Date(`${today}T${event.time}:00`);
            return eventTime > now;
        });

        if (!nextEvent) {
            nextEvent = { name: 'Schulbeginn', time: '08:00' };
            const nextDay = new Date(now);
            nextDay.setDate(now.getDate() + 1);
            const nextEventDate = nextDay.toISOString().split('T')[0];
            nextEventTime = new Date(`${nextEventDate}T${nextEvent.time}:00`);
        } else {
            nextEventTime = new Date(`${today}T${nextEvent.time}:00`);
        }

        const diff = nextEventTime - now;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        document.getElementById('event-timer').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.querySelector('#events h2').textContent = `Zeit bis zu/r ${nextEvent.name}`;
    }

    setInterval(updateEventTimer, 1000);
    updateEventTimer();
});
