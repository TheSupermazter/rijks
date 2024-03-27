

document.addEventListener('DOMContentLoaded', function () {
    const image = document.getElementById('zoomable-image');
    let isDragging = false;
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;
    let translateX = 0;
    let translateY = 0;
    let currentScale = 1;
    const maxZoom = 3; // Set your maximum zoom level here
    const zoomIncrement = 0.5; // Set the amount of zoom increment per tap


    // Function: tap event
    function handleTap(event) {
        currentScale = Math.min(maxZoom, currentScale + zoomIncrement);
        image.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
    }

    // Function: touch start event
    function handleTouchStart(event) {
        if (event.touches.length === 1 && currentScale > 1) {
            isDragging = true;
            initialX = event.touches[0].clientX - translateX;
            initialY = event.touches[0].clientY - translateY;
        }
    }




    // Function: touch move event
    function handleTouchMove(event) {
        if (isDragging) {
            currentX = event.touches[0].clientX;
            currentY = event.touches[0].clientY;
            
            if (currentScale <=2.5) {
                translateX = Math.max(Math.min(currentX - initialX, image.offsetWidth * (currentScale - 1) / 4), image.offsetWidth * (1 - currentScale) / 4);
                translateY = Math.max(Math.min(currentY - initialY, image.offsetHeight * (currentScale - 1) / 4), image.offsetHeight * (1 - currentScale) / 4);
            } else {
                // If the scale is not greater than 1, reset the translation
                translateX = Math.max(Math.min(currentX - initialX, image.offsetWidth * (currentScale - 1) / 2), image.offsetWidth * (1 - currentScale) / 2);
                translateY = Math.max(Math.min(currentY - initialY, image.offsetHeight * (currentScale - 1) / 2), image.offsetHeight * (1 - currentScale) / 2);
            }
    
            image.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;

        }
    }
    


    // Function: touch end event
    function handleTouchEnd(event) {
        isDragging = false;
    }


    // Add event listeners
    image.addEventListener('click', handleTap);
    image.addEventListener('touchstart', handleTouchStart);
    image.addEventListener('touchmove', handleTouchMove);
    image.addEventListener('touchend', handleTouchEnd);
});



document.addEventListener('DOMContentLoaded', function () {
    const changingImage = document.getElementById('zoomable-image');
    const dynamicButton = document.querySelector('.SoundButton'); // Select the first element with class 'SoundButton'
    const buttonOffset = 20; // Offset from the bottom of the image

    // Function to update the position of the button
    function updateButtonPosition() {
        const imageRect = changingImage.getBoundingClientRect();
        const imageHeight = changingImage.offsetHeight;
        const buttonHeight = dynamicButton.offsetHeight;

        // Calculate the new top position for the button
        const newTop = imageRect.top + imageHeight - buttonHeight - buttonOffset;

        // Set the new position of the button
        dynamicButton.style.left = imageRect.left + 'px';
        dynamicButton.style.top = newTop + 'px';
    }

    // Initial position update
    updateButtonPosition();

    // Update position when the window is resized
    window.addEventListener('resize', updateButtonPosition);

    // Example: Replace the image and update button position
    function replaceImage(newImageUrl) {
        changingImage.src = newImageUrl;
        changingImage.onload = function() {
            updateButtonPosition();
        };
    }

    // Example: Replace the image with a new one
    // replaceImage('second-image.jpg');
});





//  **** POP-UPS ****
document.addEventListener('DOMContentLoaded', function () {
    var openButtons = document.querySelectorAll('.openButton');
    var popups = document.querySelectorAll('.popup-container');

    openButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            var popup = popups[index]; // Select the corresponding popup element
            if (popup.style.display === "none" || popup.style.display === "") {
                popup.style.display = "block";
            } else {
                popup.style.display = "none";
            }
        });
    });
});



// *** BACK TO TOP BUTTON ***
document.addEventListener('DOMContentLoaded', function () {
    // Get the button element
    var backToTopBtn = document.querySelector('.BackToTopBtn');
  
    backToTopBtn.addEventListener('click', function () {
        scrollToTop();
    });
  
    // Function to smoothly scroll to the top
    function scrollToTop() {
        const scrollOptions = {
            top: 0,
            behavior: 'smooth'
        };
  
        // For modern browsers
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo(scrollOptions);
        } else {
            // For browsers that do not support smooth scrolling
            window.scrollTo(scrollOptions.top, scrollOptions.top);
        }
    }
  });






// ANNIMATIONS

  const scrollers = document.querySelectorAll(".scrollerContainer");

  // If a user hasn't opted in for recuded motion, then we add the animation
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }
  
  function addAnimation() {
    scrollers.forEach((scrollerContainer) => {
      // add data-animated="true" to every `.scroller` on the page
      scrollerContainer.setAttribute("data-animated", true);
  
      // Make an array from the elements within `.scroller-inner`
      const scrollerInner = scrollerContainer.querySelector(".scroller");
      const scrollerContent = Array.from(scrollerInner.children);
  
      // For each item in the array, clone it
      // add aria-hidden to it
      // add it into the `.scroller-inner`
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
//   BRONN https://www.youtube.com/watch?v=iLmBy-HKIAw
















  getArt("etsen");
  async function getArt(technique) {
    const response = await fetch("https://www.rijksmuseum.nl/api/nl/collection?key=IwHqQrUI&technique=" + technique);
    const artList = await response.json();
    console.log(artList);
    document.getElementsByClassName("popup-container")[0].getElementsByTagName("li")[0].getElementsByTagName("h3")[0].innerHTML = (artList.count);
    console.log(artList);
  }






  