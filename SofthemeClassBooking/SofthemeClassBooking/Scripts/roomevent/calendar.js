var calendar = $('.roomevent-right-block');

var dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
var monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

var date = new Date();
var yearNow = date.getFullYear();
var monthNow = date.getMonth() + 1;
var dateNow = date.getDate();

var currentCalendarMonth = monthNow;
var currentCalendarYear = yearNow;

var currentCalendarCell;

function renderCalendar(month) {

    var calendarBody = $('#calendar-body');
    var dayOutOfSelectedCalendarMonth = false;
    var dayNumberToFillIntoCalendar = 1;

    var selectedCalendarMonth = month || monthNow;

    var maxRowCalendarSize = 6;
    var maxCellCalendarSize = 7;

    var firstDayOfWeekInMonth = getDayOfWeek(new Date(yearNow + '-' + selectedCalendarMonth + '-01').getDay());
    var maxDayCount = getDaysInMonth(selectedCalendarMonth, yearNow);
    var maxDayCountLastMonth = getDaysInMonth(selectedCalendarMonth-1, currentCalendarYear) - firstDayOfWeekInMonth + 1;

    var currentMonth = selectedCalendarMonth;
    var currentYear = currentCalendarYear;
    
    $('#current-month').html(monthNames[selectedCalendarMonth - 1] + ', ' + currentCalendarYear);
    calendarBody.empty();

    
    calendarBody.append('<div id="day-names"></div>');

    for (var dayNumberToFillIntoCalendarName = 0; dayNumberToFillIntoCalendarName < 7; dayNumberToFillIntoCalendarName++) {
        $('#day-names').append('<div class="roomevent-calendar-cell ">' + dayNames[dayNumberToFillIntoCalendarName] + '</div>');
    }

    for (var row = 0; row < maxRowCalendarSize; row++) {

        calendarBody.append('<div id="calendar-cell-row-' + row + '"></div>');
        var currentRow = $('#calendar-cell-row-' + row);

        var pastMonth = (selectedCalendarMonth - 1) > 0 ? (selectedCalendarMonth - 1) : 12;
        var pastYear = (selectedCalendarMonth - 1) > 0 ? currentCalendarYear : (currentCalendarYear - 1);

        for (var b = 0; b < firstDayOfWeekInMonth; b++) {
            currentRow.append('<div id="' + pastMonth + '-' + maxDayCountLastMonth + '-' + pastYear + '" class="roomevent-calendar-cell roomevent-cell-outdate">' + maxDayCountLastMonth++ + '</div>');
        }

        for (var cell = firstDayOfWeekInMonth; cell < maxCellCalendarSize; cell++) {

            var calendarCellId = currentMonth + '-' + dayNumberToFillIntoCalendar + '-' + currentYear;

            if (!dayOutOfSelectedCalendarMonth) {

                if ((selectedCalendarMonth == currentCalendarCell.month) && (dayNumberToFillIntoCalendar == currentCalendarCell.day)) {
                   
                    currentRow.append('<div id="' + calendarCellId + '" class="roomevent-calendar-cell roomevent-calendar-cell-today">' + dayNumberToFillIntoCalendar + '</div>');
                } else {
                    currentRow.append('<div id="' + calendarCellId + '" class="roomevent-calendar-cell ">' + dayNumberToFillIntoCalendar + '</div>');
                }

            } else {
                currentRow.append('<div id="' + calendarCellId + '" class="roomevent-calendar-cell roomevent-cell-outdate">' + dayNumberToFillIntoCalendar + '</div>');
            }

            dayNumberToFillIntoCalendar++;
            if (dayNumberToFillIntoCalendar > maxDayCount) {
                dayNumberToFillIntoCalendar = 1;
                currentMonth++;
                if (currentMonth > 12) {
                    currentMonth = 1;
                    currentYear++;
                }
                dayOutOfSelectedCalendarMonth = true;
            }
        }
        firstDayOfWeekInMonth = 0;
    }
}

function resetCurrentCalendarCell() {
    currentCalendarCell = {
        month: monthNow,
        day: dateNow,
        year: yearNow
    }

    setDateHeader(setDateTimeParameters());
}

function setDateTimeParameters(dateIn) {

    var renderDate = dateIn || new Date(yearNow + '-' + monthNow + '-' + dateNow);

    var dateTimeParameters = {
        day: renderDate.getDate(),
        month: renderDate.getMonth(),
        year: renderDate.getFullYear(),
        dayOfWeek: getDayOfWeek(renderDate.getDay()),
        hours: renderDate.getHours(),
        minutes: renderDate.getMinutes()
    }

    return dateTimeParameters;
}

function parseIdFromCalendarSell(longId) {

    var splittedLongId = longId.split('-');
    var CalendarCellIdParameters = {
        month: splittedLongId[0],
        day: splittedLongId[1],
        year: splittedLongId[2]
    }

    return CalendarCellIdParameters;
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

//Click events

$(document).on('click', '#calendar-month-today', function () {
    currentCalendarMonth = date.getMonth() + 1;
    currentCalendarYear = date.getFullYear();
    resetCurrentCalendarCell();
    renderCalendar(currentCalendarMonth);
});

$(document).on('click', '#calendar-month-left', function () {
    currentCalendarMonth--;
    if (currentCalendarMonth < 1) {
        currentCalendarMonth = 12;
        currentCalendarYear--;
    }
    renderCalendar(currentCalendarMonth);
});

$(document).on('click', '#calendar-month-right', function () {
    currentCalendarMonth++;
    if (currentCalendarMonth > 12) {
        currentCalendarMonth = 1;
        currentCalendarYear++;
    }
    renderCalendar(currentCalendarMonth);
});

$(document).on('click', '.roomevent-calendar-cell', function () {
    var selectedCalendarCell = $(this);
    var currentLongId = '#' + currentCalendarCell.month + '-' + currentCalendarCell.day + '-' + currentCalendarCell.year;
    $(currentLongId).removeClass('roomevent-calendar-cell-today');
    selectedCalendarCell.addClass('roomevent-calendar-cell-today');

    var nextLongId = selectedCalendarCell.attr('id');
    currentCalendarCell = parseIdFromCalendarSell(nextLongId);

    setDateHeader(
            setDateTimeParameters(
                new Date(currentCalendarCell.year + '-' + currentCalendarCell.month + '-' + currentCalendarCell.day)
            ));


    if (currentCalendarMonth != currentCalendarCell.month) {
        currentCalendarMonth = currentCalendarCell.month;
        renderCalendar(currentCalendarMonth);
    }
});