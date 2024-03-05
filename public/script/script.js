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
