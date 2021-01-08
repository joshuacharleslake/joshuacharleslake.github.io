// FadeinSection
const FadeInSection = () => {
    let elements;
    let windowHeight;

    const init = () => {
        elements = document.querySelectorAll('.hidden');
        windowHeight = window.innerHeight;
    };

    const checkPosition = () => {
        for (let i = 0; i < elements.length; i += 1) {
            const element = elements[i];
            const positionFromTop = elements[i].getBoundingClientRect().top;

            if (positionFromTop - windowHeight <= 0) {
                element.classList.add('fade-in-section');
                element.classList.remove('hidden');
            } else {
                element.classList.remove('fade-in-section');
                element.classList.add('hidden');
            }
        }
    };

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);

    init();
    checkPosition();
};

FadeInSection();
