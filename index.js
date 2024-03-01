// index.js

// Importeer de nodige modules
const express = require('express');

// Maak een Express-app
const app = express();

// Definieer een route die "Hello World" terugstuurt als reactie
app
  .get('/', onhome)
  .get('/about/:name', onabout)
  .listen(8000)

function onhome(req, res) {
  res.send('<h1>Hallo wereld</h1>')
}

function onabout(req, res) {
  res.send(`<h1>Goeiemorgen ${req.params.name}!</h1>`)
}

// Luister naar inkomende verzoeken op poort 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
