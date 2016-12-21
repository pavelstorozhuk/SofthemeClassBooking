﻿var largeView = $('#large');
var shortView = $('#short');
var headerTime = $('#header-time');
var roomSection = $('#room-section');
var roomEventLeftBlock = $('.roomevent-left-block');
var roomEventHeader = $('.roomevent-header-date-section');

var firstTimeCellHour;
var firstTimeCellDate;
var sliderTimeHour = dateNow.hour;
var currentMode = shortRoomEventTable;

var eventBlock;
var renderClassRooms;
var renderEvents;
var isUserCanEdit;


var roomCountPrevious;
var roomeventPoputId = 'popups-' + singleRoomeventPopupId;
var roomeventPopupDom = '<div id="' + roomeventPoputId + '" class="event-modal"></div>';

var dateNow = {
    year: date.getFullYear(),
    month: (date.getMonth() + 1),
    day: date.getDate(),
    hour: date.getHours(),
    minutes: date.getMinutes()
};

var roomeventAddStartDateTimePopup = {

    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minutes: 0

};

function setIsUserAdmin(userCanEdit) {
    isUserCanEdit = userCanEdit;
}

function setDateNow() {
    var date = new Date();

    dateNow = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1),
        day: date.getDate(),
        hour: date.getHours(),
        minutes: date.getMinutes()
    };

}

var dateNowStartClock = setInterval(setDateNow, oneMinute);
var roomeventCreateNewCorrectDateTime;
var roomeventModalSelectedClassRoom;

var roomeventModalCreateNewDateTimeTargetBegin = {
    year: dateNow.year,
    month: dateNow.month,
    day: dateNow.day,
    hour: dateNow.hour,
    minutes: dateNow.minutes
};


function getRoomeventModalSelectedClassRoom() {
    return roomeventModalSelectedClassRoom;
}

var roomeventModalCreateNewDateTimeTargetEnd = {
    year: dateNow.year,
    month: dateNow.month,
    day: dateNow.day,
    hour: dateNow.hour,
    minutes: dateNow.minutes
};


//Event adding to DOM section
$(document).off('click', '#large');
$(document).on('click', '#large', function () {

    if (!largeView.hasClass('fa-selected')) {
        largeView.addClass('fa-selected');
        shortView.removeClass('fa-selected');

        $('#event-date').attr('class', 'text-large');

        $('#roomevent-navigation').attr('class', 'roomevent-now-large');
        renderTime(longRoomEventTable);
        renderRooms(longRoomEventTable);

        currentMode = longRoomEventTable;
        renterStaticSliderTime();

        calendar.hide();
    }
});

$(document).off('click', '#short');
$(document).on('click', '#short', function () {
    if (!shortView.hasClass('fa-selected')) {
        shortView.addClass('fa-selected');
        largeView.removeClass('fa-selected');

        $('#event-date').attr('class', 'text');
        $('#roomevent-navigation').attr('class', 'roomevent-now');

        renderTime(shortRoomEventTable);
        renderRooms(shortRoomEventTable);

        currentMode = shortRoomEventTable;
        renterStaticSliderTime();

        calendar.show();
    }
});

$(document).off('click', '.eventblock-add');
$(document).on('click', '.eventblock-add', function (e) {


    $('.event-position').remove();
    $('body').append(roomeventPopupDom);

    $(`#${roomeventPoputId}`).css({
        'left': (e.pageX / 2),
        'top': e.pageY
    });

    loadSection(
        ajaxUrl.RoomEventPopupViewUrl,
        null,
        function (successResponse) {

            $(`#${roomeventPoputId}`).html(successResponse);

        },
        function (errorResponse) {
            eventPageDialogWindowError.show();
        });

});

$(document).off('click', '.eventblock-exist, .eventblock-lock');
$(document).on('click', '.eventblock-exist, .eventblock-lock', function (e) {

    $('.event-position').remove();

    var currentEventBlock = $(this);

    var selectedEventBlockType = currentEventBlock.attr('data-eventblock-type');
    var eventPrivate = currentEventBlock.attr('data-private');
    var currentEventId = currentEventBlock.attr('id').split('-')[1];

    $('body').append(roomeventPopupDom);
    $(`#${roomeventPoputId}`).css({
        'left': (e.pageX / 2),
        'top': e.pageY
    });


    if (eventPrivate === 'true') {

        getEventInfoVerbose(currentEventId, true)
           .done(function (successResponse) {

               $(`#${roomeventPoputId}`).html(successResponse);
               $('#event').removeClass('event-public').addClass('event-private');
               $('#event-header').attr('class', 'event-private-header');
               $('#event-modal-button-change, #event-modal-button-cancel ').addClass('event-button-change-private');

           });

    } else {

        getEventInfoVerbose(currentEventId, false)
            .done(function (successResponse) {
                $(`#${roomeventPoputId}`).html(successResponse);

            });
    }
});

