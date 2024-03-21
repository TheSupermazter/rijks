// Zoek alle afbeeldingen met de klasse "clickable"
const images = document.querySelectorAll('.clickable');

// Loop door elke afbeelding en voeg een click event listener toe
images.forEach(image => {
    image.addEventListener('click', () => {
        // Verwijder eerst de klasse "clicked" van alle afbeeldingen
        images.forEach(img => img.classList.remove('clicked'));
        // Voeg vervolgens de klasse "clicked" toe aan de geklikte afbeelding
        image.classList.add('clicked');
    });
});