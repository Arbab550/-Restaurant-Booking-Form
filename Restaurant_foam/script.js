document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    const form = document.getElementById('reservationForm');
    const toggleButton = document.getElementById('toggle-theme');
    const logo = document.querySelector('.logo');
    const body = document.body;

    // Initialize Pikaday
    const picker = new Pikaday({
        field: dateInput,
        format: 'YYYY-MM-DD',
        minDate: new Date(),
        onSelect: function(date) {
            dateInput.value = this.getMoment().format('YYYY-MM-DD');
        }
    });

    // Form submission validation
    form.addEventListener('submit', (e) => {
        const requiredFields = [
            'name',
            'email',
            'phone',
            'date',
            'time',
            'guests'
        ];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        } else {
            alert('Reservation submitted successfully!');
        }
    });

    // Toggle theme
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');

        updateImages();
    });

    // Load theme from localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(storedTheme === 'dark' ? 'dark-mode' : 'light-mode');
    }

    // Update images based on theme
    function updateImages() {
        if (body.classList.contains('dark-mode')) {
            logo.src = 'images/logo2.jpg';
            toggleButton.src = 'images/sun.jpeg';
        } else {
            logo.src = 'images/logo1.jpg';
            toggleButton.src = 'images/moon.jpeg';
        }
    }

    updateImages(); // Call on load to set initial images

    // Fix menu bar on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
