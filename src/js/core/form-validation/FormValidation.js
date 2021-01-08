/**
 * Form Validation
 *
 * @param {string} form element
 * @param {Object} options object
 */

import axios from 'axios/dist/axios';
import serialize from 'form-serialize';

class FormValidation {
    constructor(formElement, options, ajaxCallback) {
        // Elements
        this.form = document.querySelector(formElement);
        this.formInputs = null;
        this.errorList = null;
        this.ajaxCallback = ajaxCallback;

        // Settings
        this.defaultSettings = {
            // Accepts Boolean value, true attaches errors at the end of the form, false at the top.
            appendNotificationsBottom: false,
            // Error container class
            errorContainerClass: 'error-list',
            // Error Title
            errorTitleText: 'Please resolve the errors below:',
            // Error Title Class
            errorTitleClass: 'error-list-title',
            // Empty Input Error
            emptyInputError: 'Please fill out this field',
            // Error list item class
            errorListItemClass: 'error-list-item',
            // Ajax Submit
            ajax: false,
            // Ajax Success Container Custom Class
            ajaxSuccessContainerClass: 'success-message',
            // Ajax Sucess Title
            ajaxSuccessTitle: 'Message Sent',
            // Ajax Sucess Title Custom Class
            ajaxSuccessTitleClass: 'ajax-success-title',
            // Ajax Success Message
            ajaxSuccessMessage: 'Your details have been successfully sent.',
            // Ajax Success Message Custom Class
            ajaxSuccessMessageClass: 'ajax-success-message',
            // Ajax Error Container Custom Class
            ajaxErrorContainerClass: 'error-list',
            // Ajax Error Title
            ajaxErrorTitle: 'Error - Submission Failed',
            // Ajax Error Title Custom Class
            ajaxErrorTitleClass: 'error-list-title',
            // Ajax Error Message
            ajaxErrorMessage:
                'Ooops, looks like there was a problem! Please try again later, or contact us if the problem persists.',
            // Ajax Error Message Custom Class
            ajaxErrorMessageClass: 'error-list-item'
        };

        // Merging User Options with defaults
        this.settings = {
            ...this.defaultSettings,
            ...options
        };
    }

    /**
     * Init Form
     *
     * @desc The initial form setup function
     */
    init() {
        if (this.form) {
            // Preventing the ugly default HTML5 validation stuffs
            this.form.noValidate = true;

            // Getting all the inputs inside the form element and converting them from an object to and array
            this.formInputs = Object.keys(this.form.elements).map(i => this.form.elements[i]);

            // Triggering event listeners
            this.eventListeners();
        }
    }

    /**
     * Setting up listeners for the form
     */
    eventListeners() {
        this.form.addEventListener('submit', e => {
            this.formSubmit(e);
        });
    }

    /**
     * Form Submit Handler
     *
     * @param {Object} [event] passing the event object
     */
    formSubmit(event) {
        event.preventDefault();
        this.checkInputs();
    }

    /**
     * Check Inputs
     *
     * Iterating over all form inputs and running the correct validator on each one.
     */
    checkInputs() {
        if (this.formInputs) {
            // Creating an error array to push any errors into
            const errors = [];

            this.formInputs.forEach(input => {
                // Check Equals attribute
                if (input.dataset.equals) {
                    const comparisonInput = document.querySelector(input.dataset.equals);

                    // If the comparison fails, push the error to the errors array
                    if (comparisonInput.value !== input.value) {
                        return errors.push(input);
                    }
                }

                // Checking if the input is valid against the constraint API, if not push to the errors array
                if (!input.validity.valid) errors.push(input);

                return true;
            });

            // Creating error list if any exist, else remove the error list and submit the form
            if (errors.length > 0) {
                this.createErrorContainer(errors);
            } else {
                if (this.errorList) {
                    this.errorList.remove();
                    this.errorList = null;
                }

                // Checking if the form has been set to AJAX otherwise run normal submit
                if (this.settings.ajax === true) {
                    // Parsing through the AJAX callback function if present
                    this.ajaxSubmit(this.ajaxCallback);
                } else {
                    this.form.submit();
                }
            }
        }
    }

