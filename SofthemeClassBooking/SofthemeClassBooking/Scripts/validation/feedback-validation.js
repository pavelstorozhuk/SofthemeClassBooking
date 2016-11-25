$(document)
       .ready(function () {

           var form = $("#feedback");
        var isEmailValid, iFirstNameValid, ifLastNameValid, isMessageValid;
           var email = $("#email");
           var firstName = $("#firstName");
           var lastName = $("#lastName");
           var message = $("#message");

        email.keyup(function() {
            isEmailValid = email.valid();
        });

        firstName.keyup(function () {
            iFirstNameValid = firstName.valid();
        });

        lastName.keyup(function () {
            ifLastNameValid = lastName.valid();
        });

        message.keyup(function () {
            isMessageValid = message.valid();
        });

           $("#email, #firstName, #lastName, #message").keyup(function () {
               if (isEmailValid &&
                   iFirstNameValid &&
                   ifLastNameValid &&
                   isMessageValid) {

                   $("#submit").addClass("feedback-form-button-submit-ok");
                   $("#submit").removeClass("feedback-form-button-submit");

               } else {
                   $("#submit").addClass("feedback-form-button-submit");
                   $("#submit").removeClass("feedback-form-button-submit-ok");
               }
           });
});
