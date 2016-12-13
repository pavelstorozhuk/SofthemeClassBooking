﻿var largeView = $('#large');
var shortView = $('#short');
var headerTime = $('#header-time');
var roomSection = $('#room-section');

var roomEventLeftBlock = $('.roomevent-left-block');
var roomEventHeader = $('.roomevent-header-date-section');

//var roomNames = ['Einstein Classroom', 'Tesla Classroom', 'Newton Classroom'];

var fisrtTimeCellWidth = 126;
var timeCellWidth = 124;
var minutePerPixel = (timeCellWidth / 60);

var firstTimeCellHour;
var firstTimeCellDate;

var sliderTimeInterval = 1000 * 60;

var shortRoomEventTable = 5;
var longRoomEventTable = 8;
var currentMode = shortRoomEventTable;
var timeOffset = 0;
var eventBlock;
var eventAddBlockCorrection = 2;
var shortBlockMinimumTime = 40;

var eventBlockType = { short: 0, long: 1 };

var renderClassRooms;
var renderEvents;

var minumumAllowedTimeToBook = 20 * minutePerPixel;
var roomCountPrevious;

//Event adding to DOM section

$(document).on('click', '#large', function () {

    if (!largeView.hasClass('fa-selected')) {
        largeView.addClass('fa-selected');
        shortView.removeClass('fa-selected');

        $('#roomevent-navigation').attr('class', 'roomevent-now-large');
        renderTime(longRoomEventTable);
        renderRooms(longRoomEventTable);

        currentMode = longRoomEventTable;
        renterStaticSliderTime();

        calendar.hide();
    }
});

$(document).on('click', '#short', function () {
    if (!shortView.hasClass('fa-selected')) {
        shortView.addClass('fa-selected');
        largeView.removeClass('fa-selected');

        $('#roomevent-navigation').attr('class', 'roomevent-now');

        renderTime(shortRoomEventTable);
        renderRooms(shortRoomEventTable);

        currentMode = shortRoomEventTable;
        renterStaticSliderTime();

        calendar.show();
    }
});




$(document).on('click', '.eventblock-exist', function (e) {

    var currentEventId = $(this).attr('id').split('-')[1];
    var currentEventBlockId = 'event-modal-' + currentEventId;

    $('body').append('<div id="' + currentEventBlockId + '" class="event-modal"></div>');
    $('#' + currentEventBlockId)
        .css({
            'left': (e.pageX/2),
            'top': e.pageY
        });

    getEventInfoVerbose(currentEventId)
        .done(function(eventPopup) {
            $('#' + currentEventBlockId).html(eventPopup);
            $('#' + currentEventBlockId).on('click', '#event-modal-' + currentEventId + '-close', function() {
                $('#' + currentEventBlockId).remove();
            });
        });

});


$(document).on('mouseover', '.roomevent-room-cell-middle', function (e) {

    var currentRoomCell = $(this);
    var existBlock = currentRoomCell.find('.eventblock-exist');

    if (currentRoomCell.find('.eventblock-add').length ) {
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

    renderEventAdd(currentRoomCellObject);


    //console.log(e.pageX - offset.left);


}).on('mouseleave', '.roomevent-room-cell-middle', function () {
    $('.eventblock-add').remove();
});

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
    headerTime.append('<div class="roomevent-time-cell"></div>');

    firstTimeCellDate = 'hour-cell-' + renderDate.year + '-' + renderDate.month + '-' + renderDate.day + '-' + renderDate.hour;
    firstTimeCellHour = renderDate.hour;

    for (var cell = 1; cell <= timeCellCount; cell++) {
        var hourCellId = 'hour-cell-' + renderDate.year + '-' + renderDate.month + '-' + renderDate.day + '-' + renderDate.hour;
        headerTime.append('<div id="' + hourCellId + '" class="roomevent-time-cell roomevent-time-cell-middle">' + renderTimeMinutes(renderDate.hour, 0) + '</div>');

        addValueToDate(renderDate, { hour: 1 }, true);
    }

}

function renderRooms(timeCellCount, resetTime) {

    console.log(renderClassRooms);
    
    getClassRooms().done(function (rooms) {

        renderClassRooms = JSON.parse(rooms);

        renderSliders(timeCellCount);
        renterStaticSliderTime();

        var noReset = resetTime || true;

        roomSection.empty();

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
            currentRow.append('<div class="roomevent-room-cell">' +
                                     '<div class="roomdiv">' + renderClassRooms[currentRoom - 1].Name + '</div>' +
                                     '</div>');

            for (var cell = 0; cell < timeCellCount; cell++) {

                var cellId = currentRoomId + '_' + renderDate.year + '-' + renderDate.month
                    + '-' + renderDate.day + '_' + renderDate.hour;
                addValueToDate(renderDate, { hour: 1 }, true);
                currentRow.append('<div id=' + cellId + ' class="roomevent-room-cell roomevent-room-cell-middle" data-left-occupied="0" data-right-occupied="0" data-inside-event="0"><div></div></div>');
            }
        }


        getEventsBrief().done(function (events) {
            renderEvents = JSON.parse(events);
            doEventStuff();
        });

    });
}

