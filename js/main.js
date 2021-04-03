
function saveLists()
{
	localStorage.setList = JSON.stringify(data.setList);
}

let id = +(new Date());

let initSetList = [
	{
		name: "Первый список",
		dateCreate: id,
		color: "#99ff99",
		list: [
			{
				check: false,
				pin: "Дело 1",
				dateCreate: id + 1,
			},
			{
				check: true,
				pin: "Дело 2",
				dateCreate: id + 2,
			},
		],
	},
	{
		name: "Второй список",
		dateCreate: id + 3,
		color: "#9999ff",
		list: [
			{
				check: false,
				pin: "Дело 1",
				dateCreate: id + 4,
			},
			{
				check: true,
				pin: "Дело 2",
				dateCreate: id + 5,
			},
		],
	},
];

let data = {
	nameList: "",
	sortType: "Имя",
	setList: JSON.parse(localStorage.setList || "[]"),
};

Vue.component("todo-list", {
	props: ["list"],
	template:
'<li :style="styleObject" class="list">\
	<table class="listHeader">\
		<tr>\
			<td><input v-model="list.name"></td>\
			<td>\
				<button @click="deleteList">del</button>\
			</td>\
			<td>\
				<label :for="list+list.dateCreate">clr</label>\
				<input v-model="list.color" type="color" :id="list+list.dateCreate" hidden>\
			</td>\
		</tr>\
	</table>\
	<transition-group tag="ol" name="pin" class="todoList">\
		<todo-item v-for="pin in list.list" :key="pin.dateCreate" :pin="pin"></todo-item>\
		<li key="-1"><table class="tableList"><tr>\
			<td class="checkbox"></td>\
			<td><button @click="addPin">Добавить</button></td>\
			<td></td>\
		</tr></table></li>\
	</transition-group>\
	<div>{{(new Date(list.dateCreate)).toLocaleTimeString()}}</div>\
</li>',
	computed:
	{
		styleObject: function () {
			return {
				borderTop: `5px solid ${this.list.color}`,
			};
		},
	},
	methods:
	{
		addPin: function () {
			this.list.list.push({
				check: false,
				pin: "",
				dateCreate: +(new Date()),
			});
		},
		deleteList: function () {
			let index = data.setList.indexOf(this.list);
			data.setList.splice(index,1);
		},
	},
	updated: function () {
		saveLists();
	},
});

Vue.component("todo-item", {
	props: ["pin"],
	template:
'<li class="pin"><table class="tableList"><tr>\
<td class="checkbox"><input v-model="pin.check" type="checkbox"></td>\
<td><input v-model="pin.pin" placeholder="Пункт"></td>\
<td><button @click="deletePin">del</button></td>\
</tr></table></li>',
	methods:
	{
		deletePin: function () {
			let list = this._vnode.parent.context.list;
			let index = list.list.indexOf(this.pin);
			list.list.splice(index,1);
		},
	},
	updated: function () {
		saveLists();
	},
});

let app = new Vue({
	el: "#app",
	data: data,
	computed:
	{
		sortedList: function () {
			let out;
			switch (this.sortType) {
				case "Время":
					console.log("\n\nсортировка по времени");
					out = this.setList.sort((a,b)=>{a.dateCreate - b.dateCreate});
					break;
				case "Приоритет":
				case "Имя":
					console.log("\n\nсортировка по имени");
					out = this.setList.sort((a,b)=>{
						if (a.dateCreate < b.dateCreate) return -1;
						if (a.dateCreate > b.dateCreate) return 1;
						return 0;
					});
					break;
			}
			out.reverse();
			for (let i = 0; i<out.length; i++){
				console.log(out[i].name, out[i].dateCreate);
			}
			return out;
		},
	},
	methods:
	{
		pushGo: function(){
			this.setList.push({
				name: this.nameList,
				dateCreate: +(new Date()),
				color: "#99ff99",
				list: [],
			});
		}
	},
	updated: function () {
		saveLists();
	},
});
