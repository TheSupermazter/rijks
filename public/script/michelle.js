



const containerZoom = document.getElementById("zoomContainer");
const img = document.getElementById("Image");

containerZoom.addEventListener("touchmove", (e) => {
    e.preventDefault(); // Prevent default scrolling behavior

    const touch = e.touches[0]; // Get the first touch
    const rect = containerZoom.getBoundingClientRect(); // Get the container's position relative to the viewport
    const x = touch.clientX - rect.left; // Calculate the x-coordinate relative to the container
    const y = touch.clientY - rect.top; // Calculate the y-coordinate relative to the container

    img.style.transformOrigin = `${x}px ${y}px`; // Set the transform origin to the touch position
    img.style.transform = "scale(2)"; // Apply a scale transformation
});
// https://www.youtube.com/watch?v=flOx9Jis938
  
  
  



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

  // const scrollers = document.querySelectorAll("scrollerContainer");

  // // If a user hasn't opted in for recuded motion, then we add the animation
  // if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  //   addAnimation();
  // }
  
  // function addAnimation() {
  //   scrollers.forEach((scrollerContainer) => {
      
  
  //     // Make an array from the elements within `.scroller-inner`
  //     const scrollerInner = scrollerContainer.querySelector(".scroller");
  //     const scrollerContent = Array.from(scrollerInner.children);
  
  //     // For each item in the array, clone it
  //     // add aria-hidden to it
  //     // add it into the `.scroller-inner`
  //     scrollerContent.forEach((item) => {
  //       const duplicatedItem = item.cloneNode(true);
  //       duplicatedItem.setAttribute("aria-hidden", true);
  //       scrollerInner.appendChild(duplicatedItem);
  //     });
  //   });
  // }

 
  


  
//   BRONN https://www.youtube.com/watch?v=iLmBy-HKIAw






















  