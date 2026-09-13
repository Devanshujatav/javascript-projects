// ---- Grab the elements we need to update ----
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const greetingEl = document.getElementById('greeting');
const formatToggle = document.getElementById('formatToggle');
const segments = document.getElementById('segment-strip span');

// ---- State: are we showing 24-hour time, or 12-hour with AM/PM? ----
let use24Hour = true;

// Pads a number with a leading zero when it's a single digit (5 -> "05")
function pad(number){
    return String(number).padStart(2,'0');
}

