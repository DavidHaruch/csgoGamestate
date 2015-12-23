var socket = io("http://192.168.1.9:6378");
// ip needs to be the local ip of the computer you are playing csgo on
// to find this type ifconfig or ipconfig in terminal or command prompt respectively
// look under the Ethernet adapter and IPv4 Adress
// An example would be 192.168.1.2

var vm = new Vue({
	el: '#main',
	data: {
		inventory: "",
		player: "",
		bombTimer: 0,
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
			// console.log(response);
		});
	},
	computed: {
		// I have no idea how to make this DRY need help
		isPrimary: function () {
			if (this.inventory.currentWeapon == this.inventory.weapons.primary.name)
				return true;
		},
		isSecondary: function () {
			if (this.inventory.currentWeapon == this.inventory.weapons.secondary.name)
				return true;
		},
		isKnife: function () {
			if (this.inventory.currentWeapon == this.inventory.weapons.knife.name)
				return true;
		},
		isHE: function () {
			if (this.inventory.currentWeapon == "weapon_hegrenade")
				return true;
		},
		isFlash: function () {
			if (this.inventory.currentWeapon == "weapon_flashbang")
				return true;
		},
		isSmoke: function () {
			if (this.inventory.currentWeapon == "weapon_smokegrenade")
				return true;
		},
		isMolly: function () {
			if (this.inventory.currentWeapon == "weapon_molotov")
				return true;
		},
		isInc: function () {
			if (this.inventory.currentWeapon == "weapon_incgrenade")
				return true;
		},
		isDecoy: function () {
			if (this.inventory.currentWeapon == "weapon_decoy")
				return true;
		},
		isC4: function () {
			if (this.inventory.currentWeapon == "weapon_c4")
				return true;
		},
	},
	methods: {
		flashedKills: function () {

		},
	},
});
Vue.config.debug = true;

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