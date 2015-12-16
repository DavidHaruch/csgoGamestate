// we parse the data on the server so it is faster/lighter on the front end
// the way the data comes from csgo, it its mashed up, so it is easier to fit it on the server
// ex. weapons are ordered based on how you buy them :-(

module.exports = {
	logJSON: function (json) {
		fs.writeFile("json.log",json,function(err){
			if (err)
				console.log(err);
		});
		console.log("log written @ " + Math.round(+new Date()/1000));
	},
	organizeWeapons: function (json) {
		var csgoJson = JSON.parse(json);
		var csgoWeapons = csgoJSON.player.weapons;

		var weaponPrefix = "weapon_";

		var rifles = [
			"weapon_ak47",
			"weapon_aug",
			"weapon_awp",
			"weapon_famas",
			"weapon_G3SG1",
			"weapon_galilar",      // galil
			"weapon_m4a1",         // m4a4
			"weapon_m4a1_silencer",
			"weapon_scar20",
			"weapon_sg556",        // sg553
			"weapon_ssg08",        // scout
		];
		var pistols = [
			"weapon_cz75a",
			"weapon_deagle",
			"weapon_elite",
			"weapon_fiveseven",
			"weapon_glock",
			"weapon_hkp2000",
			"weapon_p250",
			"weapon_tec9",
			"weapon_usp_silencer",
			"weapon_revolver",
		];
		var grenades = [
			"weapon_decoy",
			"weapon_hegrenade",
			"weapon_incgrenade",
			"weapon_molotov",
		];

		if (csgoJson.player) {
			var newWeapons = {
				weapons: {
					primary: {},
					secondary: {},
					knife: {},
					flash: 0,
					he: 0,
					smoke: 0,
					molly: 0,
					decoy: 0,
					zeus: false,
				},
				currentWeapon: {

				}
			};

			for (i=0;i<8;i++) {
				var thisWeapon = csgoWeapons[weaponPrefix+i];
				for (i=0;i<)
			}
		}
		else {
			var errReturn = {"err": "Data provided has no weapons to organize"};
			return errReturn;
		}
	}
};