    /**
     * Generate container
     *
     * @param {Array} [errorArray] An array of inputs that have errors
     * @desc generates a container to append all our errors to
     */
    createErrorContainer(errorArray) {
        // Removing previous error list if the form had already been submitted
        if (this.errorList) this.errorList.remove();
        if (this.ajaxErrorMessage) this.ajaxErrorMessage.remove();
        if (this.successMessage) this.successMessage.remove();

        // Creating Container
        this.errorList = document.createElement('div');
        this.errorList.classList.add(this.settings.errorContainerClass);

        // Creating Error List Title
        const errorTitle = document.createElement('p');
        errorTitle.innerHTML = this.settings.errorTitleText;
        errorTitle.classList.add(this.settings.errorTitleClass);

        this.errorList.prepend(errorTitle);

        // Generating a list of errors
        errorArray.forEach(error => {
            error.classList.add('error');

            const errorItem = document.createElement('p');
            errorItem.classList.add(this.settings.errorListItemClass);

            // If a value is empty just ask them to fill it out else serve validation message from input
            if (error.value.length === 0) {
                errorItem.innerHTML = `<strong>${error.name}</strong> - ${this.settings.emptyInputError}`;
            } else {
                errorItem.innerHTML = `<strong>${error.name}</strong> - ${error.dataset.validate}`;
            }

            // Appending error item to the list;
            this.errorList.appendChild(errorItem);
        });

        // Depending on users settings appending error container to the top or bottom of the form.
        if (this.settings.appendNotificationsBottom) {
            this.form.append(this.errorList);
        } else {
            this.form.prepend(this.errorList);
        }

        this.errorList.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * AJAX Functionality
     *
     * @callback submitCallback
     * @param {submitCallback} Fires a callback before the form submits
     * @desc generates a container to append all our errors to
     */
    ajaxSubmit(submitCallback) {
        // AJAX URL automaically gathered from the form action attribute
        axios.post(this.form.action, serialize(this.form)).then(response => {
            this.processResponse(response);

            if (typeof submitCallback === 'function') {
                submitCallback(response);
            }
        });
    }

    /**
     * Process AJAX Response
     * @param {Object} [response] response from AJAX call
     */
    processResponse(response) {
        // Removing previous error list if the form had already been submitted
        if (this.errorList) this.errorList.remove();

        // Checking if the server response is an error or success
        if (response.status === 200) {
            this.createResponseSuccessBlock();
        } else {
            this.createResponseErrorBlock();
        }
    }

    /**
     * Create Success Message for AJAX
     *
     * @param {String} [title] - Optional value for success block title
     * @param {String} [message] - Optional value for success block message
     */
    createResponseSuccessBlock(title = false, message = false) {
        // Removing previous error and success list if the form had already been submitted
        if (this.errorMessage) this.errorMessage.remove();
        if (this.ajaxErrorMessage) this.ajaxErrorMessage.remove();
        if (this.successMessage) this.successMessage.remove();

        // Creating Container
        this.successMessage = document.createElement('div');
        this.successMessage.classList.add(this.settings.ajaxSuccessContainerClass);

        // Creating Success Message Title
        const successTitle = document.createElement('p');

        // If a title has been parsed display it, otherwise use default.
        if (title) {
            successTitle.innerHTML = title;
        } else {
            successTitle.innerHTML = this.settings.ajaxSuccessTitle;
        }

        // Adding custom class to success title
        successTitle.classList.add(this.settings.ajaxSuccessTitleClass);

        this.successMessage.prepend(successTitle);

        // Creating success message text for the block
        const successMessageText = document.createElement('p');

        // If a message has been parsed display it, otherwise use default.
        if (message) {
            successMessageText.innerHTML = message;
        } else {
            successMessageText.innerHTML = this.settings.ajaxSuccessMessage;
        }

        // Adding custom class to success message
        successMessageText.classList.add(this.settings.ajaxSuccessMessageClass);

        this.successMessage.append(successMessageText);

        // Depending on users settings appending success container to the top or bottom of the form.
        if (this.settings.appendNotificationsBottom) {
            this.form.append(this.successMessage);
        } else {
            this.form.prepend(this.successMessage);
        }

        this.successMessage.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Create Error Message for AJAX
     *
     * @param {String} [title] - Optional value for success block title
     * @param {String} [message] - Optional value for success block message
     */
    createResponseErrorBlock(title = false, message = false) {
        // Removing previous error list if the form had already been submitted
        if (this.errorMessage) this.errorMessage.remove();
        if (this.ajaxErrorMessage) this.ajaxErrorMessage.remove();
        if (this.successMessage) this.successMessage.remove();

        // Creating Container
        this.ajaxErrorMessage = document.createElement('div');
        this.ajaxErrorMessage.classList.add(this.settings.ajaxErrorContainerClass);

        // Creating Success Message Title
        const errorTitle = document.createElement('p');

        // If a title has been parsed display it, otherwise use default.
        if (title) {
            errorTitle.innerHTML = title;
        } else {
            errorTitle.innerHTML = this.settings.ajaxErrorTitle;
        }

        // Adding custom class to success title
        errorTitle.classList.add(this.settings.ajaxErrorTitleClass);

        this.ajaxErrorMessage.prepend(errorTitle);

        // Creating success message text for the block
        const errorMessageText = document.createElement('p');

        // If a message has been parsed display it, otherwise use default.
        if (message) {
            errorMessageText.innerHTML = message;
        } else {
            errorMessageText.innerHTML = this.settings.ajaxErrorMessage;
        }

        // Adding custom class to success message
        errorMessageText.classList.add(this.settings.ajaxErrorMessageClass);

        this.ajaxErrorMessage.append(errorMessageText);

        // Depending on users settings appending success container to the top or bottom of the form.
        if (this.settings.appendNotificationsBottom) {
            this.form.append(this.ajaxErrorMessage);
        } else {
            this.form.prepend(this.ajaxErrorMessage);
        }

        this.ajaxErrorMessage.scrollIntoView({ behavior: 'smooth' });
    }
}

const init = () => {
    // const testCallback = () => console.log('test is working wooooooo');

    const form = new FormValidation('.js-form-validate', {
        customNotifications: false,
        ajax: true
    });

    form.init();
};

init();
