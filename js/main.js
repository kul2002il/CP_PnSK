
const limitFish = 20;

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

window.onresize = function()
{
	let aqua = document.querySelector(".aquarium");
	if (aqua)
	{
		data.aquariumSize.x = aqua.offsetWidth;
		data.aquariumSize.y = aqua.offsetHeight;
	}
};

let data = {
	state: "login",
	username: "Биба",
	fishes: [],
	aquariumSize: {
		x: 800,
		y: 600,
	},
	score: 0,
	timeStart: new Date(),
	timer: 60000,
	timeLeft: 0,
	leaderboard: JSON.parse(localStorage["leaderboard"] || "[]"),
};

let game = new Vue({
	el: "#game",
	data: data,
	computed:
	{
		timerStyle: function()
		{
			let percent = Math.ceil((data.timeLeft % 1)*100);
			let color = ["#0ff", "#faf"];
			if (data.timeLeft % 2 > 1){
				color.reverse()
			}
			return {background: `linear-gradient(to left, ${color[0]} ${percent}%, ${color[1]} ${percent}%)`}
		}
	},
	methods:
	{
		loginGo: function () {
			this.state = "game";
			data.timeStart = new Date();
			setInterval(()=>{
				if (data.fishes.length < limitFish)
				{
					data.fishes.push({position:{}, size: {}, id: +(new Date())});
				}
			}, 1000);
		},
	},
});

Vue.component("fish", {
	props: ["fish"],
	data: function()
	{
		this.fish.src = "img/" + getRandomInt(1, 6) + ".svg";
		this.fish.cost = getRandomInt(1, 4);
		this.fish.position = {
			x: Math.random(),
			y: Math.random(),
		};
		this.fish.speed = {
			x: Math.random() * 0.02 - 0.01,
			y: Math.random() * 0.002 - 0.001,
		};
		return {};
	},
	template: '<img class="fish" :src="fish.src" alt="fish" :style="styleObject" @click="grab">',
	computed:
	{
		styleObject: function () {
			return {
				width: this.size.x + "px",
				top: `calc((100% - ${this.size.y}px) * ${this.fish.position.y})`,
				left: `calc((100% - ${this.size.x}px) * ${this.fish.position.x})`,
				transform: `scale(${(this.fish.speed.x > 0) * 2 - 1}, 1)`
			};
		},
		size: function () {
			if(this.$el)
			return {
				y: this.$el.offsetHeight,
				x: 150 - this.fish.cost * 30,
			};
			return {
				y: 100,
				x: 150 - this.fish.cost * 30,
			};
		},
	},
	methods:
	{
		grab: function () {
			this.fish.speed.y = -0.07;
			this.fish.canMoveUp = true;
			let index = data.fishes.indexOf(this.fish);
			setTimeout(function () {
				if (index > -1) {
					data.fishes.splice(index, 1);
				}
			}, 2000);
			data.score += this.fish.cost;
		},
	},
});

function loop() {
	if (document.querySelector(".aquarium"))
	{
		data.fishes.forEach(fish=>{
			fish.position.x += fish.speed.x;
			fish.position.y += fish.speed.y;

			if((fish.position.y > 1 || fish.position.y < 0) && !(fish.canMoveUp))
			{
				fish.speed.y *= -1;
				fish.position.y += fish.speed.y;
			}
			if(fish.position.x > 1 || fish.position.x < 0)
			{
				fish.speed.x *= -1;
				fish.position.x += fish.speed.x;
			}
		});
		data.timeLeft = (data.timer - (new Date() - data.timeStart)) / 1000;
		if (data.timeLeft <= 0)
		{
			data.leaderboard.push({
				user: data.username,
				score: data.score,
			});
			data.leaderboard.sort((a, b)=> b.score - a.score);
			if(data.leaderboard.length > 10)
			{
				data.leaderboard.splice(10, 999);
			}
			localStorage["leaderboard"] = JSON.stringify(data.leaderboard);
			data.state = "end";
		}
	}
	requestAnimationFrame(loop);
}

loop();