$(document).off('mouseover', '.roomevent-room-cell-middle');
$(document).on('mouseover', '.roomevent-room-cell-middle', function (e) {

    if (!isUserCanEdit) {
        return;
    }

    var currentRoomCell = $(this);
    var existBlock = currentRoomCell.find('.eventblock-exist');

    if (currentRoomCell.find('.eventblock-add').length) {
        return;
    }

    var offset = currentRoomCell.offset();

    var currentRoomCellObject = {
        id: currentRoomCell.attr('id'),
        nextId: currentRoomCell.next(),
        dataLeftOccupied: parseInt(currentRoomCell.attr('data-left-occupied')),
        dataRightOccupied: parseInt(currentRoomCell.attr('data-right-occupied')),
        dataInsideEvent: currentRoomCell.attr('data-inside-event').split('-'),
        mouseRelativePosition: (e.pageX - offset.left)
    };

    var splittedDateTime = convertToDateObject(currentRoomCell.attr('id'));

    roomeventModalCreateNewDateTimeTargetBegin.year = splittedDateTime.year;
    roomeventModalCreateNewDateTimeTargetBegin.month = splittedDateTime.month;
    roomeventModalCreateNewDateTimeTargetBegin.day = splittedDateTime.day;
    roomeventModalCreateNewDateTimeTargetBegin.hour = splittedDateTime.hour;

    roomeventModalSelectedClassRoom = splittedDateTime.minutes; //On minutes place classroom id
    roomeventModalCreateNewDateTimeTargetBegin.minutes = Math.round(currentRoomCellObject.dataLeftOccupied / minutePerPixel);


    roomeventModalCreateNewDateTimeTargetEnd.year = splittedDateTime.year;
    roomeventModalCreateNewDateTimeTargetEnd.month = splittedDateTime.month;
    roomeventModalCreateNewDateTimeTargetEnd.day = splittedDateTime.day;
    roomeventModalCreateNewDateTimeTargetEnd.hour = splittedDateTime.hour;
    roomeventModalCreateNewDateTimeTargetEnd.minutes = roomeventModalCreateNewDateTimeTargetBegin.minutes;
    addValueToDate(roomeventModalCreateNewDateTimeTargetEnd, { minutes: minumumAllowedMinutes }, true);

    renderEventAdd(currentRoomCellObject);

}).on('mouseleave', '.roomevent-room-cell-middle', function () {
    $('.eventblock-add').remove();
});

$(document).off('click', '#roomevent-now');
$(document).on('click', '#roomevent-now', function () {
    resetCurrentCalendarCell();
    renderCalendar(currentCalendarCell.month);
    timeOffset = 0;
    renderTime(currentMode);
    renderRooms(currentMode);

    setDateHeader(currentCalendarCell);
    renterStaticSliderTime();
});

function listNextHour() {
    addValueToDate(currentCalendarCell, { hour: 1 }, true);
    render();
}

function listPreviousHour() {
    addValueToDate(currentCalendarCell, { hour: 1 }, false);
    render();
}

$(document).on('click', '#roomevent-time-before-part', listPreviousHour);
$(document).on('click', '#roomevent-time-next-part', listNextHour);

//Render functions 

function render() {

    renderCalendar(currentCalendarCell.month);

    setDateHeader(currentCalendarCell);

    renderTime(currentMode);
    renderRooms(currentMode);
    renterStaticSliderTime();

}

