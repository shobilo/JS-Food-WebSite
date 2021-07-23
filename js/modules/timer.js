function timer(timerId, deadline) {
    function getTimeRemaining(endTime) {
        const now = Date.parse(endTime) - Date.parse(new Date()); //ms
        const days = Math.floor(now / (1000 * 60 * 60 * 24));
        const hours = Math.floor((now / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((now / (1000 * 60) % 60));
        const seconds = Math.floor((now / 1000) % 60);

        return {
            'total': now,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function checkZero(num) {
        if (num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }

    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = checkZero(t.days);
            hours.innerHTML = checkZero(t.hours);
            minutes.innerHTML = checkZero(t.minutes);
            seconds.innerHTML = checkZero(t.seconds);

            if (t.total <= 0){
                days.innerHTML = "00";
                hours.innerHTML = "00";
                minutes.innerHTML = "00";
                seconds.innerHTML = "00";
                clearInterval(timeInterval);
            }
        }

    }

    setClock(timerId, deadline);
}

export default timer;