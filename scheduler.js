var schedule = require('node-schedule');

var checkTodos = schedule.scheduleJob('13 * * * * ', function() {
    console.log('check your todo list!');
})