# Form Validation Logic

This form validation logic serves as a basic means of providing reliable form validation logic with as little customisation as possible. The validation hinges heavily on the Constraint validation API, and much of the logic can be setup entirely through the use of HTML5 input attributes. So please ensure you check the input spec [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), in most cases this will be enough for the validation logic needed, you can work with required lengths, patterns, min lengths and more. It's worth noting that the browser knows what type of input it is, so it'll automatically check whether an email address is valid, or if your input is numeric.

The validation errors themselves will automatically be created by the script, and can be customised to appear at the top or bottom of the form.

For more complex logic you'll likely have to write these rules yourself, though regardless of the library you use you'd have to do this anyway! Though we can be sure to extend this validation component with common use cases as we go along.

## Getting Started

Firstly, setup your form HTML and tag it with an attribute you wish to target the form from, we'd recommend using a `js-` prefix on your classname so you can see that a script relies on this class.

```html
<form class="js-form-validate">
    <div class="form-group">
        <label for="first_name">First Name</label>
        <input
            type="text"
            required
            name="First Name"
            data-validate="Please enter a name"
            id="first_name"
            placeholder="Enter first name"
        />
    </div>

    <button type="submit">Submit</button>
</form>
```

Then to trigger the validation run the form validator from your chosen form selector.

```javascript
new FormValidation('.js-form-validate');
```

You then need to ensure you customise your inputs to allow the validator to correctly serve the right validation. Please note to trigger validation correctly you **must** provide the correct attributes. Please see below:

-   First up a `name=""` attribute is used to label which input is triggering an error, so please fill this out otherwise it won't be apparent which input is throwing the error in the error notice.
-   `type=""` attribute should be self explanatory - the browser will be able to correctly validate the input depending on the input type, so it should go without saying if you're collecting an email please ensure you use an `type="email"` attribute etc.
-   If a field needs to be filled out please tag it as `required`
-   `data-validate=""` should contain the validation message you wish to show when there is an error, please note that if an input is empty it'll ignore this and serve an empty error message instead.
-   Make use of all the HTML5 input attributes to further customise the validation, so `minlength`, `maxlength` and even `pattern` which will accept regular expressions and allow you to check URLs and all sorts. There are loads of these, and the validator should handle all of these.
-   `data-equals=""` attribute has been created, this attribute accepts a class or an ID of the target input that you want to compare to the one you're adding the equals `data-equals=""` to. This is great for things like password fields in sign up forms, where you might want to confirm whether the user has inputted the same password twice. For example consider the markup below:

```html
<div class="form-group">
    <label for="password">Password</label>
    <input
        type="password"
        name="Password"
        required
        class="form-control"
        id="password-input"
        placeholder="Enter password"
    />
</div>

<div class="form-group">
    <label for="password-match">Confirm Password</label>
    <input
        type="password"
        name="Confirm Password"
        required
        class="form-control"
        id="password-confirm"
        placeholder="Confirm password"
        data-validate="Your passwords do not match"
        data-equals="#password-input"
    />
</div>
```

For a full demo markup please check the `/form.php` on the root of the front end boilerplate for a full rundown.

### Regular Expressions

The `pattern=""` attribute can be used to great effect to ensure an inputs check against a regular expression. This can be particularly powerful for things like password fields where you may wish to force the user to use at least 1 capital letter and a symbol for example. Below are a list of a few common regular expressions to check against that may be useful during your build:

