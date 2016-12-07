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
    currentCalendarCell = dateNow;
    renderCalendar(currentCalendarCell.month);
    timeOffset = 0;
    renderTime(currentMode);
    renderRooms(currentMode);

    setDateHeader(
        setDateTimeParameters(
            new Date(currentCalendarCell.year + '-' + currentCalendarCell.month + '-' + currentCalendarCell.day)
        ));

    renterStaticSliderTime();
});

$(document).on('click', '#roomevent-time-before-part', function () {

    timeOffset--;
    renderTime(currentMode);
    renderRooms(currentMode);

    renterStaticSliderTime();
});

$(document).on('click', '#roomevent-time-next-part', function () {

    timeOffset++;
    renderTime(currentMode);
    renderRooms(currentMode);

    renterStaticSliderTime();
});

function setDateHeader(dateTimeParameters) {
    $('#event-date').html(dateTimeParameters.day + ', ' + dayNames[dateTimeParameters.dayOfWeek]);
}

function getRenderHour() {
    var renderHour = getCurrentTime(true);
    renderHour.hour += timeOffset;

    if (renderHour.hour > 24) {
        renderHour.hour = renderHour.hour - 24;
    } else if (renderHour.hour < 0) {
        renderHour.hour = 24 + renderHour.hour;
    }

    firstTimeCellHour = renderHour.hour;

    return renderHour;
}

function renderTime(timeCellCount, resetTime) {

    var renderHour = resetTime || getRenderHour();

    headerTime.empty();
    renderSliders(timeCellCount);
    headerTime.append('<div class="roomevent-time-cell"></div>');

    for (var cell = 1; cell <= timeCellCount; cell++) {
        var hourCellId = 'hour-cell-' + currentCalendarCell.year + '-' + currentCalendarCell.month + '-' + currentCalendarCell.day + '-' + renderHour.hour;
        headerTime.append('<div id="' + hourCellId + '" class="roomevent-time-cell roomevent-time-cell-middle">' + renderTimeMinutes(renderHour.hour, 0) + '</div>');

        renderHour.hour++;
        if (renderHour.hour === 24) {
            renderHour.hour = 0;
        }
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

    $('#slider, #slider-static').css('height', (roomNames.length * 48) + 44);
    $('.slider-time').html(renderTimeMinutes(firstTimeCellHour, 0));
    $('#slider').draggable({
        axis: "x",
        cursor: 'pointer',
        grid: [2.03, 0],
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


function renderRooms(timeCellCount, resetTime) {

    roomSection.empty();

    var renderHour = resetTime || getRenderHour();

    for (var currentRoom = 1; currentRoom <= roomNames.length; currentRoom++) {

        roomSection.append('<div id="room-row-' + currentRoom + '"></div>');

        var currentRow = $('#room-row-' + currentRoom);
        currentRow.append('<div class="roomevent-room-cell">' +
                                 '<div>' + roomNames[currentRoom - 1] + '</div>' +
                                 '</div>');

        var renderHour = getCurrentTime(true);
        for (var cell = 0; cell < timeCellCount; cell++) {

            var cellId = currentRoom + '_' + currentCalendarCell.year + '-' + currentCalendarCell.month
                + '-' + currentCalendarCell.day + 'T' + renderHour.hour++
            if (renderHour.hour === 24) {
                renderHour.hour = 0;
            }

            currentRow.append('<div id=' + cellId + ' class="roomevent-room-cell roomevent-room-cell-middle"><div></div></div>');
        }
    }
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

function renderTimeMinutes(hours, minutes) {
    var renderHours = hours > 9 ? hours : '0' + hours;
    var renderMinutes = minutes > 9 ? minutes : '0' + minutes;
    return renderHours + ':' + renderMinutes;
}

function getCurrentTime(returnObject) {
    var dateNow = new Date();
    if (returnObject == true) {
        return {
            hour: dateNow.getHours(),
            minutes: dateNow.getMinutes()
        };
    }
    return renderTimeMinutes(dateNow.getHours(), dateNow.getMinutes());
}

function renterStaticSliderTime() {

    $('.roomevent-now').hide();
    var currentTime = getCurrentTime(true);

    var targetCellId = $('#hour-cell-' + dateNow.year + '-' + dateNow.month + '-' + dateNow.day + '-' + currentTime.hour);
    var targetCellIdPosition = targetCellId.position();

    if (targetCellIdPosition != undefined) {
        var sliderOffset = (targetCellIdPosition.left - fisrtTimeCellWidth) + (minutePerPixel * currentTime.minutes);
        /*console.log(sliderOffset);*/
        $('#slider-static').css('left', sliderOffset);
    } else {
        $('.roomevent-now').show();

        if (compareDates(currentCalendarCell, dateNow) < 0) {
            $('#slider-static').hide();
            $('.roomevent-now').css('text-align', 'right');
            $('#roomevent-now').html('Сейчас <i class="fa fa-long-arrow-right" aria-hidden="true"></i>')
        } else {
            $('#slider-static').hide();
            $('.roomevent-now').css('text-align', 'left');
            $('#roomevent-now').html('<i class="fa fa-long-arrow-left" aria-hidden="true"></i> Сейчас')
        }
    }
}

function renterSliderTime(leftPosition) {
    var hours = Math.floor(leftPosition / (minutePerPixel * 60));
    minutes = Math.floor((leftPosition - (hours * 60 * minutePerPixel)) / minutePerPixel);
    $('.slider-time').html(renderTimeMinutes(firstTimeCellHour + hours, minutes));
}