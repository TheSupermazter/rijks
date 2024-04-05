// ANNIMATIONS

  const scrollers = document.querySelectorAll("scrollerContainer");

  // If a user hasn't opted in for recuded motion, then we add the animation
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }
  
  function addAnimation() {
    scrollers.forEach((scrollerContainer) => {
      
  
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
