var socket = io("http://localhost:6378");

var vm = new Vue({
	el: '#main',
	data: {
		inventory: "",
		player: "",
	},
	init: function() {
		var vueThis = this;
		socket.on("weapons",function (response) {
			var newData = JSON.parse(response);
			vm.$data.inventory = newData;
		});
		socket.on("state",function (response) {
			var newData = JSON.parse(response);
			vm.$data.player = newData;
		});
	},
	computed: {
		isWeapon: function () {
			console.log(this);
			console.log(this.inventory.weapons.primary.name, this.inventory.currentWeapon);
			if (this.inventory.weapons.primary.name == this.inventory.currentWeapon)
				return true;
			else
				return false;
		}
	},
	methods: {
	},
});
Vue.config.debug = true;
