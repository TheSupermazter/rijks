function zoek() {
    // Haal de zoektekst op uit het invoerveld
    var zoektekst = document.getElementById('search-input').value.toLowerCase();
    
    // Simuleer hier het verkrijgen van zoekresultaten (kan worden vervangen door echte data)
    var mockData = ['Appel', 'Banaan', 'Sinaasappel', 'Peer', 'Mango', 'Ananas'];
    
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