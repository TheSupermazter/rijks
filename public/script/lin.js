// Zoek alle afbeeldingen met de klasse "clickable"
const images = document.querySelectorAll('.clickable');

// volgendeKnop vraagt alle knoppen met id volgendeKnop op.
let volgendeKnop = document.getElementById("volgendeKnop");

// Loop door elke afbeelding en voeg een click event listener toe
images.forEach(image => {
    image.addEventListener('click', () => {
        // Verwijder eerst de klasse "clicked" van alle afbeeldingen
        images.forEach(img => img.classList.remove('clicked'));
        // Voeg vervolgens de klasse "clicked" toe aan de geklikte afbeelding
        image.classList.add('clicked');
        // Wanneer er een foto aangeklikt wordt wordt de class .hidden weggehaald, waardoor de volgendeKnop zichtbaar wordt (zodat je alleen maar door kan als je iets geselecteerd hebt.)
        volgendeKnop.classList.remove("hidden");




        // Loop opnieuw door alle afbeeldingen om de transparantie aan te passen
        images.forEach(img => {
            // Controleer of de afbeelding niet de huidige geklikte afbeelding is
            if (img !== image) {
                // Pas de transparantie aan naar 30%
                img.style.opacity = '0.3';
            } else {
                // Reset de transparantie naar normaal voor de geklikte afbeelding
                img.style.opacity = '1';
            }
        });
    });
});
