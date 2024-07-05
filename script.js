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
        { name: '2. Stunde', time: '08:45' },
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

    const fridayEvents = [
        { name: '2. Stunde', time: '08:45' },
        { name: 'Pause', time: '09:30' },
        { name: '3. Stunde', time: '09:50' },
        { name: '4. Stunde', time: '10:35' },
        { name: '2. Pause', time: '11:20' },
        { name: '5. Stunde', time: '11:35' },
        { name: 'Mittagspause', time: '12:20' },
        { name: 'Schulschluss', time: '13:05' }
    ];

    function updateEventTimer() {
        const now = new Date();
        const day = now.getDay();
        const today = now.toISOString().split('T')[0];

        if (day === 0 || day === 6) {
            const nextMonday = new Date(now);
            nextMonday.setDate(now.getDate() + ((1 + 7 - day) % 7));
            nextMonday.setHours(8, 0, 0, 0); // School starts at 08:00 on Monday
            const diff = nextMonday - now;
            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            
            document.getElementById('event-timer').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            document.querySelector('#events h2').textContent = "Zeit bis zum Schulbeginn am Montag";
            return;
        }

        const dayEvents = (day === 5) ? fridayEvents : events;

        let nextEventTime;
        let nextEvent = dayEvents.find(event => {
            const eventTime = new Date(`${today}T${event.time}:00`);
            return eventTime > now;
        });

        if (!nextEvent) {
            nextEvent = { name: 'Schulbeginn', time: '08:00' };
            const nextDay = new Date(now);
            nextDay.setDate(now.getDate() + ((1 + 7 - day) % 7));
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

        if (hours === 0 && minutes === 0 && seconds === 0) {
            schoolBell.play();
        }
    }

    setInterval(updateEventTimer, 1000);
    updateEventTimer();
});