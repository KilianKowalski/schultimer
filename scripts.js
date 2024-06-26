document.addEventListener('DOMContentLoaded', function() {
    // Clock section
    const clock = document.getElementById('clock');
    const clockFullscreenButton = document.getElementById('clock-fullscreen-button');
    const clockColorPickerButton = document.getElementById('clock-color-picker-button');

    clockFullscreenButton.addEventListener('click', function() {
        toggleFullscreen(clock);
    });

    clockColorPickerButton.addEventListener('click', function() {
        openColorPicker(clock);
    });

    // Timer section
    const timer = document.getElementById('timer');
    const timerFullscreenButton = document.getElementById('timer-fullscreen-button');
    const timerColorPickerButton = document.getElementById('timer-color-picker-button');

    timerFullscreenButton.addEventListener('click', function() {
        toggleFullscreen(timer);
    });

    timerColorPickerButton.addEventListener('click', function() {
        openColorPicker(timer);
    });

    // Placeholder functions for fullscreen and color picker
    function toggleFullscreen(element) {
        // Check if browser supports fullscreen API
        if (document.fullscreenEnabled) {
            if (!document.fullscreenElement) {
                element.requestFullscreen().catch(err => {
                    alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            } else {
                document.exitFullscreen();
            }
        } else {
            alert('Your browser does not support fullscreen mode.');
        }
    }

    function openColorPicker(element) {
        // Placeholder for opening color picker
        alert('Implementieren Sie hier die Logik für die Farbauswahl');
    }

    // Function to update clock time
    function updateClock() {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString();
    }

    // Function to update timer until next event
    function updateTimer() {
        const timeUntilNextEvent = getTimeUntilNextEvent();
        timer.textContent = timeUntilNextEvent;
    }

    // Placeholder function for fetching and displaying time until next event
    function getTimeUntilNextEvent() {
        const now = new Date();
        const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday)
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentSecond = now.getSeconds();

        // Implement logic to calculate time until next event based on current day and time
        // Example logic:
        // - Calculate time until next event (e.g., next break, end of school, etc.)
        // - For demonstration purposes, return a placeholder string
        let timeUntilNextEvent
