
let area = [[]];

let data = {
	username1: "Пупа",
	username2: "Лупа",
	isWishComp: false,
	stepUser1: true,
	stepGame: 'login',
	win: "",
	area: area,
	numberInLine: 3,
	rows: 3,
	cols: 3,
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function computerClick() {
	let buttons = document.querySelectorAll("button");
	buttons[getRandomInt(0, buttons.length)].click();
}

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
	let wigth = data.cols;
	let height = data.rows;

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
					else
					{
						count = 0;
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
			// Установка поля
			let template = {text: "_",};
			let rowTemplate = [];
			//area = [];
			for (let i = 0; i < this.cols; i++)
			{
				rowTemplate.push(Object.assign({}, template))
			}
			let srtTem = JSON.stringify(rowTemplate);
			for (let i = 0; i < this.rows; i++)
			{
				area.push(JSON.parse(srtTem));
			}
			area.shift();

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
				data.stepUser1 = !data.stepUser1;
				if(data.isWishComp)
				{
					computerClick();
				}
			}
			else
			{
				data.stepUser1 = !data.stepUser1;
				this.field.text = "O";
			}
		}
	},
	template:
'<div class="field">\
<span v-if="field.text===\'_\'"><button @click="stepGo">u</button></span>\
<span v-else>{{field.text}}</span>\
</div>',
});
