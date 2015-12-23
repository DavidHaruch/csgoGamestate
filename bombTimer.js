var parse = require("./parse.js");

var bombPlanted = false;
var mp_c4timer = 40 - 1;

// for some reason the bomb planted doesn't happen for about 1 secondw3

var bombTime = 40 - 1;

var timerID;

module.exports = {
	detectChange: function (json) {

		if (json) {

		// console.log(json);
		if (json.bomb == "planted" && bombPlanted === false) {
			// console.log("BOMB HAS BEEN PLANTED");
			bombPlanted = true;
			this.startTimer();
			return true;
		}
		if (json.phase == "over" || (json.phase == "live" && bombPlanted === false)) {
			bombPlanted = false;
			this.stopTimer();
			bombTime = mp_c4timer;
			return false;
		}

		}
	},
	stopTimer: function () {
		clearInterval(timerID);
	},
	startTimer: function () {
		timerID = setInterval(this.timer, 1000);
	},
	readTimer: function () {
		if (bombPlanted) {
			return bombTime;
		}
		else {
			return false;
		}
	},
	timer: function () {
		// console.log(bombTime);
		bombTime--;
	}
};