function renderTime(timeCellCount, resetTime) {

    var noReset = resetTime || true;

    var renderDate = {
        year: noReset ? currentCalendarCell.year : dateNow.year,
        month: noReset ? currentCalendarCell.month : dateNow.month,
        day: noReset ? currentCalendarCell.day : dateNow.day,
        hour: noReset ? currentCalendarCell.hour : dateNow.hour,
        minutes: noReset ? currentCalendarCell.minutes : dateNow.minutes,
    };

    headerTime.empty();

    headerTime.append('<div class="roomevent-time-cell roomevent-cell-first "></div>');

    firstTimeCellDate = 'hour-cell-' + renderDate.year + '-' + renderDate.month + '-' + renderDate.day + '-' + renderDate.hour;
    firstTimeCellHour = renderDate.hour;

    for (var cell = 1; cell <= timeCellCount; cell++) {
        var hourCellId = 'hour-cell-' + renderDate.year + '-' + renderDate.month + '-' + renderDate.day + '-' + renderDate.hour;
        headerTime.append('<div id="' + hourCellId + '" class="roomevent-time-cell roomevent-time-cell-middle"><div class="text">' + renderTimeMinutes(renderDate.hour, 0) + '</div></div>');

        addValueToDate(renderDate, { hour: 1 }, true);
    }

}

function renderRooms(timeCellCount, resetTime) {

    $('.-busy').each(function (i, obj) {
        var room = $(this);
        $(`#${room.attr('id')}`).attr("class", `plan-room-${room.attr('id')}-available plan-room -available`);
    });

    getClassRooms().done(function (rooms) {

        renderClassRooms = JSON.parse(rooms);
        var noReset = resetTime || true;

        roomSection.empty();
        $('#header-time-slider-zone').remove();

        for (var currentRoom = 1; currentRoom <= renderClassRooms.length; currentRoom++) {

            var renderDate = {
                year: noReset ? currentCalendarCell.year : dateNow.year,
                month: noReset ? currentCalendarCell.month : dateNow.month,
                day: noReset ? currentCalendarCell.day : dateNow.day,
                hour: noReset ? currentCalendarCell.hour : dateNow.hour,
                minutes: noReset ? currentCalendarCell.minutes : dateNow.minutes,
            };

            var currentRoomId = renderClassRooms[currentRoom - 1].Id;

            roomSection.append('<div id="room-row-' + currentRoomId + '"></div>');

            var currentRow = $('#room-row-' + currentRoomId);
            currentRow.append('<div class="roomevent-room-cell roomevent-cell-first">' +
                                     '<div class="roomdiv"><div class="text">' + renderClassRooms[currentRoom - 1].Name + '</div></div>' +
                                     '</div>');

            for (var cell = 0; cell < timeCellCount; cell++) {

                var cellId = renderDate.year + '-' + renderDate.month + '-' + renderDate.day + '-' + renderDate.hour + '-' + currentRoomId;
                addValueToDate(renderDate, { hour: 1 }, true);
                currentRow.append('<div id=' + cellId + ' class="roomevent-room-cell roomevent-room-cell-middle" data-left-occupied="0" data-right-occupied="0" data-inside-event="0"><div></div></div>');
            }
        }

        if (roomeventEventsByUser) {

            postData(ajaxUrl.EventUsersUrl, '', function (events) {
                renderEvents = JSON.parse(events);
                doEventStuff();
            });

        } else {

            var renderEventsDateTimeBegin = copyDate(currentCalendarCell);
            addValueToDate(renderEventsDateTimeBegin, { hour: defaultHourLeftOffsetEventLoading }, false);

            var renderEventsDateTimeEnd = copyDate(currentCalendarCell);
            addValueToDate(renderEventsDateTimeEnd, { hour: defaultHourRightOffsetEventLoading }, true);

            postData(ajaxUrl.EventsBriefUrl,
            {
                dateEventsFrom: convertToDateTime(renderEventsDateTimeBegin),
                dateEventsTo: convertToDateTime(renderEventsDateTimeEnd)
            },
                function (successResponse) {
                    renderEvents = JSON.parse(successResponse);
                    doEventStuff();
                },
                function (errorResponse) {
                    eventPageDialogWindowError.show();
                });

        }

        renderSliders(timeCellCount);
        renterStaticSliderTime();
        activateStaticSlider();

    });
}

//render event divs
var eventBlockRender;

