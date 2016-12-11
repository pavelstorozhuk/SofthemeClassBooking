var planLoadingDiv = $('#plan-loading');
var mapLoadingDiv = $('#map-loading');
var roomEventLoadingDiv = $('#roomevent-loading');
var planSection = $('#plan-section');

var compareToDate = {};
var eventNewDateTimeBegin = {};

var dateCorrect = true;
var checkFunctionInterval;
var minumumAllowedMinutes = 20;
var availableRooms = {};


function renderPlanSection(url) {

    loadSection(url, beforeSendHandler(planLoadingDiv))
          .done(function (result) {

              $('#plan-section').html(result);
              $('#plan-loading').hide();

          });

}

function renderMapSection(url) {

    loadSection(url, beforeSendHandler(mapLoadingDiv))
    .done(function (result) {

        $('#map-section').html(result);
        $('#map-loading').hide();

    });
}


function renderRoomEventSection(url) {

    loadSection(url, beforeSendHandler(roomEventLoadingDiv))
    .done(function (result) {

        $('#roomevent-section').html(result);
        $('#roomevent-loading').hide();


        resetCurrentCalendarCell();
        renderCalendar(currentCalendarMonth);
        setDateHeader(currentCalendarCell);
        renderTime(shortRoomEventTable);
        renderRooms(shortRoomEventTable);
        activateStaticSlider();

    });

}

function submitNewEvent() {
    debugger;
    if ($('#event-title').val().length >= 1) {

        $('.error-message').hide();

        if (dateCorrect) {
            //check, if room is not busy at this time
            debugger;
            var eventNew = bindValuesToObject();

            var form = $('#__AjaxAntiForgeryForm');
            var token = $('input[name="__RequestVerificationToken"]', form).val();

            $.ajax( {
                url: '/Event/Create',
                type: 'POST',
                data: {
                    __RequestVerificationToken: token, 
                    eventModel: JSON.stringify(eventNew)
                },
                //event: JSON.stringify(eventNew)
                error: function(result) {
                    console.log(result);
                },

                done: function(result) {
                    alert(result);
                }
            });

            //postData('/Event/Create', eventNew).done(function() {
            //    alert('done submit!');
            //});

        }

    } else {
        $('#event-title-error').show();
        return;
    }
}

function bindValuesToObject() {
    return {
        Title: $('#event-title-error').val(),
        UserId: $('#user-id').val(),
        ClassRoomId: $('#event-room-select').val(),
        Organizer: $('#event-organizer').val(),
        BeginingDate: convertToDateTime(eventNewDateTimeBegin),
        EndingDate: convertToDateTime(compareToDate),
        Description: $('#event-description').val(),
        IsPublic: $('#checkboxOneInput').is(':checked'),
        IsAuthorShown: $('#event-show-author').is(':checked'),
        IsParticipantsAllowed: $('#event-register-all').is(':checked')
    }
}


function checkDateTime() {

    var dateActualComparisonResult = compareDates(eventNewDateTimeBegin, dateNow, false, true);
    var timeComparisonResult = compareTime({ hour: eventNewDateTimeBegin.hour, minutes: (eventNewDateTimeBegin.minutes + minumumAllowedMinutes) }, compareToDate);

    if ((timeComparisonResult) > 0 || (dateActualComparisonResult < 0)) {
        $("#event-date-error").show();
        dateCorrect = false;
    } else {
        $("#event-date-error").hide();
        dateCorrect = true;
    }

}

function renderNewEventDateTime(dateTime) {
    var renderedTime = renderTimeMinutes(dateTime.hour, dateTime.minutes, true);

    $('#date-day-value').html(dateTime.day);
    $('#date-month-value').html(monthNamesAccusative[dateTime.month - 1]);
    $('#timebegin-hours-value').html(renderedTime.hour);
    $('#timebegin-minutes-value').html(renderedTime.minutes);

    checkDateTime();
}

function renderNewEventDateTimeEnd(dateTime) {
    var renderedTime = renderTimeMinutes(dateTime.hour, dateTime.minutes, true);

    $('#timeend-hours-value').html(renderedTime.hour);
    $('#timeend-minutes-value').html(renderedTime.minutes);

}

function addDayToEvent() {
    addValueToDate(eventNewDateTimeBegin, { day: 1 }, true);
    renderNewEventDateTime(eventNewDateTimeBegin);
}

function subDayToEvent() {
    addValueToDate(eventNewDateTimeBegin, { day: 1 }, false);
    renderNewEventDateTime(eventNewDateTimeBegin);
}

function addMonthToEvent() {

    addValueToDate(eventNewDateTimeBegin, { month: 1 }, true);
    renderNewEventDateTime(eventNewDateTimeBegin);
}

function subMonthToEvent() {
    addValueToDate(eventNewDateTimeBegin, { month: 1 }, false);
    renderNewEventDateTime(eventNewDateTimeBegin);
}

function addHourToEventBegin() {

    addValueToDate(eventNewDateTimeBegin, { hour: 1 }, true);
    renderNewEventDateTime(eventNewDateTimeBegin);
    checkDateTime();

}

