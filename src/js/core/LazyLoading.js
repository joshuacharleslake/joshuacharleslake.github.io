// Adding support for background image lazy loading

const LazyLoading = () => {
    const getAttributeClass = () => {
        // We need to change the background loaded based on window size
        let attrName = 'data-bg';

        if (document.body.clientWidth <= 480) {
            attrName = 'data-bg-mobile';
        }

        return attrName;
    };

    const swapBackgroundImages = (e, attrName) => {
        const bg = e.getAttribute(attrName);

        if (bg) e.style.backgroundImage = `url(${bg})`;
    };

    // Added a resize event to switch between mobile/desktop images
    window.addEventListener('resize', () => {
        const lazyLoadEls = [...document.querySelectorAll('.lazyloaded')];

        lazyLoadEls.forEach(item => {
            swapBackgroundImages(item, getAttributeClass());
        });
    });

    document.addEventListener('lazybeforeunveil', e => {
        swapBackgroundImages(e.target, getAttributeClass());
    });
};

LazyLoading();
