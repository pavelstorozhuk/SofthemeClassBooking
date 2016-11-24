$(document)
       .ready(function () {

           var form = $("#feedback");
           var email = $("#email");
           var firstName = $("#firstName");
           var lastName = $("#lastName");
           var message = $("#message");

           $("#email, #firstName, #lastName, #message").keyup(function () {
               if ((email.val().length > 0) &&
                   (firstName.val().length > 0) &&
                   (lastName.val().length > 0) &&
                   (message.val().length > 0)) {

                   if (form.valid()) {
                       $("#submit").addClass("feedback-form-button-submit-ok");
                       $("#submit").removeClass("feedback-form-button-submit");
                   } else {
                       $("#submit").addClass("feedback-form-button-submit");
                       $("#submit").removeClass("feedback-form-button-submit-ok");
                   }
               }

           });
       });
