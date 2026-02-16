let intervalIds = []; // Array, um alle Interval-IDs zu speichern


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
    return id;
}


function stopGame() {
    // Alle Intervalle stoppen
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = []; // Array leeren
}