function renderEventBlock(eventBlock, roomEventCellId) {

    var eventBlockRenderIcon = "";
    var descriptionPart = "";

    if (eventBlock.isPrivate) {

        eventBlockRenderIcon = '<i class="fa fa-lock fa-3x"></i>';
        if (eventBlock.blockType === eventBlockType.short) {
            eventBlockRender = '<div id="' + eventBlock.id + `" class="eventblock-lock short-time eventblock-block" data-classroom-id="${eventBlock.classRoomId}" data-private="true" data-eventblock-type="${eventBlockType.short}">`;
        } else {
            eventBlockRender = '<div id="' + eventBlock.id + `" class="eventblock-lock long-time eventblock-block" data-classroom-id="${eventBlock.classRoomId}" data-private="true" data-eventblock-type="${eventBlockType.long}">`;
        }

    } else {
        if (eventBlock.blockType === eventBlockType.short) {
            eventBlockRender = '<div id="' + eventBlock.id + `" class="eventblock-exist short-time eventblock-block" data-classroom-id="${eventBlock.classRoomId}" data-private="false" data-eventblock-type="${eventBlockType.short}">`;
        } else {
            eventBlockRender = '<div id="' + eventBlock.id + `" class="eventblock-exist long-time eventblock-block" data-classroom-id="${eventBlock.classRoomId}"  data-private="false" data-eventblock-type="${eventBlockType.long}">`;
            descriptionPart = '<div class="eventblock-description">';

            if (eventBlock.description == null || eventBlock.description.length <= 0) {
                descriptionPart += '<div class="text">&nbsp</div>' + '<div class="text">' + eventBlock.title + '</div></div>';
            } else {
                descriptionPart += '<div class="text">' + eventBlock.title + '</div>' + '<div class="text">' + eventBlock.description + '</div></div>';
            }

        }

    }

    eventBlockRender += '<div class="eventblock-time">' +
                  '<div class="text">' + eventBlock.timeStart + '</div>' +
                  '<div class="text"> - </div>' +
                  '<div class="text">' + eventBlock.timeEnd + '</div></div>' + descriptionPart +
                  eventBlockRenderIcon + '</div>';

    $(roomEventCellId).html(eventBlockRender);
    $('#' + eventBlock.id).css('width', eventBlock.width).css('left', eventBlock.left);

}

function getFreeLeftSpace(roomCellObject) {

    if (typeof (roomCellObject.attr('data-inside-event')) === "undefined") {
        return timeCellWidth;
    }

    var dataInsideEvent = roomCellObject.attr('data-inside-event').split('-');

    if (dataInsideEvent.length > 1) {

        return parseInt(dataInsideEvent[0]);

    } else {

        var leftOccupied = parseInt(roomCellObject.attr('data-left-occupied'));
        var rightOccupied = parseInt(roomCellObject.attr('data-right-occupied'));

        return leftOccupied == 0 ? (timeCellWidth - rightOccupied) : 0;
    }
}
function renderEventAdd(currentRoomCellObject) {
    //clause if mouse over existing event
    if (currentRoomCellObject.mouseRelativePosition > (timeCellWidth - currentRoomCellObject.dataRightOccupied)) {
        return;
    }

    //clause if current cell fully loaded
    if ((currentRoomCellObject.dataLeftOccupied != 0) &&
        (currentRoomCellObject.dataRightOccupied != 0) &&
        (timeCellWidth -
        (currentRoomCellObject.dataLeftOccupied + currentRoomCellObject.dataRightOccupied)
        < minumumAllowedTimeToBook)) {
        return;
    }

    //clause if next cell is loaded and not enough space for new event
    var freeSpaceNextCell = getFreeLeftSpace(currentRoomCellObject.nextId);
    var freeSpaceLeft = timeCellWidth - currentRoomCellObject.dataRightOccupied;
    if (minumumAllowedTimeToBook > freeSpaceLeft) {
        return;
    }


    if (currentRoomCellObject.dataInsideEvent.length > 1) {

        var leftStart = parseInt(currentRoomCellObject.dataInsideEvent[0]);
        var leftEnd = parseInt(currentRoomCellObject.dataInsideEvent[1]);
        var rightOffset = leftStart + leftEnd;

        var freeSpace = (timeCellWidth - rightOffset) + freeSpaceNextCell;

        if ((currentRoomCellObject.mouseRelativePosition >= leftStart)
            && (currentRoomCellObject.mouseRelativePosition <= rightOffset)
            || (minumumAllowedTimeToBook > leftStart) && (currentRoomCellObject.mouseRelativePosition < leftStart)
            || minumumAllowedTimeToBook > freeSpace) {
            return;
        }

        $('#' + currentRoomCellObject.id).append('<div id="new-' + currentRoomCellObject.id + '" class="eventblock-add">' +
                '<i class="fa fa-plus fa-2x"></i></div>');

        if (currentRoomCellObject.mouseRelativePosition < leftStart) {
            $('#new-' + currentRoomCellObject.id)
                .css('width', leftStart)
                .css('left', 0);
        } else {
            var actualWidth = (timeCellWidth - eventAddBlockCorrection) - rightOffset;
            var width = actualWidth < minumumAllowedTimeToBook ? minumumAllowedTimeToBook : actualWidth;
            $('#new-' + currentRoomCellObject.id)
                .css('width', width)
                .css('left', (rightOffset));
        }

    } else {

        //check if time is allowed

        $('#' + currentRoomCellObject.id).append('<div id="new-' + currentRoomCellObject.id + '" class="eventblock-add">' +
        '<i class="fa fa-plus fa-2x"></i></div>');

        var actualWidth = (timeCellWidth - eventAddBlockCorrection) - (currentRoomCellObject.dataLeftOccupied + currentRoomCellObject.dataRightOccupied);
        var width = actualWidth < minumumAllowedTimeToBook ? minumumAllowedTimeToBook : actualWidth;
        $('#new-' + currentRoomCellObject.id)
            .css('width', width)
            .css('left', currentRoomCellObject.dataLeftOccupied);
    }

}




