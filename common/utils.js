/**
 * Adds zero in front of the number if the given number is less than 10
 * @param {Integer} number 
 */
export function zeroPad(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}

/**
 * Returns hour with given display format. e.g. if displayFormat is "12h" and hours is "23", then result will be "11"
 * @param {String} displayFormat 
 * @param {Integer} hours 
 */
export function calculateHours(hours, displayPreference) {
    // 12h format
    if (displayPreference === "12h") {
        return (hours + 24) % 12 || 12;
    }
    // 24h format
    return zeroPad(hours);
}

/**
 * Returns the name of the day with the given index. e.g. 0 returns PAZ.
 * @param {Integer} dayIndex 
 */
 export function getDayName(dayIndex) {
    return _days[dayIndex];
  }
  
  /**
   * Returns the name of the month with the given index. e.g. 0 returns OCA.
   * @param {Integer} monthIndex 
   */
  export function getMonthName(monthIndex) {
    return _months[monthIndex];
  }

const _days = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat'
  };
  
  const _months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  }
