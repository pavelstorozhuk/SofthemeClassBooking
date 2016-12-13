var isEmailValid, iFirstNameValid, ifLastNameValid, isMessageValid;

function checkFormCorrectness() {

    if (isEmailValid && iFirstNameValid && ifLastNameValid && isMessageValid) {

        $('#submit').addClass('feedback-form-button-submit-ok');
        $('#submit').removeClass('feedback-form-button-submit');

    } else {
        $('#submit').addClass('feedback-form-button-submit');
        $('#submit').removeClass('feedback-form-button-submit-ok');
    }
}

function setEventHandlers() {

    $('#firstName').on('keyup', function () {
        iFirstNameValid = $('#firstName').valid();
        checkFormCorrectness();
    });

    $('#lastName').on('keyup', function () {
        ifLastNameValid = $('#lastName').valid();
        checkFormCorrectness();
    });

    $('#email').on('keyup', function () {
        isEmailValid = $('#email').valid();
        checkFormCorrectness();
    });

    $('#message').on('keyup', function () {
        isMessageValid = $('#message').valid();
        checkFormCorrectness();
    });

}




function successHandler(result) {
    $('#result-message').html(result.message);
    $("#feedback").trigger('reset');
    $("#submit").toggleClass('feedback-form-button-submit-ok feedback-form-button-submit');
}