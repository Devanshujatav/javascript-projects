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

// ---- 3. RENDER ----
// render() is the ONLY function allowed to touch the DOM.
// It reads state and makes the page match it. Nothing else writes to the DOM directory.
function render(){
    el.value.textContent = state.value;

    el.value.style.color = state.value > 0 ? 'var(--accent)' : state.value < 0 ? 'var(--danger)' : 'var(--text)';

    el.inc.disabled = state.value + state.step > 100;
    el.dec.disabled = state.value - state.step < 100;

    el.status.textContent = state.value === MAX ? 'hit the ceiling' : state.value === MIN ? 'hit the floor' : '\u00A0'; 

    localStorage.setItem('Counter:value' , state.value);
}


//---- 4. ACTIONS ----
// These are the only functions allowed to CHANGE state.
// Every action ends by calling render(). This is the pattern:
//   event happens -> action mutates state -> render() syncs the DOM.   
function increment(){
    state.value = Math.min(MAX , state.value + state.step);
    render();
}

function decrement(){
    state.value = Math.max(MIN , state.value - state.step);
    render();
}

function reset(){
    state.value = 0;
    render();
}

function setStep(newStep){
    state.step = newStep;
    render();
}

// ---- 5. EVENTS ----
// Listeners never touch the DOM or compute values themselves.
// Their only job is: "user did X" -> call the matching action.
el.inc.addEventListener('click' , increment());
el.dec.addEventListener('click' , decrement());
el.reset.addEventListener('click' , reset());
el.step.addEventListener('change' , (e) => setStep(e.target.value));

document.addEventListener('keydown' , (e) => {
    if (e.key === 'ArrowUp') increment();
    if (e.key === 'ArrowDown') decrement();
});

// ---- 6. INITIAL PAINT ----
render();









