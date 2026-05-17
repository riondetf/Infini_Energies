document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider-wrapper');

    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        const btnPrev = slider.querySelector('.prev');
        const btnNext = slider.querySelector('.next');

        if (!btnPrev || !btnNext || slides.length === 0) return;

        let currentIndex = 0;

        function updateSlider(direction = 'right') {
            const container = slider.querySelector('.slides-container');

            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'slide-left', 'slide-right');

                if (index === currentIndex) {
                    slide.classList.add('active');
                    slide.classList.add(direction === 'right' ? 'slide-left' : 'slide-right');
                }
            });

            // Animation de hauteur
            const activeSlide = slides[currentIndex];
            const newHeight = activeSlide.offsetHeight;

            container.style.height = newHeight + 'px';
        }

        function goToSlide(index) {
            const direction = index > currentIndex ? 'right' : 'left';
            currentIndex = (index + slides.length) % slides.length;
            updateSlider(direction);
        }

        btnNext.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        btnPrev.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
            if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
        });

        slider.setAttribute('tabindex', '0');

        updateSlider();
        setTimeout(() => {
            const container = slider.querySelector('.slides-container');
            container.style.height = slides[currentIndex].offsetHeight + 'px';
        }, 0);
    });
});