//render event divs
var eventBlockRender;

function renderEventBlock(eventBlock, roomEventCellId) {

    var eventBlockRenderIcon = "";
    var descriptionPart = "";

    if (eventBlock.isPrivate) {

        eventBlockRenderIcon = '<i class="fa fa-lock fa-3x"></i>';
        if (eventBlock.blockType == eventBlockType.short) {
            eventBlockRender = '<div id="' + eventBlock.id + '" class="eventblock-lock short-time">';
        } else {
            eventBlockRender = '<div id="' + eventBlock.id + '" class="eventblock-lock long-time">';
        }

    } else {
        if (eventBlock.blockType == eventBlockType.short) {
            eventBlockRender = '<div id="' + eventBlock.id + '" class="eventblock-exist short-time">';
        } else {
            eventBlockRender = '<div id="' + eventBlock.id + '" class="eventblock-exist long-time">';
            descriptionPart = '<div class="eventblock-description">' +
                              '<div class="text">' + eventBlock.title + '</div>' +
                              '<div class="text">' + eventBlock.description + '</div></div>';
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
    $('#header-time-slider-zone').css('width', 124 * timeCellCount);

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

    $('#slider, #slider-static').css('height', ((renderClassRooms.length * 48) + 44));
    $('.slider-time').html(renderTimeMinutes(firstTimeCellHour, 0));
    $('#slider').draggable({
        axis: "x",
        cursor: 'pointer',
        grid: [minutePerPixel, 0],
        containment: "#header-time-slider-zone",
        drag: function (event, ui) {
            /*console.log(collision($('#slider'), $('#bla')));*/
            renterSliderTime($(this).position().left);
        }
    });
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

    console.log(hours);
    var minutes = Math.floor((leftPosition - (hours * 60 * minutePerPixel)) / minutePerPixel);

    while (renderHours >= 24) {
        renderHours -= 24;
    }

    $('.slider-time').html(renderTimeMinutes(renderHours, minutes));
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

        var duration = (hourEnd * 60 + minutesEnd) - (hourBegin * 60 + minutesBegin)
        var leftPosition = minutesBegin * minutePerPixel;

        var width = duration * minutePerPixel;

        var eventBlock = {
            id: 'eventblock-' + events[currentEvent].Id,
            left: leftPosition,
            width: width,
            timeStart: renderTimeMinutes(hourBegin, minutesBegin),
            timeEnd: renderTimeMinutes(hourEnd, minutesEnd),
            title: 'title',
            description: 'blabla',
            blockType: duration < shortBlockMinimumTime ? eventBlockType.short : eventBlockType.long,
            isPrivate: events[currentEvent].IsPrivate

        }

        var cellIdFirst = '#' + classRoomId + '_' + year + '-' + month + '-' + day + '_' + hourBegin;

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

            var cellIdLast = '#' + classRoomId + '_' + year + '-' + month + '-' + day + '_' + hourEnd;
            $(cellIdLast).attr('data-left-occupied', dataLeftOccupied);

            renderEventBlock(eventBlock, cellIdFirst);

        }

    }


}

//Object contains room # and event block coordinates
//properties: roomId, blockId { left, width }; 
//methods: getInterval(roomId, blockIdOne, blockIdTwo)

function setRoomEventCellHoverZone(id) {
    var targetCell = $('#' + id);
    var occupiedLeft = targetCell.attr('data-left-occupied');
    var occupiedRight = targetCell.attr('data-right-occupied');

    var width = timeCellWidth - (occupiedLeft + occupiedRight);

    var minutes = Math.floor((leftPosition - (hours * 60 * minutePerPixel)) / minutePerPixel);

    $(document).on('mouseover', '#' + id, function () {

    });
}

function activateStaticSlider() {
    var sliderTime = setInterval(renterStaticSliderTime, sliderTimeInterval);
    renterStaticSliderTime();
}

function getEventObject(longRoomEventId) {
    //Datetime format: 2012-04-23_18:25
    var splittedLongId = longRoomEventId.split('_');
    var eventObject = {
        roomId: splittedLongId[0],
        dateTime: splittedLongId[1]
    }

    return EventObject;
}
