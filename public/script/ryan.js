function zoek() {
    // Haal de zoektekst op uit het invoerveld
    var zoektekst = document.getElementById('search-input').value.toLowerCase();
    
    // Simuleer hier het verkrijgen van zoekresultaten (kan worden vervangen door dynamische data)
    var mockData = ['Vincent van Gogh', 'NachtWacht', 'Rembrandt van Rijn', 'Het Melkmeisje', 'Johannes Vermeer ', 'De bedreigde Zwaan'];
    
    // Filter de mockData op basis van de zoektekst
    var zoekresultaten = mockData.filter(function(item) {
        return item.toLowerCase().includes(zoektekst);
    });
    
    // Laat de zoekresultaten zien in het resultaten-container
    toonZoekresultaten(zoekresultaten);
}

function toonZoekresultaten(resultaten) {
    var resultatenContainer = document.getElementById('resultaten-container');
    resultatenContainer.innerHTML = ''; // Wis eerdere zoekresultaten
    
    if (resultaten.length === 0) {
        alert('Geen resultaten gevonden.');
    } else {
        // Voeg elk zoekresultaat toe aan het resultaten-container
        resultaten.forEach(function(item) {
            var itemElement = document.createElement('div');
            itemElement.textContent = item;
            resultatenContainer.appendChild(itemElement);
        });
    }
}



// img switch aan de hand van de lijst 

document.addEventListener('DOMContentLoaded', () => {
    const imageList = document.getElementById('list');
    const mainImage = document.getElementById('mainImage');

    if (!imageList || !mainImage) {
        console.error('imageList or mainImage element not found');
        return;
    }

    function updateMainImage() {
        const firstImage = imageList.querySelector('li img');
        if (firstImage) {
            mainImage.src = firstImage.src;
        } else {
            console.error('No image found in the list');
        }
    }

    // Start het updaten als de pagina inlaad
    updateMainImage();

    new Sortable(list, {
        animation: 300, 
        onEnd: () => {
            updateMainImage(); // Update de main image nadat het allemaal gesorteerd is
        }
    });
});
