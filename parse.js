// we parse the data on the server so it is faster/lighter on the front end
// the way the data comes from csgo, it its mashed up, so it is easier to fit it on the server
// ex. weapons are ordered based on how you buy them :-(

var fs = require("fs");

var weaponPrefix = "weapon_";

var imgUrl = {
	weapon_c75za: "http://vignette3.wikia.nocookie.net/cswikia/images/c/cf/C75a_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_deagle: "http://vignette2.wikia.nocookie.net/cswikia/images/7/7d/Deagle_hud_go.png/revision/latest/scale-to-height-down/100",
	weapon_elite: "http://vignette2.wikia.nocookie.net/cswikia/images/8/82/Elite_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_fiveseven: "http://vignette2.wikia.nocookie.net/cswikia/images/9/9c/Fiveseven_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_glock: "http://vignette2.wikia.nocookie.net/cswikia/images/3/33/Glock18_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_p250: "http://vignette2.wikia.nocookie.net/cswikia/images/5/57/P250_hud.png/revision/latest/scale-to-height-down/100",
	weapon_hkp2000: "http://vignette1.wikia.nocookie.net/cswikia/images/6/67/Hkp2000_hud.png/revision/latest/scale-to-height-down/100",
	weapon_tec9: "http://vignette3.wikia.nocookie.net/cswikia/images/5/55/Tec9_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_usp_silencer: "http://vignette2.wikia.nocookie.net/cswikia/images/7/73/Usps_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_mag7: "http://vignette2.wikia.nocookie.net/cswikia/images/2/2e/Mag7_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_revolver: "http://vignette2.wikia.nocookie.net/cswikia/images/7/7d/Deagle_hud_go.png/revision/latest/scale-to-height-down/100",
	weapon_nova: "http://vignette4.wikia.nocookie.net/cswikia/images/c/c8/Nova_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_sawedoff: "http://vignette1.wikia.nocookie.net/cswikia/images/9/94/Sawedoff_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_xm1014: "http://vignette2.wikia.nocookie.net/cswikia/images/a/ad/Xm1014_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_mac10: "http://vignette2.wikia.nocookie.net/cswikia/images/f/f7/Mac10_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_mp7: "http://vignette4.wikia.nocookie.net/cswikia/images/8/8d/Mp7_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_mp9: "http://vignette2.wikia.nocookie.net/cswikia/images/1/14/Mp9_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_p90: "http://vignette3.wikia.nocookie.net/cswikia/images/b/bd/P90_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_bizon: "http://vignette1.wikia.nocookie.net/cswikia/images/d/d5/Bizon_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_ump45: "http://vignette3.wikia.nocookie.net/cswikia/images/c/c4/Ump45_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_ak47: "http://vignette1.wikia.nocookie.net/cswikia/images/7/76/Ak47_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_aug: "http://vignette2.wikia.nocookie.net/cswikia/images/6/6f/Aug_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_famas: "http://vignette2.wikia.nocookie.net/cswikia/images/8/8f/Famas_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_galilar: "http://vignette1.wikia.nocookie.net/cswikia/images/4/4a/Galilar_hud.png/revision/latest/scale-to-height-down/100",
	weapon_m4a1_silencer: "http://vignette3.wikia.nocookie.net/cswikia/images/4/4f/M4a1s_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_m4a1: "http://vignette2.wikia.nocookie.net/cswikia/images/d/d9/M4a4_hud.png/revision/latest/scale-to-height-down/100",
	weapon_sg556: "http://vignette1.wikia.nocookie.net/cswikia/images/9/9b/Sg556_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_awp: "http://vignette3.wikia.nocookie.net/cswikia/images/e/eb/Awp_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_g3sg1: "http://vignette4.wikia.nocookie.net/cswikia/images/4/4a/G3sg1_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_ssg08: "http://vignette4.wikia.nocookie.net/cswikia/images/3/3c/Ssg08_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_scar20: "http://vignette4.wikia.nocookie.net/cswikia/images/c/c9/Scar20_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_m249: "http://vignette2.wikia.nocookie.net/cswikia/images/e/ea/M249_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_negev: "http://vignette2.wikia.nocookie.net/cswikia/images/b/be/Negev_hud.png/revision/latest/scale-to-height-down/100",

	weapon_c4: "http://vignette1.wikia.nocookie.net/cswikia/images/f/fc/C4_ticking_source.png/revision/latest/scale-to-height-down/100",
	weapon_hegrenade: "http://vignette1.wikia.nocookie.net/cswikia/images/6/60/Ammo_hegrenade_css.png/revision/latest/scale-to-height-down/100",
	weapon_molotov: "http://vignette3.wikia.nocookie.net/cswikia/images/f/fc/Molotov_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_flashbang: "http://vignette2.wikia.nocookie.net/cswikia/images/a/af/Flashbang_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_decoy: "http://vignette1.wikia.nocookie.net/cswikia/images/7/78/Decoy_hud.png/revision/latest/scale-to-height-down/100",
	weapon_smokegrenade: "http://vignette3.wikia.nocookie.net/cswikia/images/4/48/Smokegrenade_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_incgrenade: "http://vignette2.wikia.nocookie.net/cswikia/images/4/45/Incgrenade_hud_csgo.png/revision/latest/scale-to-height-down/100",

	weapon_knife: "http://vignette2.wikia.nocookie.net/cswikia/images/4/4b/Knife_ct_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_t: "http://vignette3.wikia.nocookie.net/cswikia/images/2/28/Knife_t_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_bayonet: "http://vignette2.wikia.nocookie.net/cswikia/images/2/28/Csgo_knife_Bayonet.png/revision/latest/scale-to-height-down/100",
	weapon_knife_butterfly: "http://vignette2.wikia.nocookie.net/cswikia/images/d/df/Knife_butterfly_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_falchion: "http://vignette4.wikia.nocookie.net/cswikia/images/7/7e/Falchion_Knife_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_flip: "http://vignette3.wikia.nocookie.net/cswikia/images/a/a4/Knife_flip_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_gut: "http://vignette2.wikia.nocookie.net/cswikia/images/f/ff/Knife_gut_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_tactical: "http://vignette2.wikia.nocookie.net/cswikia/images/5/53/Knife_hustman_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_karambit: "http://vignette4.wikia.nocookie.net/cswikia/images/5/57/Knife_karambit_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_m9_bayonet: "http://vignette4.wikia.nocookie.net/cswikia/images/d/d3/Csgo_knife_M9_Bayonet.png/revision/latest/scale-to-height-down/100",
	weapon_knife_shadow_dagger: "http://vignette4.wikia.nocookie.net/cswikia/images/f/f1/Knife_push_hud_outline_csgo.png/revision/latest/scale-to-height-down/100"
};

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
var heavy = [
	"weapon_mag7",
	"weapon_nova",
	"weapon_sawedoff",
	"weapon_xm1014",
	"weapon_m249",
	"weapon_negev",
	"weapon_g3sg1",
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

module.exports = {
	// logs the data straight from the post requests
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


		if (csgoJson.player) {
			var newWeapons = {
				weapons: {
					primary: {
						name: '',
						ammo: 0,
						ammo_max: 0,
						ammo_reserve: 0,
						img: '',
					},
					secondary: {
						name: '',
						ammo: 0,
						ammo_max: 0,
						ammo_reserve: 0,
						img: '',
					},
					knife: {
						name: '',
						img: '',
					},
					flashes: 0,
					he: 0,
					smoke: 0,
					molly: 0,
					incgrenade: 0,
					decoy: 0,
					zeus: false,
				},
				currentWeapon: {

				},
				reloading: false,
				bomb: false,
			};

			// 
			//  I should probably write a function to do this weapon matching and the such
			//  maybe hash table?
			//  
			//  I need to learn more about data structures
			// 

			if (csgoWeapons) {
			for (i=0;i<Object.keys(csgoWeapons).length;i++) {
				var thisWeapon = csgoWeapons[weaponPrefix+i];
				// rifles
				for (k=0;k<rifles.length;k++) {
					if (thisWeapon.name == rifles[k]) {
						newWeapons.weapons.primary.name = thisWeapon.name;
						newWeapons.weapons.primary.ammo = thisWeapon.ammo_clip;
						newWeapons.weapons.primary.ammo_max = thisWeapon.ammo_clip_max;
						newWeapons.weapons.primary.ammo_reserve = thisWeapon.ammo_reserve;
						newWeapons.weapons.primary.img = imgUrl[thisWeapon.name];
						break;
					}
				}
				// smgs
				for (k=0;k<smgs.length;k++) {
					if (thisWeapon.name == smgs[k]) {
						newWeapons.weapons.primary.name = thisWeapon.name;
						newWeapons.weapons.primary.ammo = thisWeapon.ammo_clip;
						newWeapons.weapons.primary.ammo_max = thisWeapon.ammo_clip_max;
						newWeapons.weapons.primary.ammo_reserve = thisWeapon.ammo_reserve;
						newWeapons.weapons.primary.img = imgUrl[thisWeapon.name];
						break;
					}
				}
				// heavy
				for (k=0;k<heavy.length;k++) {
					if (thisWeapon.name == heavy[k]) {
						newWeapons.weapons.primary.name = thisWeapon.name;
						newWeapons.weapons.primary.ammo = thisWeapon.ammo_clip;
						newWeapons.weapons.primary.ammo_max = thisWeapon.ammo_clip_max;
						newWeapons.weapons.primary.ammo_reserve = thisWeapon.ammo_reserve;
						newWeapons.weapons.primary.img = imgUrl[thisWeapon.name];
						break;
					}
				}
				// pistols
				for (k=0;k<pistols.length;k++) {
					if (thisWeapon.name == pistols[k]) {
						newWeapons.weapons.secondary.name = thisWeapon.name;
						newWeapons.weapons.secondary.ammo = thisWeapon.ammo_clip;
						newWeapons.weapons.secondary.ammo_max = thisWeapon.ammo_clip_max;
						newWeapons.weapons.secondary.ammo_reserve = thisWeapon.ammo_reserve;
						newWeapons.weapons.secondary.img = imgUrl[thisWeapon.name];
						break;
					}
				}
				if (thisWeapon.name.indexOf("weapon_knife") >= 0) {
					newWeapons.weapons.knife.name = thisWeapon.name;
					newWeapons.weapons.knife.img = imgUrl[thisWeapon.name];
				}

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
						newWeapons.weapons.incgrenade = thisWeapon.ammo_reserve;
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

				// c4
				if (thisWeapon.name == "weapon_c4")
					newWeapons.bomb = true;

				// weapon states
				if (thisWeapon.state == "active") {
					newWeapons.currentWeapon = thisWeapon.name;
				} else if (thisWeapon.state == "reloading") {
					newWeapons.currentWeapon = thisWeapon.name;
					newWeapons.reloading = true;
				}

			}
			}
			return newWeapons;
		}
		else {
			var errReturn = {"err": "Data provided has no weapons to organize"};
			return errReturn;
		}
	},
	// mostly fixes smoked, burning, flashed from 0-255 to 0-100 or fractions
	organizeState: function (json) {
		var csgoJson = JSON.parse(json);
		var csgoState = csgoJson.player.state;

		// function that changes number (max 255)[8 bit binary max]
		// to anohter number (max 100) [percents/easier for humans]
		var binaryTo100 = function (n) {
			var out = Math.round((n/255)*100);
			return out;
		};

		if (csgoState) {

		var newState = {
			health: csgoState.health, // 0 to 100
			armor: csgoState.armor,   // 0 to 100
			helmet: csgoState.helmet, // bool
			flashed: binaryTo100(csgoState.flashed), // now 0 to 100
			smoked: binaryTo100(csgoState.smoked),   // now 0 to 100
			burning: binaryTo100(csgoState.burning), // now 0 to 100
			money: csgoState.money, // 0 to max
			kills: csgoState.round_kills, // 0 to max
			headshots: csgoState.round_killshs, // 0 to # of kills
		};		

		return newState;
		}
	},
	organizeRound: function (json) {
		var csgoJson = JSON.parse(json);
		var csgoRound = csgoJson.round;
		return csgoRound;
	},	

	// stats need to organizing
};