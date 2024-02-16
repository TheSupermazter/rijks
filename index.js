// index.js

// Importeer de nodige modules
const express = require('express');

// Maak een Express-app
const app = express();

// Definieer een route die "Hello World" terugstuurt als reactie
app
  .get('/', onhome)
  .listen(8000)

function onhome(req, res) {
  res.send('<h1>Hallo wereld</h1>')
}
