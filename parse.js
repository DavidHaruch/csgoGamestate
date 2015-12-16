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
		var csgoWeapons = csgoJson.player.weapons;
		// console.log(csgoJson);

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
		var smgs = [
			"weapon_bizon",
			"weapon_mac10",
			"weapon_mp7",
			"weapon_mp9",
			"weapon_p90",
			"weapon_ump45",
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
			"weapon_flashbang",
			"weapon_hegrenade",
			"weapon_incgrenade",
			"weapon_molotov",
			"weapon_smokegrenade",
		];

		if (csgoJson.player) {
			var newWeapons = {
				weapons: {
					primary: {
						name: '',
						ammo: 0,
						ammo_max: 0,
						ammo_reserve: 0,
					},
					secondary: {
						name: '',
						ammo: 0,
						ammo_max: 0,
						ammo_reserve: 0,
					},
					knife: {},
					flashes: 0,
					he: 0,
					smoke: 0,
					molly: 0,
					decoy: 0,
					zeus: false,
				},
				currentWeapon: {

				},
				reloading: false,
			};

			// 
			//  I should probably write a function to do this weapon matching and the such
			//  maybe hash table?
			//  
			//  I need to learn more about data structures
			// 

			if (Object.keys(csgoWeapons)) {
			for (i=0;i<Object.keys(csgoWeapons).length;i++) {
				var thisWeapon = csgoWeapons[weaponPrefix+i];
				// rifles
				for (k=0;k<rifles.length;k++) {
					if (thisWeapon.name == rifles[k]) {
						// console.log(thisWeapon);
						newWeapons.weapons.primary.name = thisWeapon.name;
						newWeapons.weapons.primary.ammo = thisWeapon.ammo_clip;
						newWeapons.weapons.primary.ammo_max = thisWeapon.ammo_clip_max;
						newWeapons.weapons.primary.ammo_reserve = thisWeapon.ammo_reserve;
						break;
					}
				}
				// smgs
				for (k=0;k<smgs.length;k++) {
					if (thisWeapon.name == smgs[k]) {
						// console.log(thisWeapon);
						newWeapons.weapons.primary.name = thisWeapon.name;
						newWeapons.weapons.primary.ammo = thisWeapon.ammo_clip;
						newWeapons.weapons.primary.ammo_max = thisWeapon.ammo_clip_max;
						newWeapons.weapons.primary.ammo_reserve = thisWeapon.ammo_reserve;
						break;
					}
				}
				// pistols
				for (k=0;k<pistols.length;k++) {
					if (thisWeapon.name == pistols[k]) {
						// console.log(thisWeapon);
						newWeapons.weapons.secondary.name = thisWeapon.name;
						newWeapons.weapons.secondary.ammo = thisWeapon.ammo_clip;
						newWeapons.weapons.secondary.ammo_max = thisWeapon.ammo_clip_max;
						newWeapons.weapons.secondary.ammo_reserve = thisWeapon.ammo_reserve;
						break;
					}
				}
				if (thisWeapon.name.indexOf("weapon_knife") >= 0)
					newWeapons.weapons.knife = thisWeapon.name;

				// nades
				switch (thisWeapon.name) {
					case "weapon_flashbang":
						newWeapons.weapons.flashes = thisWeapon.ammo_reserve;
						break;
					case "weapon_smokegrenade":
						newWeapons.weapons.smoke = thisWeapon.ammo_reserve;
						break;
					case "weapon_hegrenade":
						newWeapons.weapons.he = thisWeapon.ammo_reserve;
						break;
					case "weapon_incgrenade":
						newWeapons.weapons.molly = thisWeapon.ammo_reserve;
						break;
					case "weapon_molotov":
						newWeapons.weapons.molly = thisWeapon.ammo_reserve;
						break;
					case "weapon_decoy":
						newWeapons.weapons.decoy = thisWeapon.ammo_reserve;
						break;
					default: 
				}

				// tazer
				if (thisWeapon.name == "weapon_taser")
					newWeapons.weapons.zeus = true;

				// weapon states
				if (thisWeapon.state == "active")
					newWeapons.currentWeapon = thisWeapon.name;
				if (thisWeapon.state == "reloading")
					newWeapons.reloading = true;

			}
			}
			// console.log(newWeapons);
			return newWeapons;
		}
		else {
			var errReturn = {"err": "Data provided has no weapons to organize"};
			return errReturn;
		}
	}
};