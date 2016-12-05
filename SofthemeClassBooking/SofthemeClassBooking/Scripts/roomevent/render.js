var largeView = $('#large');
var shortView = $('#short');
var headerTime = $('#header-time');
var roomSection = $('#room-section');

var roomEventLeftBlock = $('.roomevent-left-block');
var roomEventHeader = $('.roomevent-header-date-section')

var startTime = date.getHours();
var currentTime = startTime;

function setDateHeader(dateTimeParameters) {
    $('#event-date').html(dateTimeParameters.day + ', ' + dayNames[dateTimeParameters.dayOfWeek]);
}

function renderTime(timeCellCount) {

    headerTime.empty();
    headerTime.append('<div id="header-time-slider-zone"></div>');
    $('#header-time-slider-zone').css('width', 124*timeCellCount);
    $('#header-time-slider-zone').append(
            '<div id="slider">' +
            '<div class="slider-up"></div>' +
            '<div class="slider-down"></div>' +
            '<div class="slider-time"></div>' +
            '</div>');
    $('#slider').css('height', (roomNames.length * 48) + 44);

    $('#slider').draggable({
        axis: "x",
        cursor: 'pointer',
        grid: [2.03, 0],
        containment: "#header-time-slider-zone"/*,
        drag: function (event, ui) {
            console.log(collision($('#slider'), $('#bla')));
        }*/
    });
    $('.slider-time').html(11 + ':' + 11);


    headerTime.append('<div class="roomevent-time-cell"></div>');

    for (var cell = 1; cell < timeCellCount; cell++) {
        headerTime.append('<div class="roomevent-time-cell roomevent-time-cell-middle">' + startTime++ + ':00</div>');

        if (currentTime === 24) {
            startTime = 0;
        }
    }
    headerTime.append('<div class="roomevent-time-cell roomevent-time-cell-middle">' + startTime++ + ':00</div>');
}


function renderRooms(timeCellCount) {

    roomSection.empty();

    for (var currentRoom = 1; currentRoom <= roomNames.length; currentRoom++) {

        roomSection.append('<div id="room-row-' + currentRoom + '"></div>');

        var currentRow = $('#room-row-' + currentRoom);
        currentRow.append('<div class="roomevent-room-cell">' +
                                 '<div>' + roomNames[currentRoom - 1] + '</div>' +
                                 '</div>');

        for (var cell = 0; cell < timeCellCount; cell++) {

            var cellId = currentRoom + '_' + currentCalendarCell.year + '-' + currentCalendarCell.month
                + '-' + currentCalendarCell.day + 'T' + currentTime
            if (startTime === 24) {
                startTime = 0;
            }

            currentRow.append('<div id=' + cellId + ' class="roomevent-room-cell roomevent-room-cell-middle"><div></div></div>');
        }
    }
}

$(document).on('click', '#roomevent-time-before-part', function () {
    
});

function getEventObject(longRoomEventId)
{
    //Datetime format: 2012-04-23T18:25:43.511Z
    var splittedLongId = longId.split('_');
    var EventObject = {
        roomId: splittedLongId[0],
        dateTime: splittedLongId[1]
    }

    return EventObject;
}
