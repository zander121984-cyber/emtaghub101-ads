document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('menuToggle');
    const navMenu = document.getElementById('mainNav');

    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', function() {
            // Toggles the classes for both the icon and the menu panel
            navMenu.classList.toggle('is-open');
            toggleButton.classList.toggle('is-active');
        });

        // Optional: Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('is-open');
                toggleButton.classList.remove('is-active');
            });
        });
    }
});