var blinkstick = require('blinkstick');

var delay = 300;

var red = 36;
var green = 55;
var blue = 190;

var options = { channels: 0, index: 0 };

var blinkTimeout;

var blinking = false;

var led = blinkstick.findFirst();

var blinker = function() {
    led.setColor(red, green, blue, options);

    blinkTimeout = setTimeout(function() {
        led.setColor(0, 0, 0, options);

        blinkTimeout = setTimeout(function() {
            blinker();
        }, delay);
    }, delay);
}

var blink = function() {
    if (!blinking) {
        blinking = true;
        blinker();
    }
}

var stop = function() {
    if(blinking) {
        blinking = false;
        clearTimeout(blinkTimeout);
        led.setColor(0, 0, 0, options);
    }
}

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function(key) {
    if (key === '\u0003') {
        process.exit();
    }

    if (key == '1') {
        blink();
    }

    if (key == '2') {
        stop();
    }
});

process.stdout.write('BlinkStick blink demo\r\n\r\n');
process.stdout.write('Press:\r\n');
process.stdout.write('   1 to start blinking\r\n');
process.stdout.write('   2 to stop blinking\r\n');
process.stdout.write('   Ctrl+C to exit\r\n');
