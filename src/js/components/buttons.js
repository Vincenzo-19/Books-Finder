// funzione per i bottoni sui mobile screens

function handleButtonEvents() {
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.backgroundColor = '#4caf4fbb';
        });
        button.addEventListener('touchend', () => {
            button.style.backgroundColor = 'transparent';
        });
    });
}

export default handleButtonEvents;