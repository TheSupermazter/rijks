// index.js

// Importeer de nodige modules
const express = require('express');

// Maak een Express-app
const app = express();

// Definieer een route die "Hello World" terugstuurt als reactie
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Luister naar inkomende verzoeken op poort 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});