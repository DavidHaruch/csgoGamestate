// GAMEPLAY NOTES
// ==============
// This detects if you get a kill while flashed (can't see your screen)
//
// This is completely overpowered and gives the player a competitve advantages

// CODE NOTES
// ==========
// I think there is a much better way to do this, needs work.

var flashed = false;
var kills = 0;

module.exports = {
	detectFlashed: function (json) {
		if (json) {
			if (json.flashed > 90) {
				flashed = true;
				// console.log("FLASHED!");
				return this.detectKill(json);
			}
			else {
				flashed = false;
				return false;
			}
		}
	},
	detectKill: function (json) {
		if (json) {
			// console.log("json.kills", json.kills);
			// console.log("kills",kills);
			if (json.kills > kills) {
				// console.log("new kill");
				kills = json.kills;
				return true;
			}
			else {
				return false;
			}
		}
	},
	resetKill: function (json) {
		if (json) {
			if (json.phase == "over") {
				kills = 0;
			}
		}
	}
};	