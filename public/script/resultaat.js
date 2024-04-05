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
