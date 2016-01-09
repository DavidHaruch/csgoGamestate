var socket = io("http://192.168.1.9:6378");
/*
	if you see SCRIPTMARKERIP please run /Install/configureip.js
	otherwise, change the IP as you see fit
*/

var notification_length = 3000; // in ms (1s = 1000ms)
var transition_time = notification_length + 400; // in ms, from line 44 of main.sass

var vm = new Vue({
	el: '#body',
	data: {
		// I only put in placeholder data for when I want to work on the css without the game running
		// It would be neat if there was something to make fake data to send to these gamestate progrmas
		inventory: {
			weapons: {
				primary: {
					name: 'weapon_ak47',
					ammo: 30,
					ammo_max: 30,
					ammo_reserve: 40,
					img: 'http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_ak47.a320f13fea4f21d1eb3b46678d6b12e97cbd1052.png'
				},
				secondary: {
					name: 'weapon_p250',
					ammo: 3,
					ammo_max: 13,
					ammo_reserve: 40,
					img: 'http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_p250.0bc9109121fb318a3bb18f6fa92692c7aa433205.png'
				},
				knife: {
					name: 'Karambit',
					img: 'http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_am_doppler_phase1_light_large.16c0819028af598b772826c2bc675712a1d5af37.png',
				},
				flashes: 1,
				he: 1,
				smoke: 1,
				molly: 1,
				incgrenade: 0,
				decoy: 0,
				zeus: true,
			},
			currentWeapon: {
				name: 'weapon_ak47',
					ammo: 30,
					ammo_max: 30,
					ammo_reserve: 40,
					img: 'http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_ak47.a320f13fea4f21d1eb3b46678d6b12e97cbd1052.png'
			},
			reloading: false,
			bomb: true,
		},
		player: {
			health: 90,
			armor: 50,
			helmet: true,
			flashed: 0,
			smoked: 0,
			burning: 0,
			money: 800,
			kills: 0,
			headshots: 0,
		},
		bombTimer: 0,
		map: {
			mode: "competitve",
			name: "de_dust2",
			phase: "live",
			round: 4,
			team_ct_score: 2,
			team_t_score: 2,
		},
		round: {

		},
		flashKill: false,
		snackbarText: "",
		notification: false,
	},
	init: function() {
		socket.on("weapons",function (response) {
			var newData = JSON.parse(response);
			vm.$data.inventory = newData;
		});
		socket.on("state",function (response) {
			var newData = JSON.parse(response);
			vm.$data.player = newData;
		});
		socket.on("bombTimer",function (response) {
			// console.log(response);
			vm.$data.bombTimer = response;
		});
		socket.on("round",function (response) {
			vm.$data.round = JSON.parse(response);
		});
		socket.on("flashKill",function (response) {
			// this should be put into a function for notifications
			vm.notify("Kill while flashed", response);
		});
		socket.on("map", function (response) {
			var newData = JSON.parse(response);
			vm.$data.map = newData;
		});
	},
	computed: {
	},
	methods: {
		// condition is the variable that will eval to true
		// message (string) contains the message text
		// repeat = bool should this message only show once?
		notify: function (message, condition, repeat) {
			var notifyFalse = function () {
				vm.$data.notification = false;
			};
			var	snackbarFalse = function () {
				vm.$data.snackbarText = "";
			};
			var timeout_active = false;
			if (condition === true) {
				vm.$data.notification = true;
				vm.$data.snackbarText = message;
				if (!timeout_active) {
					timeout_active = true;
					setTimeout(function () {
						vm.$data.notification = false;
					}, notification_length);
					setTimeout(function () {
						vm.$data.snackbarText = "";
					}, transition_time);
				}
			}
		},
	},
	watch: {
		'inventory.currentWeapon.type': function (newVal, oldVal) {
			if (document.getElementById(oldVal)) {
				document.getElementById(oldVal).classList.toggle("weapon-selected");				
			}
			if (document.getElementById(newVal)) {
				document.getElementById(newVal).classList.toggle("weapon-selected");
			}
		}
	}
});
Vue.config.debug = true;


// I should probably move this to server side
var weaponRealNames = {
	weapon_cz75a: "CZ75-Auto",
	weapon_deagle: "Desert Eagle",
	weapon_elite: "Dual Berettas",
	weapon_fiveseven: "Five-Seven",
	weapon_glock: "Glock-18",
	weapon_p250: "P250",
	weapon_hkp200: "P2000",
	weapon_tec9: "Tec-9",
	weapon_usp_silencer: "USP-S",
	weapon_mag7: "MAG-7",
	weapon_revolver: "R8 Revolver",
	weapon_nova: "Nova",
	weapon_sawedoff: "Sawed-Off",
	weapon_xm1014: "XM1014",
	weapon_mac10: "MAC-10",
	weapon_mp7: "MP7",
	weapon_mp9: "MP9",
	weapon_p90: "P90",
	weapon_bizon: "PP-Bizon",
	weapon_ump45: "UMP-45",
	weapon_ak47: "AK-47",
	weapon_aug: "AUG",
	weapon_famas: "Famas",
	weapon_galilar: "Galil AR",
	weapon_m4a1_silencer: "M4A1-S",
	weapon_m4a1: "M4A4",
	weapon_sg556: "SG553",
	weapon_awp: "AWP",
	weapon_g3sg1: "G3SG1",
	weapon_ssg08: "SSG 08",
	weapon_scar20: "SCAR-20",
	weapon_m249: "M249",
	weapon_negev: "Negev",

	weapon_knife: "Knife",
	weapon_knife_t: "Knife",
	weapon_knife_bayonet: "Bayonet",
	weapon_knife_butterfly: "Butterfly Knife",
	weapon_knife_falchion: "Falchion Knife",
	weapon_knife_flip: "Flip Knife",
	weapon_knife_gut: "Gut Knife",
	weapon_knife_tactical: "Huntsman Knife",
	weapon_knife_karambit: "Karambit",
	weapon_knife_m9_bayonet: "M9 Bayonet",
	weapon_knife_shadow_dagger: "Shadow Daggers"
};

Vue.filter("realName", function (val) {
	return weaponRealNames[val];
});
