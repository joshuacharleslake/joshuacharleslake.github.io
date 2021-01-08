// Custom Modals

const Modals = () => {
    const modalButtons = [...document.querySelectorAll('.js-open-modal')];
    const modalClose = [...document.querySelectorAll('.js-close-modal')];

    if (modalButtons) {
        // Open Modal
        modalButtons.forEach(element => {
            const openModal = () => {
                document
                    .querySelector(`#${element.dataset.modal}`)
                    .classList.add('is-active-modal');

                return false;
            };

            element.addEventListener('click', openModal);
        });

        // Close Modal
        modalClose.forEach(element => {
            const closeModal = () => {
                document.querySelector('.is-active-modal').classList.remove('is-active-modal');
            };

            element.addEventListener('click', closeModal);

            // Close on ESC
            window.onkeydown = e => {
                if (e.keyCode === 27) {
                    closeModal();
                }
            };

            // Click off modal inner to close
            document.addEventListener('click', e => {
                if (e.target.classList.contains('is-active-modal'))
                    document.querySelector('.is-active-modal').classList.remove('is-active-modal');
            });
        });
    }
};

Modals();
