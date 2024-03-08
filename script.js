

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
            // translateX = currentX - initialX;
            // translateY = currentY - initialY;
            translateX = Math.max(Math.min(currentX - initialX, image.offsetWidth * (currentScale - 1) /4), image.offsetWidth * (1 - currentScale) / 4);
            translateY = Math.max(Math.min(currentY - initialY, image.offsetHeight * (currentScale - 1) / 4), image.offsetHeight * (1 - currentScale) / 4);

            // translateX = Math.max(Math.min(currentX - initialX, image.offsetWidth * (currentScale - 1)), -image.offsetWidth * (currentScale - 1));
            // translateY = Math.max(Math.min(currentY - initialY, image.offsetHeight * (currentScale - 1)), -image.offsetHeight * (currentScale - 1));



            // if els statment reken uit wat de waarden van translateX/Y if negative 



            console.log(image.offsetHeight)
            console.log(image.offsetWidth)
            image.style.transform = `scale(${currentScale}) translate(${Math.min(translateX,image.offsetWidth/currentScale)}px, ${translateY}px)`;
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

