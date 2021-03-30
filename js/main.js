
let area =
[
	[
		{text: "_",},
		{text: "_",},
		{text: "_",},
	],
	[
		{text: "_",},
		{text: "_",},
		{text: "_",},
	],
	[
		{text: "_",},
		{text: "_",},
		{text: "_",},
	],
];

let data = {
	username1: "Пупа",
	username2: "Лупа",
	stepUser1: true,
	stepGame: 'login',
	win: "",
	area: area,
	numberInLine: 3,
};

function checkWin(charPlayer)
{
	let directions =
	{
		lu_rd: {down: 1, right: 1},
		ru_ld: {down: 1, right: -1},
		lu_ld: {down: 1, right: 0},
		lu_ru: {down: 0, right: 1},
	};
	let limit = data.numberInLine;
	let wigth = area[0].length;
	let height = area.length;

	startsCoor = [];
	for(let i = 0; i < height; i++)
	{
		startsCoor.push({y: i,x: 0});
		startsCoor.push({y: i,x: wigth-1});
	}
	for(let i = 0; i < wigth; i++)
	{
		startsCoor.push({y: 0,x: i});
	}

	for(let start in startsCoor)
	{
		for(let direct in directions)
		{
			let y = startsCoor[start].y;
			let x = startsCoor[start].x;
			let count = 0;
			try
			{
				while(1)
				{
					if(area[y][x].text === charPlayer)
					{
						count++;
						if(count >= limit)
						{
							return true;
						}
					}
					y += directions[direct].down;
					x += directions[direct].right;
				}
			}
			catch (e){}
		}
	}
	return false;
}

let game = new Vue({
	el: "#game",
	data: data,
	updated: function()
	{
		//Заканчивание игры
		if(checkWin("X"))
		{
			data.win = 1;
			data.stepGame = 'win';
		}
		else if(checkWin("O"))
		{
			data.win = 2;
			data.stepGame = 'win';
		}
	},
	methods:
	{
		loginGo: function () {
			this.stepGame = 'game';
		},
	},
});

Vue.component("area-row", {
	props: ["row"],
	template: '<div class="row"><area-field v-for="field in row" v-bind:field="field" :key="field.id"></area-field></div>',
});

Vue.component("area-field", {
	props: ["field"],
	data: function()
	{
		return {
			exist: true,
			line: false,
		}
	},
	methods:
	{
		stepGo: function () {
			if(data.stepUser1)
			{
				this.field.text = "X";
			}
			else
			{
				this.field.text = "O";
			}
			data.stepUser1 = !data.stepUser1;
		}
	},
	template:
'<div class="field">\
<span v-if="field.text===\'_\'"><button @click="stepGo">u</button></span>\
<span v-else>{{field.text}}</span>\
</div>',
});
