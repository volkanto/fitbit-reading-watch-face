import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { today as userActivity } from "user-activity";
import { display } from "display";
import { battery } from 'power';

import * as util from "../common/utils";
import { FitFont } from 'fitfont'

clock.granularity = "minutes";

const batteryLabel = document.getElementById("batteryLabel");
const heartRateLabel = document.getElementById("heartRateLabel");
const calendarLabel = document.getElementById("calendarLabel");
const stepsLabel = document.getElementById("stepsLabel");

const clockHoursLabel = new FitFont({
    id: 'clockHoursLabel',
    font: 'PT_Sans_Narrow_80',
    halign: 'middle'
});

const clockMinutesLabel = new FitFont({
    id: 'clockMinutesLabel',
    font: 'PT_Sans_Narrow_60',
    halign: 'middle'
});

clock.ontick = (event) => {

    let currentDate = event.date;

    updateClock(currentDate);
    updateCalendar(currentDate);

    updateHeartRateSensor();
    checkAndUpdateBatteryLevel();

    // steps count
    stepsLabel.text = userActivity.adjusted.steps;
}

display.addEventListener('change', function () {
    if (this.on) {
        updateHeartRateSensor();
        checkAndUpdateBatteryLevel();
    } else {
        stopHeartRateSensor();
    }
});

battery.onchange = (charger, evt) => {
    checkAndUpdateBatteryLevel();
}

// Create a new instance of the HeartRateSensor object
let heartRateMonitor = new HeartRateSensor();
heartRateMonitor.onreading = function () {
    // Peek the current sensor values
    heartRateLabel.text = heartRateMonitor.heartRate;
}

function updateHeartRateSensor() {
    // Begin monitoring the sensor
    heartRateMonitor.start();
}

function stopHeartRateSensor() {
    // Stop monitoring the sensor
    heartRateMonitor.stop();
}

function updateClock(currentDay) {

    let hours = util.calculateHours(currentDay.getHours(), preferences.clockDisplay);
    let mins = util.zeroPad(currentDay.getMinutes());
    clockHoursLabel.text = `${hours}`;
    clockMinutesLabel.text = `${mins}`;
}

function updateCalendar(currentDay) {

    let _dayIndex = currentDay.getDay();
    let _dayOfMonth = currentDay.getDate();
    let _monthIndex = currentDay.getMonth();
    // set the actual date to the placeholder
    calendarLabel.text = `${util.getDayName(_dayIndex)}, ${_dayOfMonth} ${util.getMonthName(_monthIndex)}`;
}

function checkAndUpdateBatteryLevel() {
    batteryLabel.text = `${battery.chargeLevel}%`;
}
