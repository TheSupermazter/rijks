const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    const label = input.previousElementSibling;

    input.addEventListener('focus', () => {
        label.classList.add('focus');
    });

    input.addEventListener('blur', () => {
        label.classList.remove('focus');
    });
});
