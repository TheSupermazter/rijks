const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    const label = input.previousElementSibling;

    input.addEventListener('focus', () => {
        label.classList.add('focus');
    });

    input.addEventListener('blur', () => {
        if (!input.value.trim()) {
            label.classList.remove('focus');
        }
    });

    input.addEventListener('input', () => {
        if (input.value.trim()) {
            label.classList.add('focus');
        }
    });

    if (input.value.trim()) {
        label.classList.add('focus');
    }
});


// DRAWING IN REGISTER____CANVAS_________________________________________________________________________________________________________

  // Get a reference to the canvas element and its context
  const canvas = document.getElementById('drawing');
  const ctx = canvas.getContext('2d');

  let drawing = false;

  // Function to start drawing
  function startDrawing(e) {
    drawing = true;
    draw(e); // In case of a dot
  }

  // Function to stop drawing
  function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // Begin a new path for the next drawing
  }

  // Function to draw
  function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = 5; // Width of the line
    ctx.lineCap = 'round'; // Rounded end cap
    ctx.strokeStyle = '#D55140'

    // Get the correct mouse position
    const rect = canvas.getBoundingClientRect();
    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;

    // Draw a line to the current mouse position
    ctx.lineTo(posX, posY);
    ctx.stroke();
    ctx.beginPath(); // Begin a new path
    ctx.moveTo(posX, posY); // Move to the current mouse position
  }

  // Event listeners for mouse actions
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mousemove', draw);

  // Event listeners for touch actions
  canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);

  canvas.addEventListener('touchend', () => {
    canvas.dispatchEvent(new MouseEvent('mouseup'));
  }, false);

  canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);

  // Prevent scrolling when touching the canvas
  document.body.addEventListener('touchstart', (e) => {
    if (e.target === canvas) {
      e.preventDefault();
    }
  }, { passive: false });

  document.body.addEventListener('touchend', (e) => {
    if (e.target === canvas) {
      e.preventDefault();
    }
  }, { passive: false });

  document.body.addEventListener('touchmove', (e) => {
    if (e.target === canvas) {
      e.preventDefault();
    }
  }, { passive: false });



// Get the canvas and the button
const fetchBtn = document.querySelector('.fetchArt');

// Function to check if the canvas is blank
function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some(color => color !== 0);
}

// Function to show or hide the button based on the canvas content
function updateButtonVisibility() {
    if (!isCanvasBlank(canvas)) {
        fetchBtn.classList.remove("hidden");
    } else {
        fetchBtn.classList.add("hidden");
        console.log('Het canvas is leeg.');
    }
}

// Add an event listener to the canvas
canvas.addEventListener('mouseup', updateButtonVisibility);



// Delete button
const deleteButton = document.querySelector('.deleteSketch');

// Function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Event listener delete button
deleteButton.addEventListener('click', clearCanvas);



// FETCH FROM RIJKS API_____________________________________________________________________________________________________________

const baseURL = "https://www.rijksmuseum.nl/api/nl/collection?key=se7NGInw";
const endPointRegister = "";
const URL = baseURL + endPointRegister;

const drawDiv = document.querySelector('.drawDiv');
const button = document.querySelector('.fetchArt');

function getRijksData() {
    getData(URL).then((data) => {
      const allRijks = data.artObjects;
      const randomIndex = Math.floor(Math.random() * allRijks.length);
      const randomRijks = allRijks[randomIndex];
      let rijksImgElement = `
        <img src="${randomRijks.webImage.url}" alt="${randomRijks.title}">
      `;
      drawDiv.insertAdjacentHTML('beforeend', rijksImgElement);

      // Set the value of the hidden input field with the image URL
      document.getElementById('profilePicture').value = randomRijks.webImage.url;
    });
}

async function getData(URL) {
  return fetch(URL)
    .then(response => response.json())
    .then(jsonData => {
      const canvas = document.querySelector('.canvas');
      const deleteBtn = document.querySelector(`.deleteSketch`);
      const label = document.querySelector('label[for="drawing"]');
      if (canvas && deleteBtn && button) {
        canvas.remove();
        deleteBtn.remove();
        button.remove();
        label.textContent = 'Je profielafbeelding';
      }
      return jsonData;
    });
}

button.onclick = getRijksData;


// prevent .fetchArt and .deleteSketch button from uploading data when clicked

const preventDefaultAction = (event) => {
  event.preventDefault();
};

document.querySelector('.fetchArt').addEventListener('click', preventDefaultAction);
document.querySelector('.deleteSketch').addEventListener('click', preventDefaultAction);




