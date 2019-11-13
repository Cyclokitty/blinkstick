var blinkstick = require('blinkstick');
var schedule = require('node-schedule');

var led = blinkstick.findFirst();

var rule = new schedule.RecurrenceRule();
rule.minute = 12;

var checkTodos = schedule.scheduleJob(rule, function() {
    var time = new Date(Date.now());
    var timeString = `${time.getHours()}:${time.getMinutes()}`;

    led.blink('red', { 'delay': 100, 'repeats': 10 }, function() {
        console.log(`${timeString} Check your todos and drink some water!`);
    });   
});