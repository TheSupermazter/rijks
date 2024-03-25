let shuffleValue = 2;

document.getElementById('shuffleButton').addEventListener('click', updateButton);

document.getElementById('confirmButton').addEventListener('click', showKunstwerk);

document.getElementById('addKnop').addEventListener('click', mijnKunstwerk);

function updateButton() {
    let button = document.getElementById('shuffleButton');
    if (shuffleValue > 0) {
        shuffleValue--;
    }
    button.innerHTML = "Shuffle (" + shuffleValue + ")";
} 

function showKunstwerk() {
    var kunstPassword = document.getElementById("kunstPassword");
    var kunstwerkInfo = document.getElementById("kunstwerkInfo");
    kunstPassword.classList.add("visuallyHidden");
    kunstwerkInfo.classList.remove("visuallyHidden");

}


let fave = 0;

function mijnKunstwerk() {
    let button = document.getElementById('addKnop');

    if (fave === 0) {
        button.innerHTML = "Toegevoegd aan Mijn Kunstwerken";
        fave = 1;
    } else if (fave === 1) {
        button.innerHTML = "Toevoegen aan Mijn Kunstwerken";
        fave = 0;
    }
}
