
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
	setList: JSON.parse(localStorage.setList || "[]"),
};

Vue.component("todo-list", {
	props: ["list"],
	template:
'<div :style="styleObject" class="list">\
	<table class="listHeader">\
		<tr>\
			<td><input v-model="list.name"></td>\
			<td>\
				<button @click="deleteList">-</button>\
				<label :for="list+list.dateCreate">цвет</label>\
				<input v-model="list.color" type="color" :id="list+list.dateCreate" hidden>\
			</td>\
		</tr>\
	</table>\
	<ol>\
		<todo-item v-for="pin in list.list" :key="pin.dateCreate" :pin="pin"></todo-item>\
		<li><table class="tableList"><tr>\
			<td class="checkbox"></td>\
			<td><button @click="addPin">Добавить</button></td>\
			<td></td>\
		</tr></table></li>\
	</ol>\
	<div>{{(new Date(list.dateCreate)).toLocaleTimeString()}}</div>\
</div>',
	computed:
	{
		styleObject: function () {
			return {
				borderTop: `5px solid ${this.list.color}`,
			};
		}
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
'<li><table class="tableList"><tr>\
<td class="checkbox"><input v-model="pin.check" type="checkbox"></td>\
<td><input v-model="pin.pin" placeholder="Пункт"></td>\
<td><button @click="deletePin">-</button></td>\
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
