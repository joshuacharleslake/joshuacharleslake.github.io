// Flickity Slider

import 'flickity-imagesloaded';
import Flickity from 'flickity';

const Sliders = () => {
    const sliders = [];
    [...document.querySelectorAll('.js-slider')].forEach(slider => {
        sliders.push(new Flickity(slider));
    });
};

Sliders();
