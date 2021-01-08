// Custom Accordions

class Accordion {
    constructor(heading) {
        this.heading = heading;
        this.target = null;
    }

    openAccordion() {
        const accordionHeading = [...document.querySelectorAll(this.heading)];

        if (accordionHeading.length > 0) {
            accordionHeading.forEach(item => {
                let nextEl = item.nextElementSibling;

                if (!nextEl) nextEl = item.parentElement.nextElementSibling;

                item.addEventListener('click', e => {
                    e.preventDefault();

                    if (item.classList.contains('is-active')) {
                        item.classList.remove('is-active');

                        if (nextEl) {
                            nextEl.classList.remove('is-active');
                            nextEl.style.maxHeight = '0';

                            this.watchAccordion(nextEl, 'stop');
                        }
                    } else {
                        // Remove .is-active from all other headings
                        if (item.classList.contains('is-active')) {
                            item.classList.remove('is-active');
                        }

                        item.classList.add('is-active');

                        if (nextEl) {
                            nextEl.style.maxHeight = '0';
                            nextEl.classList.add('is-active');
                            nextEl.style.maxHeight = `${nextEl.scrollHeight + 20}px`;

                            // Track changes to the accordion div
                            this.watchAccordion(nextEl, 'start');
                        }
                    }
                });
            });
        }
    }

    watchAccordion(targetNode, type) {
        const el = targetNode;
        this.target = targetNode;

        // Callback function to execute when mutations are observed
        const callback = mutationsList => {
            mutationsList.forEach(mutation => {
                if (mutation.type === 'childList') {
                    el.style.maxHeight = '0';
                    el.style.maxHeight = `${targetNode.scrollHeight} px`;
                }
            });
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        if (type === 'start') {
            observer.observe(el, {
                attributes: false,
                childList: true,
                subtree: true
            });
        } else if (type === 'stop') {
            observer.disconnect();
        }
    }
}

const AccordionInit = () => {
    new Accordion('.js-accordion-title').openAccordion();
};

AccordionInit();
