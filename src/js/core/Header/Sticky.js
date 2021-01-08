/**
 * Allows certain elements to become sticky after scrolling past a certain point
 * - Passing in elToStick, classToToggle, bodyPadding
 * - elToStick - @String
 * - classToToggle - @String
 * - bodyPadding - @Boolean
 */

class Sticky {
    constructor(elToStick) {
        this.elToStick = elToStick;
    }

    makeSticky() {
        const StickyEl = document.querySelector(this.elToStick);

        if (StickyEl) {
            const StickyElPosY = StickyEl.offsetTop;
            const StickyElScrollPast = StickyEl.clientHeight + StickyElPosY;
            const classToToggle = 'is-sticky';

            document.addEventListener('scroll', () => {
                const ScrollPos = window.pageYOffset;

                if (ScrollPos > StickyElScrollPast) {
                    if (StickyEl.classList.contains(classToToggle) === false) {
                        StickyEl.classList.add(classToToggle);
                    }
                } else {
                    StickyEl.classList.remove(classToToggle);
                }
            });
        }
    }
}

/*
 * Event Handlers
 */
const StickyNav = () => {
    new Sticky('.js-sticky-header').makeSticky();
};

StickyNav();