function renderSliders(timeCellCount) {
    headerTime.append('<div id="header-time-slider-zone"></div>');
    $('#header-time-slider-zone').css('width', timeCellWidth * timeCellCount);

    $('#header-time-slider-zone').append(
    '<div id="slider-static">' +
    '<div class="slider-up-static"></div>' +
    '<div class="slider-down-static"></div>' +
    '<div class="slider-time-static">Сейчас</div>' +
    '</div>');

    $('#header-time-slider-zone').append(
            '<div id="slider">' +
            '<div class="slider-up"></div>' +
            '<div class="slider-down"></div>' +
            '<div class="slider-time"></div>' +
            '</div>');

    $('#slider, #slider-static').css('height', ((renderClassRooms.length * 49) + 35));
    $('.slider-time').html(renderTimeMinutes(firstTimeCellHour, 0));

    $('#slider').draggable({
        axis: "x",
        cursor: 'pointer',
        grid: [minutePerPixel, 0],
        containment: "#header-time-slider-zone",
        drag: function (event, ui) {

            var thisObject = $(this);

            renterSliderTime(thisObject.position().left);
            collision($('#slider'));
        }
    });

}


function collision(slider) {

    var visitedRooms = [];

    $('.eventblock-block').each(function (i, obj) {

        var block = $(this);

        if (include(visitedRooms, block.attr("data-classroom-id"))) {
            return true;
        }

        var x1 = slider.offset().left;
        var y1 = slider.offset().top;
        var h1 = slider.outerHeight(true);
        var w1 = slider.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;

        var x2 = block.offset().left;
        var y2 = block.offset().top;
        var h2 = block.outerHeight(true);
        var w2 = block.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;


        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {

            var busyClassRoomId = block.attr("data-classroom-id");
            $(`#${busyClassRoomId}`).attr("class", `plan-room-${busyClassRoomId}-available plan-room -available`);

        } else {
            var availableRoomId = block.attr("data-classroom-id");
            $(`#${availableRoomId}`).attr("class", `plan-room-${availableRoomId}-busy plan-room -busy`);
            visitedRooms.push(availableRoomId);
        }
    });


}

function include(arr, obj) {
    return (arr.indexOf(obj) != -1);
}

function renterStaticSliderTime() {

    var navigation;

    if (currentMode == shortRoomEventTable) {
        navigation = $('.roomevent-now');
    } else {
        navigation = $('.roomevent-now-large');
    }
    $('#roomevent-now').empty();

    var targetCellId = $('#hour-cell-' + dateNow.year + '-' + dateNow.month + '-' + dateNow.day + '-' + dateNow.hour);
    var targetCellIdPosition = targetCellId.position();

    if (targetCellIdPosition != undefined) {

        var sliderOffset = (targetCellIdPosition.left - fisrtTimeCellWidth) + (minutePerPixel * dateNow.minutes);
        $('#slider-static').css('left', sliderOffset);
    } else {
        navigation.show();

        var compareDatesResult = compareDates(currentCalendarCell, dateNow, false, true);

        if (compareDatesResult < 0) {
            $('#slider-static').hide();
            navigation.css('text-align', 'right');
            $('#roomevent-now').html('Сейчас <i class="fa fa-long-arrow-right" aria-hidden="true"></i>');
        } else {
            $('#slider-static').hide();
            navigation.css('text-align', 'left');
            $('#roomevent-now').html('<i class="fa fa-long-arrow-left" aria-hidden="true"></i> Сейчас');
        }
    }
}

