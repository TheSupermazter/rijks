const LabelPlusMinSectionContainers = document.getElementsByClassName('PlusMinContainer');
 
// Loop through each container
Array.from(LabelPlusMinSectionContainers).forEach((container, containerIndex) => {
  // Get the input and buttons inside each container
  const inputElement = container.querySelector('input');
  const buttons = container.getElementsByTagName('button');
 
  // Add click event listeners to the buttons with the corresponding index
  Array.from(buttons).forEach((button, buttonIndex) => {
    button.addEventListener('click', function () {
      updateQuantity(inputElement, buttonIndex);
    });
  });
});
 
function updateQuantity(inputElement, buttonIndex) {
  let currentValue = parseInt(inputElement.value, 10) || 0;
  // Ensure the value is a number; if not, default to 0
  inputElement.value = Math.max(0, currentValue + (buttonIndex === 1 ? 1 : -1));
}