// ---- 1. STATE ----
// Everything the app needs to remember lives in one plain object.
// Nothing else in this file is a separate "source of truth."

const MIN = -50;
const MAX = 50;

const state = {
    value : Number(localStorage.getItem('counter:value')) || 0,
    step : 1,
}

// ---- 2. ELEMENTS ----
// Grab every node we'll touch, once, up front.
const el = {
    value : document.getElementById("value"),
    status : document.getElementById("status"),
    inc : document.getElementById("inc"),
    dec : document.getElementById("dec"),
    reset : document.getElementById("reset"),
    step : document.getElementById("step")
}

function render(){
    el.value.textContent = state.value;

    el.value.style.color = state.value > 0 ? 'var(--accent)' : state.value < 0 ? 'var(--danger)' : 'var(--text)';

    el.inc.disabled = state.value + state.step > 100;
    el.dec.disabled = state.value - state.step < 100;

    
}