Must contain X number of characters or more (in this case it's 6 or more):

`pattern=".{6,}"`

Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters:

`pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"`

Must start with `http://` or `https://`:

`pattern="https?://.+"`

Replicating an email by only accepting `characters@characters.domain`

`pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"`

Please note, that it's worth making sure your validation message contains the exact requirements for the field in the validation error message. In some cases as a small text message next to the input too.

## Form Notifications

All notifications for the forms are automatically generated by the validation script, so you will never have to premake this markup. The messages themselves can be customised using the options object. For a full list of customisation options please see the Options section below.

## Options

The form validator accepts an options object, which will allow you to customise some of the basics of the validation. Please see below:

```javascript
const options = {
    // Accepts Boolean value, true attaches notifications at the end of the form, false at the top.
    appendNotificationsBottom: false,
    // Error container class
    errorContainerClass: 'error-list',
    // Error Title - The title for the error message when a form fails to validate
    errorTitleText: 'Please resolve the errors below:',
    // Error Title Class - Allows a custom class for the error title
    errorTitleClass: 'error-list-title',
    // Empty Input Error - The message to display for empty inputs
    emptyInputError: 'Please fill out this field',
    // Error list item class - Custom class for an error list item
    errorListItemClass: 'error-list-item',
    // Ajax Submit - Switches AJAX on/off
    ajax: false,

    // Ajax Success Container Custom Class
    ajaxSuccessContainerClass: 'success-message',
    // Ajax Success Title - Title for the AJAX success message
    ajaxSuccessTitle: 'Message Sent',
    // Ajax Sucess Title Custom Class - Custom class for the AJAX success title
    ajaxSuccessTitleClass: 'ajax-success-title',
    // Ajax Success Message - Message for the AJAX sucess
    ajaxSuccessMessage: 'Your details have been successfully sent.',
    // Ajax Success Message Custom Class - AJAX message text class
    ajaxSuccessMessageClass: 'ajax-success-message',

    // Ajax Error Container Custom Class
    ajaxErrorContainerClass: 'error-list',
    // Ajax Error Title - Title for AJAX error message
    ajaxErrorTitle: 'Error - Submission Failed',
    // Ajax Error Title Custom Class - custom class for the AJAX error title
    ajaxErrorTitleClass: 'error-list-title',
    // Ajax Error Message - Text for the AJAX error message
    ajaxErrorMessage:
        'Ooops, looks like there was a problem! Please try again later, or contact us if the problem persists.',
    // Ajax Error Message Custom Class - Custom class for the AJAX error message
    ajaxErrorMessageClass: 'error-list-item'
};

new FormValidation('.js-form-validate', options);
```

It's worth noting that all options that adjust class attributes can accept multiple values, e.g `errorTitleClass: 'error-list-title error-list-title--fancy'`. Just be sure to seperate each class with a space (obviously xD).

## Enabling AJAX Submissions

AJAX functionality has been added to the form validation, this can be initialized via a boolean value provided to the settings object when calling in the form validation:

```javascript
const form = new FormValidation(
        '.js-form-validate',
        {
            ajax: true
        }
    );

    form.init();
}
```

Please note: The AJAX URL is automatically being gathered from the action on the form tag you're initialising AJAX on.

```html
<form class="js-form-validate" action="my-ajax-url.php"></form>
```

So in the case above the AJAX url provided to the script will be `my-ajax-url.php`.

The core of the AJAX is being managed by Axios, and the form data is then serialised via the 'serialise' NPM package.

## AJAX Callbacks

AJAX calls can be customised to run an optional callback function after a forms submitted, please see below for an example:

```javascript
const testCallback = () => console.log('test is working wooooooo');

const form = new FormValidation(
    '.js-form-validate',
    {
        customNotifications: false,
        ajax: true
    },
    testCallback
);

form.init();
```

So above I've made a dumb function that will console log out 'test is working woooooo', I'm then parsing this function into the `FormValidation` as the third parameter. The form validator will then run this function when the form is submitted.

## Customising The AJAX

Naturally the AJAX out the box is exceedingly basic, so no doubt you'll need to make some slight adjustments when you want to use it. The most important function to be aware of if you do is the one below:

```javascript
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
```

The function above is the one that will run once the AJAX is submitted, the `processResponse` function will decide what the script will do when the response is given back. Likely all AJAX responses will be different, so you might want to alter the conditional to better work with what you're dealing with. At the moment it's just checking for a server response, if it's a 200 it'll pump out a success message, otherwise it'll run an error message.

At the moment`createResponseSuccessBlock()` and `createResponseErrorBlock()` will create a generic message depending on the response from the server. But parameters have been setup for both to allow you to parse through a title / message. So you could take the server response and parse them into the two functions if you wanted to. Failing that feel free to make your own class methods to handle what you want to happen!

## TODOS

-   [ ] Testing on EVERY input type
