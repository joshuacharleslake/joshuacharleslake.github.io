// LIBRARY IMPORTS ONLY

import 'svgxuse/svgxuse';
import 'lazysizes/lazysizes';

import 'mobius1-selectr/dist/selectr.min';

import axe from 'axe-core/axe.min';

if (
    window.location.href.includes('front-end-boilerplate') ||
    window.location.href.includes('thetestlink')
) {
    axe.run(function(err, results) {
        if (err) throw err;
        if (results.violations.length === 0) {
            console.log('%c There are no accessibility issues.', 'background: green; color: white');
        } else {
            console.log('%c Accessibility Issues:', 'background: red; color: white');

            console.log(results.violations, 'background: red; color: white');
        }
    });

    // Html validator
    (async () => {
        const validator = require('html-validator');

        try {
            const result = await validator({
                url: window.location.href,
                format: 'json',
                isLocal: true
            });

            if (result.messages.length > 0) {
                console.log('%c HTML Issues:', 'background: red; color: white');
                console.table(result);
            } else {
                console.log(
                    '%c No W3C Validation errors have been found!',
                    'background: green; color: white'
                );
            }
        } catch (error) {
            console.error(`%c`, error, 'background: red; color: white');
        }
    })();
}
