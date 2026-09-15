// ---- Grab the elements we need to update ----
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const greetingEl = document.getElementById('greeting');
const formatToggle = document.getElementById('formatToggle');
const segments = document.querySelectorAll('.segment-strip span');

// ---- State: are we showing 24-hour time, or 12-hour with AM/PM? ----
let use24Hour = true;

// Pads a number with a leading zero when it's a single digit (5 -> "05")
function pad(number){
    return String(number).padStart(2,'0');
}

function getGreeting(hour){
    if(hour<5) return 'Still Up';
    if(hour<12) return 'Good Morning';
    if(hour<17) return 'Good Afternoon';
    if(hour<21) return 'Good Evening';

    return 'Winding Down';
}

function updateSegments(seconds){
    const activeCount = Math.floor(seconds / 6) + 1;

    segments.forEach((span , index) => {
        span.style.background = index < activeCount ? 'var(--amber-dim)' : 'var(--card-edge)';
    });
}

function updateClock(){
    const now = new Date();
    const hours24 = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    let timeString;
    if(use24Hour){
        timeString = `${pad(hours24)}:${pad(minutes)}:${pad(seconds)}`;
    }else{
        const period = hours24 >= 12 ? 'PM' : 'AM';
        const hour12 = (hours24 % 12) || 12 ;
        timeString = `${pad(hour12)}:${pad(minutes)}:${pad(seconds)}${period}`;
    }

    timeEl.textContent = timeString;

    const dateString = now.toLocaleDateString('en-US' , {
        weekday : 'long',
        month : 'long',
        day : 'numeric',
    });

    dateEl.textContent = dateString;

    greetingEl.textContent = getGreeting(hours24);
    updateSegments(seconds);
}

formatToggle.addEventListener('click' , () => {
    use24Hour = !use24Hour;
    formatToggle.textContent = use24Hour ? '24H' : '12H'
    formatToggle.setAttribute('aria-pressed' , String(!use24Hour));
    formatToggle.setAttribute('aria-label' , use24Hour ? 'Switch to 12-Hour format' : 'Switch to 24-Hour format'); 

    updateClock();
});

updateClock();
setInterval(updateClock , 1000);






