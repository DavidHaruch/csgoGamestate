var socket = io("http://localhost:6378");

var vm = new Vue({
	el: '#main',
	data: {
		weapons: "",
	},
	init: function() {
		socket.on("weapons",function(response) {
			vm.$data = JSON.parse(response);
		});
	},
	methods: {
		button: function () {
			console.log(vm.$data.currentWeapon);
		}
	},
});
Vue.config.debug = true;
