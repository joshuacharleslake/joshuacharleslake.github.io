// Custom Select Dropdowns

import Selectr from 'mobius1-selectr/dist/selectr.min';

const CustomSelects = () => {
    // Gather all the dropdowns
    const customSelectEls = [...document.querySelectorAll('.js-custom-select')];

    if (customSelectEls) {
        const customSelects = [];
        customSelectEls.forEach(element => {
            customSelects.push(
                new Selectr(element, {
                    searchable: false,
                    width: 300
                })
            );
        });
    }
};

CustomSelects();