function subHourToEventBegin() {
    addValueToDate(eventNewDateTimeBegin, { hour: 1 }, false);
    renderNewEventDateTime(eventNewDateTimeBegin);
    checkDateTime();
}

function addMinutesToEventBegin() {

    addValueToDate(eventNewDateTimeBegin, { minutes: 1 }, true);
    renderNewEventDateTime(eventNewDateTimeBegin);
    checkDateTime();
}

function subMinutesToEventBegin() {

    addValueToDate(eventNewDateTimeBegin, { minutes: 1 }, false);
    renderNewEventDateTime(eventNewDateTimeBegin);
    checkDateTime();
}

function addHourToEventEnd() {
    addValueToDate(compareToDate, { hour: 1 }, true);
    renderNewEventDateTimeEnd(compareToDate);
    checkDateTime();

}

function subHourToEventEnd() {
    addValueToDate(compareToDate, { hour: 1 }, false);
    renderNewEventDateTimeEnd(compareToDate);
    checkDateTime();
}

function addMinutesToEventEnd() {
    addValueToDate(compareToDate, { minutes: 1 }, true);
    renderNewEventDateTimeEnd(compareToDate);
    checkDateTime();
}

function subMinutesToEventEnd() {
    addValueToDate(compareToDate, { minutes: 1 }, false);
    renderNewEventDateTimeEnd(compareToDate);
    checkDateTime();
}


function checkCurrentTimeInterval(cancel) {

    if (cancel) {
        clearInterval(checkFunctionInterval);
    } else {
        checkFunctionInterval = setInterval(checkDateTime, 60 * 1000);
    }

}

function setNavigarionEventHandlers(urlCreateEvent) {

    $('nav').on('click', '#add-event', function () {

        loadSection(urlCreateEvent).done(function (result) {
            $('#event-modal-position').html(result);
            $('#lock').show();

            eventNewDateTimeBegin = {
                year: dateNow.year,
                month: dateNow.month,
                day: dateNow.day,
                hour: dateNow.hour,
                minutes: (dateNow.minutes + 1)
            };

            compareToDate = {
                year: dateNow.year,
                month: dateNow.month,
                day: dateNow.day,
                hour: (dateNow.hour + 1),
                minutes: dateNow.minutes
            }

            $('#submit-section').on('click', '#event-new-submit', submitNewEvent);

            renderNewEventDateTime(eventNewDateTimeBegin);
            renderNewEventDateTimeEnd(compareToDate);

            $('.event-when').on('click', '#date-day-up', addDayToEvent);
            $('.event-when').on('click', '#date-day-down', subDayToEvent);

            $('.event-when').on('click', '#date-month-up', addMonthToEvent);
            $('.event-when').on('click', '#date-month-down', subMonthToEvent);

            $('.event-when').on('click', '#timebegin-hours-up', addHourToEventBegin);
            $('.event-when').on('click', '#timebegin-hours-down', subHourToEventBegin);

            $('.event-when').on('click', '#timebegin-minutes-up', addMinutesToEventBegin);
            $('.event-when').on('click', '#timebegin-minutes-down', subMinutesToEventBegin);

            $('.event-when').on('click', '#timeend-hours-up', addHourToEventEnd);
            $('.event-when').on('click', '#timeend-hours-down', subHourToEventEnd);

            $('.event-when').on('click', '#timeend-minutes-up', addMinutesToEventEnd);
            $('.event-when').on('click', '#timeend-minutes-down', subMinutesToEventEnd);

            checkCurrentTimeInterval();
            getRoomIdNames();
        });

    });

    $('#event-modal-position').on('click', '#event-new-close', function () {
        checkCurrentTimeInterval(true);
        $('#event-modal-position').empty();
        $('#lock').hide();
    });

}

function getRoomIdNames() {
    loadSection('/Classroom/GetNameId').done(function (result) {
        debugger;
        availableRooms = JSON.parse(result);
        var optionList = '';

        for (var i = 0; i < availableRooms.length; i++) {
            optionList += '<option value="' + availableRooms[i].Id + '">' + availableRooms[i].Name + '</option>';
        }

        $('#event-room-select').html(optionList);

    });
}

function setStandartPlanRoomEventHandlers(urlPlanRoomAdditional, urlPlanRoomPage) {

    $('#plan-section').on('mouseover', '.plan-room', function () {
        var planRoom = $(this);
        var planRoomId = planRoom.attr('id');

        if (planRoom.hasClass('-available')) {

            $('#show, #plan-room-line').show();

            var ajaxUrl = urlPlanRoomAdditional + '/' + planRoomId;

            loadSection(ajaxUrl).done(function (result) {
                $('#show').html(result);
                $('#plan-room-line').attr('class', 'show plan-room-line-detail-' + planRoomId);
            });

        }
    });

    $('#plan-section').on('mouseleave', '.plan-room', function () {
        $('#show, #plan-room-line').hide();
    });

    $('#plan-section').on('click', '.plan-room', function () {
        window.location.href = urlPlanRoomPage + '/' + $(this).attr('id');
    });

}