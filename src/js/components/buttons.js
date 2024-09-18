// funzione per i bottoni sui mobile screens

function handleButtonEvents() {
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.backgroundColor = '#4caf4fbb';
        }, {passive: true});
        button.addEventListener('touchend', () => {
            button.style.backgroundColor = 'transparent';
        }, {passive: true});
    });
}

export default handleButtonEvents;