var largeView = $('#large');
var shortView = $('#short');
var headerTime = $('#header-time');
var roomSection = $('#room-section');

var roomEventLeftBlock = $('.roomevent-left-block');
var roomEventHeader = $('.roomevent-header-date-section')

function renderTime(timeCellCount) {

    var startTime = date.getHours();

    headerTime.empty();
    headerTime.append('<div class="roomevent-time-cell"></div>');

    for (var cell = 1; cell < timeCellCount; cell++) {
        headerTime.append('<div class="roomevent-time-cell roomevent-time-cell-middle">' + startTime++ + ':00</div>');

        if (startTime === 24) {
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
        console.log(currentRow);
        currentRow.append('<div class="roomevent-room-cell">' +
                                 '<div>' + roomNames[currentRoom - 1] + '</div>' +
                                 '</div>');

        var startTime = date.getHours();
        for (var cell = 0; cell < timeCellCount; cell++) {

            var cellId = 'select-event-room-' + currentRoom + '-' + date.getDate() + '-' + startTime++;
            if (startTime === 24) {
                startTime = 0;
            }

            currentRow.append('<div id=' + cellId + ' class="roomevent-room-cell roomevent-room-cell-middle"><div></div></div>');
        }

    }
}
