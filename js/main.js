
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

let data = {
	state: "login",
	username: "Биба",
	fishes: [{},{},{},{},{},{},],
	aquariumSize: {
		x: 300,
		y: 200
	},
}

let game = new Vue({
	el: "#game",
	data: data,
	methods:
	{
		loginGo: function () {
			this.state = "game";
		},
	},
});

Vue.component("fish", {
	props: ["fish"],
	data: function()
	{
		this.fish.src = "img/" + getRandomInt(1, 6) + ".svg";
		this.fish.cost = getRandomInt(1, 4);
		this.fish.position =
		{
			x: Math.random(),
			y: Math.random(),
		}
		return {};
	},
	template: '<img class="fish" :src="fish.src" alt="fish" :style="styleObject" @click="grab">',
	computed:
	{
		styleObject: function () {
			return {
				width: (150 - this.fish.cost * 30) + "px",
				top: data.aquariumSize.y * this.fish.position.y - this.size.y + "px",
				left: data.aquariumSize.x * this.fish.position.x - this.size.x + "px",
			};
		},
		size: function () {
			if(this.$el)
			return {
				y: this.$el.offsetHeight,
				x: this.$el.offsetWidth,
			};
			return {
				y: 0,
				x: 0,
			};
		},
	},
	methods:
	{
		grab: function () {
			let index = data.fishes.indexOf(this.fish);
			if (index > -1) {
				data.fishes.splice(index, 1);
			}
		},
	},
});
