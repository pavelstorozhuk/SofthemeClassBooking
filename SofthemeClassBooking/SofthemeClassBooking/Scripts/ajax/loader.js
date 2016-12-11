/*

THIS IS BEST:

function getName(personid) {
    var dynamicData = {};
    dynamicData["id"] = personID;
    return $.ajax({
      url: "getName.php",
      type: "get",
      data: dynamicData
    });
  }

  getName("2342342").done(function(data) {
    // Updates the UI based the ajax result
    $(".person-name").text(data.name); 
  });


*/

function loadSection(url, beforeSendHandler, errorHandler) {
    var result = {};

    return $.ajax({
        url: url,
        method: 'GET',
        cache: false,
        data: result,
        beforeSend: beforeSendHandler,
        error: errorHandler
    });

}

function postFormData(url, form, datatype, successHandler, errorHandler) {

    $.ajax({
        url: url,
        method: 'POST',
        data: form.serialize(),
        dataType: 'json' || datatype,

        success: successHandler,
        error: errorHandler
});

}

function postData(url, data, successHandler, errorHandler) {

    $.ajax({
        url: url,
        method: 'POST',
        data: data,

        success: successHandler,
        error: errorHandler
});

}


var beforeSendHandler = function (dom) {
    dom.show();
}

var errorHandler = function () {
    alert('Произошла ошибка при загрузке плана этажа. Попробуйте позже');
}
