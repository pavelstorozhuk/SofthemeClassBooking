var calendar = $('.roomevent-right-block');

var dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

var date = new Date();

var currentMonth = date.getMonth() + 1;
var currentYear = date.getFullYear();

var monthNow = date.getMonth() + 1;
var dateNow = date.getDate();

var selectedDay = date.getDate();
var selectedDayOfWeek = getDayOfWeek(date.getDay());

function renderCalendar(month) {

    var calendarBody = $('#calendar-body');
    var outDated = false;
    var currentDay = 1;

    var maxRowCalendarSize = 6;
    var maxCellCalendarSize = 7;

    var day = getDayOfWeek(new Date(currentYear + "-" + currentMonth + "-01").getDay());
    var maxDayCount = getDaysInMonth(currentMonth, currentYear);
    var maxDayCountLastMonth = getDaysInMonth(currentMonth - 1, currentYear) - day + 1;
    
    calendarBody.empty();

    currentMonth = month || monthNow;

    $('#current-month').html(monthNames[currentMonth - 1] + ', ' + currentYear);
    $('#event-date').html(selectedDay + ', ' + dayNames[selectedDayOfWeek]);
    $('#event-time').html(date.getHours() + ':' + date.getMinutes());

    calendarBody.append('<div id="day-names"></div>');

    for (var currentDayName = 0; currentDayName < 7; currentDayName++) {
        $('#day-names').append('<div class="roomevent-calendar-cell ">' + dayNames[currentDayName] + '</div>');
    }

    for (var row = 0; row < maxRowCalendarSize; row++) {

        calendarBody.append('<div id="calendar-cell-row-' + row + '"></div>');
        var currentRow = $('#calendar-cell-row-' + row);

        for (var b = 0; b < day; b++) {
            currentRow.append('<div class="roomevent-calendar-cell roomevent-cell-outdate">' + maxDayCountLastMonth++ + '</div>');
        }

        for (var cell = day; cell < maxCellCalendarSize; cell++) {

            if (!outDated) {
                if (currentMonth === monthNow && currentDay === dateNow) {
                    currentRow.append('<div class="roomevent-calendar-cell roomevent-calendar-cell-today">' + currentDay + '</div>');
                } else {
                    currentRow.append('<div class="roomevent-calendar-cell ">' + currentDay + '</div>');
                }

            } else {
                currentRow.append('<div class="roomevent-calendar-cell roomevent-cell-outdate">' + currentDay + '</div>');
            }

            currentDay++;
            if (currentDay > maxDayCount) {
                currentDay = 1;
                outDated = true;
            }
        }
        day = 0;
    }
}

function getDayOfWeek(day) {
    var trueDay = day - 1;
    if (trueDay < 0) {
        trueDay = 6;
    }
    return trueDay;
}

function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

$(document).on('click', '#calendar-month-today', function() {
    currentMonth = date.getMonth() + 1;
    currentYear = date.getFullYear();
    console.log(1);
    renderCalendar(currentMonth);
});

$(document).on('click', '#calendar-month-left', function () {
    currentMonth--;
    if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
    }
    renderCalendar(currentMonth);
});

$(document).on('click', '#calendar-month-right', function () {
    currentMonth++;
    if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
    }
    renderCalendar(currentMonth);
});
