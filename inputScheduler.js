var blinkstick = require('blinkstick');
var schedule = require('node-schedule');
var inq = require('inquirer');

var led = blinkstick.findFirst();  

let question = [
  {
    type: 'input',
    name: 'time',
    message: 'How many minutes past the hour would you like Blinky Square to notify you?'
  },
];

const blinky = (minutes) => {
  var rule = new schedule.RecurrenceRule();
  rule.minute = parseInt(minutes);

  schedule.scheduleJob(rule, function() {
      var time = new Date(Date.now());
      var timeString = `${time.getHours()}:${time.getMinutes()}`;

      led.blink('red', { 'delay': 100, 'repeats': 10 }, function() {
          console.log(`${timeString} Check your todos and drink some water!`);
      });   
  });  
}

inq
  .prompt(question)
  .then(answers => {
    blinky(parseInt(answers.time))
  });




