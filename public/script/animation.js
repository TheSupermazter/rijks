// Define and initialize the `scrollers` variable with an array of elements
const scrollers = document.querySelectorAll('.scrollerContainer');

// Check if the `scrollers` variable is not empty before calling `addAnimation`
if (scrollers.length > 0) {
    // Call `addAnimation` function only if there are elements with the class 'scroller-container'
   
    }
else {
    console.error('No elements with class "scrollerontainer" found.');
}

// Define the `addAnimation` function
function addAnimation() {
    scrollers.forEach((scrollerContainer) => {
        scrollerContainer.setAttribute('data-animated', 'true');
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