function renterSliderTime(leftPosition) {
    var hours = Math.floor(leftPosition / (minutePerPixel * 60));
    var renderHours = firstTimeCellHour + hours;

    var minutes = Math.floor((leftPosition - (hours * 60 * minutePerPixel)) / minutePerPixel);

    while (renderHours >= 24) {
        renderHours -= 24;
    }

    $('.slider-time').html(renderTimeMinutes(renderHours, minutes));
    sliderTimeHour = renderHours;
}

//Functions


function setDateHeader(dateTimeParameters) {
    var dayOfWeek = getDayOfWeek(new Date(currentCalendarCell.year + '-' + currentCalendarCell.month + '-' + currentCalendarCell.day).getDay());

    $('#event-date').html(currentCalendarCell.day + ', ' + dayNames[dayOfWeek]);
}


//events from db:
//EventBlockViewModel  Id, ClassRoomId, BeginingDate, EndingDate
function doEventStuff() {
    calculateEventBlockPosition();
}

function calculateEventBlockPosition() {

    var events = renderEvents;

    for (var currentEvent = 0; currentEvent < events.length; currentEvent++) {

        var beginingDate = convertToDateObject(events[currentEvent].BeginingDate);
        var endinggDate = convertToDateObject(events[currentEvent].EndingDate);

        var hourBegin = beginingDate.hour;
        var hourEnd = endinggDate.hour;
        var minutesBegin = beginingDate.minutes;
        var minutesEnd = endinggDate.minutes;

        var hourBeginRelative = hourBegin - firstTimeCellHour;
        var hourEndRelative = hourEnd - firstTimeCellHour;

        if (hourBeginRelative < 0) {
            hourBeginRelative += 24;
        }
        if (hourEndRelative < 0) {
            hourEndRelative += 24;
        }

        var year = beginingDate.year;
        var month = beginingDate.month;
        var day = beginingDate.day;

        var classRoomId = events[currentEvent].ClassRoomId;

        var hoursDuration = hourEnd - hourBegin;

        var duration = (hourEnd * 60 + minutesEnd) - (hourBegin * 60 + minutesBegin);
        var leftPosition = minutesBegin * minutePerPixel;

        var width = duration * minutePerPixel;

        var eventBlock = {
            id: 'eventblock-' + events[currentEvent].Id,
            left: leftPosition,
            width: width,
            classRoomId: events[currentEvent].ClassRoomId,
            timeStart: renderTimeMinutes(hourBegin, minutesBegin),
            timeEnd: renderTimeMinutes(hourEnd, minutesEnd),
            title: events[currentEvent].Title,
            description: events[currentEvent].Description,
            blockType: duration < shortBlockMinimumTime ? eventBlockType.short : eventBlockType.long,
            isPrivate: events[currentEvent].IsPrivate

        };
        var cellIdFirst = '#' + year + '-' + month + '-' + day + '-' + hourBegin + '-' + classRoomId;

        if ((hourEnd == hourBegin) || ((hoursDuration == 1) && (minutesBegin == 0 && minutesEnd == 0))) {

            $(cellIdFirst).attr('data-inside-event', leftPosition + '-' + width);

            renderEventBlock(eventBlock, cellIdFirst);
            continue;


        } else if (hoursDuration > 0) {
            var dataRightOccupied = timeCellWidth - leftPosition - eventAddBlockCorrection;
            var dataLeftOccupied = Math.round(width - dataRightOccupied - eventAddBlockCorrection);
            while (dataLeftOccupied > timeCellWidth) {
                dataLeftOccupied -= timeCellWidth;
            }

            $(cellIdFirst).attr('data-right-occupied', dataRightOccupied);

            var cellIdLast = '#' + year + '-' + month + '-' + day + '-' + hourEnd + '-' + classRoomId;
            $(cellIdLast).attr('data-left-occupied', dataLeftOccupied);

            renderEventBlock(eventBlock, cellIdFirst);

        }

    }
}

function activateStaticSlider() {
    var sliderTime = setInterval(renterStaticSliderTime, sliderTimeInterval);
    renterStaticSliderTime();
}
