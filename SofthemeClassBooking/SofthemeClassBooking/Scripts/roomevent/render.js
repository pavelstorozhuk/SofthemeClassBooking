var largeView = $('#large');
var shortView = $('#short');
var headerTime = $('#header-time');
var roomSection = $('#room-section');

var roomEventLeftBlock = $('.roomevent-left-block');
var roomEventHeader = $('.roomevent-header-date-section')

var roomNames = ['Einstein Classroom', 'Tesla Classroom', 'Newton Classroom'];

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

$(document).on('click', '#large', function () {

    if (!largeView.hasClass('fa-selected')) {
        largeView.addClass('fa-selected');
        shortView.removeClass('fa-selected');

        roomEventLeftBlock.addClass('roomevent-left-block-large');
        roomEventHeader.addClass('roomevent-header-date-section-large');
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

        roomEventLeftBlock.removeClass('roomevent-left-block-large');
        roomEventHeader.removeClass('roomevent-header-date-section-large');
        $('#roomevent-navigation').attr('class', 'roomevent-now');

        renderTime(shortRoomEventTable);
        renderRooms(shortRoomEventTable);

        currentMode = shortRoomEventTable;
        renterStaticSliderTime();

        calendar.show();
    }
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

$(document).on('click', '#roomevent-time-before-part', function () {

    addValueToDate(currentCalendarCell, { hour: 1 }, false);
    render();
});

$(document).on('click', '#roomevent-time-next-part', function () {

    addValueToDate(currentCalendarCell, { hour: 1 }, true);
    render();
});

function render() {

    renderCalendar(currentCalendarCell.month);

    setDateHeader(currentCalendarCell);

    renderTime(currentMode);
    renderRooms(currentMode);
    renterStaticSliderTime();

}

function setDateHeader(dateTimeParameters) {
    var dayOfWeek = getDayOfWeek(new Date(currentCalendarCell.year + '-' + currentCalendarCell.month + '-' + currentCalendarCell.day).getDay());

    $('#event-date').html(currentCalendarCell.day + ', ' + dayNames[dayOfWeek]);
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

    var noReset = resetTime || true;

    roomSection.empty();

    for (var currentRoom = 1; currentRoom <= roomNames.length; currentRoom++) {

        var renderDate = {
            year: noReset ? currentCalendarCell.year : dateNow.year,
            month: noReset ? currentCalendarCell.month : dateNow.month,
            day: noReset ? currentCalendarCell.day : dateNow.day,
            hour: noReset ? currentCalendarCell.hour : dateNow.hour,
            minutes: noReset ? currentCalendarCell.minutes : dateNow.minutes,
        };


        roomSection.append('<div id="room-row-' + currentRoom + '"></div>');

        var currentRow = $('#room-row-' + currentRoom);
        currentRow.append('<div class="roomevent-room-cell">' +
                                 '<div>' + roomNames[currentRoom - 1] + '</div>' +
                                 '</div>');

        for (var cell = 0; cell < timeCellCount; cell++) {

            var cellId = currentRoom + '_' + renderDate.year + '-' + renderDate.month
                + '-' + renderDate.day + 'T' + renderDate.hour

            addValueToDate(renderDate, { hour: 1 }, true);
            currentRow.append('<div id=' + cellId + ' class="roomevent-room-cell roomevent-room-cell-middle" data-left-occupied="0" data-right-occupied="0" data-inside-event="0"><div></div></div>');
        }
    }

    doEventStuff();
    renderSliders(timeCellCount);
}

//events from db:
//EventBlockViewModel  Id, ClassRoomId, BeginingDate, EndingDate
function doEventStuff() {
    createEventArray();
    calculateEventBlockPosition()
}
var events;
function createEventArray() {
    events = [];
    events.push({
        id: 1,
        classRoomId: 1,
        dateBegining: new Date(dateNow.year + '-' + dateNow.month + '-' + dateNow.day + ' ' + 10 + ':' + 15),
        dateEnding: new Date(dateNow.year + '-' + dateNow.month + '-' + dateNow.day + ' ' + 10 + ':' + 45)
    });

    events.push({
        id: 2,
        classRoomId: 2,
        dateBegining: new Date(dateNow.year + '-' + dateNow.month + '-' + dateNow.day + ' ' + 20 + ':' + 00),
        dateEnding: new Date(dateNow.year + '-' + dateNow.month + '-' + dateNow.day + ' ' + 22 + ':' + 30)
    });
}

function calculateEventBlockPosition() {

    for (var currentEvent = 0; currentEvent < events.length; currentEvent++) {

        var hourBegin = events[currentEvent].dateBegining.getHours();
        var hourEnd = events[currentEvent].dateEnding.getHours();
        var minutesBegin = events[currentEvent].dateBegining.getMinutes();
        var minutesEnd = events[currentEvent].dateEnding.getMinutes();

        var hourBeginRelative = hourBegin - firstTimeCellHour;
        var hourEndRelative = hourEnd - firstTimeCellHour;

        if (hourBeginRelative < 0) {
            hourBeginRelative += 24;
        }
        if (hourEndRelative < 0) {
            hourEndRelative += 24;
        }

        var year = events[currentEvent].dateBegining.getFullYear();
        var month = events[currentEvent].dateBegining.getMonth() + 1;
        var day = events[currentEvent].dateBegining.getDate();

        var classRoomId = events[currentEvent].classRoomId;

        var hoursDuration = hourEnd - hourBegin;

        var duration = (hourEnd * 60 + minutesEnd) - (hourBegin * 60 + minutesBegin)
        var leftPosition = minutesBegin * minutePerPixel;

        var width = duration * minutePerPixel;

        //var width = 
        //    ((hourEndRelative * (minutePerPixel * 60)) + (minutesEnd * minutePerPixel))
        //    - leftPositionRelative;

        var eventBlock = {
            id: 'eventblock-' + events[currentEvent].id,
            left: leftPosition,
            width: width,
            timeStart: renderTimeMinutes(hourBegin, minutesBegin),
            timeEnd: renderTimeMinutes(hourEnd, minutesEnd),
            description: 'blabla'
        }

        var cellIdFirst = '#' + classRoomId + '_' + year + '-' + month + '-' + day + 'T' + hourBegin;

        if (hoursDuration <= 0 || (hoursDuration == 1 && (minutesBegin == 0 && minutesEnd == 0))) {
            $(cellIdFirst).attr('data-inside-event', leftPosition + '-' + width);

            renderEventBlock(eventBlock, cellIdFirst);

        } else if (hoursDuration > 0) {

            $(cellIdFirst).attr('data-right-occupied', (timeCellWidth * (hourBeginRelative + 1)) - leftPosition);
            console.log($(cellIdFirst).attr('data-right-occupied'));


            var cellIdLast = '#' + classRoomId + '_' + year + '-' + month + '-' + day + 'T' + hourEnd;
            $(cellIdLast).attr('data-left-occupied', (timeCellWidth * (hourEndRelative + 1)) - leftPosition);
            //for (var currentHour = (hourBegin + 1) ; currentHour < hourEnd; currentHour++) {
            renderEventBlock(eventBlock, cellIdFirst);

            //}
        }

    }


}

function renderEventBlock(eventBlock, roomEventCell) {

    $(roomEventCell).html('<div id="' + eventBlock.id + '" class="eventblock-exist">' +
                          '<div class="eventblock-time">' +
                          '<span>' + eventBlock.timeStart + ' - ' + eventBlock.timeEnd + '</span>' +
                          '</div><div class="eventblock-description">' +
                          '<div>English class - </div>' +
                          '<div>Speaking for juniours</div></div></div>');
    $('#' + eventBlock.id).css('width', eventBlock.width).css('left', eventBlock.left);
}


var eventBlock; //Object contains room # and event block coordinates
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

    $('#slider, #slider-static').css('height', (roomNames.length * 48) + 44);
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

function activateStaticSlider() {
    var sliderTime = setInterval(renterStaticSliderTime, sliderTimeInterval);
    renterStaticSliderTime();
}

function getEventObject(longRoomEventId) {
    //Datetime format: 2012-04-23T18:25:43.511Z
    var splittedLongId = longId.split('_');
    var EventObject = {
        roomId: splittedLongId[0],
        dateTime: splittedLongId[1]
    }

    return EventObject;
}

function renterStaticSliderTime() {

    var navigation;

    if (currentMode == shortRoomEventTable) {
        navigation = $('.roomevent-now');
    } else {
        navigation = $('.roomevent-now-large');
    }
    navigation.hide();

    var targetCellId = $('#hour-cell-' + dateNow.year + '-' + dateNow.month + '-' + dateNow.day + '-' + dateNow.hour);
    var targetCellIdPosition = targetCellId.position();
    console.log(targetCellId);
    if (targetCellIdPosition != undefined) {

        var sliderOffset = (targetCellIdPosition.left - fisrtTimeCellWidth) + (minutePerPixel * dateNow.minutes);

        $('#slider-static').css('left', sliderOffset);
    } else {
        navigation.show();

        var compareDatesResult = compareDates(currentCalendarCell, dateNow, false, true);
        console.log(compareDatesResult);
        if (compareDatesResult < 0) {
            $('#slider-static').hide();
            navigation.css('text-align', 'right');
            $('#roomevent-now').html('Сейчас <i class="fa fa-long-arrow-right" aria-hidden="true"></i>')
        } else {
            $('#slider-static').hide();
            navigation.css('text-align', 'left');
            $('#roomevent-now').html('<i class="fa fa-long-arrow-left" aria-hidden="true"></i> Сейчас')
        }
    }
}

function renterSliderTime(leftPosition) {
    var hours = Math.floor(leftPosition / (minutePerPixel * 60));
    var renderHours = firstTimeCellHour + hours;

    console.log(hours);
    minutes = Math.floor((leftPosition - (hours * 60 * minutePerPixel)) / minutePerPixel);

    while (renderHours >= 24) {
        renderHours -= 24;
    }

    $('.slider-time').html(renderTimeMinutes(renderHours, minutes));
}