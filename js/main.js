
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
	setList: initSetList,
};

Vue.component("todo-list", {
	props: ["list"],
	template:
'<div>\
	<h3><input v-model="list.name"></h3>\
	<button @click="deleteList">Удалить</button>\
	<label :for="list+list.dateCreate">цвет</label>\
	<input v-model="list.color" type="color" :id="list+list.dateCreate" hidden>\
	<ol>\
		<todo-item v-for="pin in list.list" :key="pin.dateCreate" :pin="pin"></todo-item>\
		<li>\
			<button @click="addPin">Добавить</button>\
		</li>\
	</ol>\
	<div>{{(new Date(list.dateCreate)).toLocaleTimeString()}}</div>\
</div>',
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
});

Vue.component("todo-item", {
	props: ["pin"],
	template:
'<li>\
	<input v-model="pin.check" type="checkbox">\
	<input v-model="pin.pin" placeholder="Пункт">\
	<button @click="deletePin">Удалить</button>\
</li>',
	methods:
	{
		deletePin: function () {
			let list = this._vnode.parent.context.list;
			let index = list.list.indexOf(this.pin);
			list.list.splice(index,1);
		},
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
				list: [],
			});
		}
	},
	updated: function () {
		console.log("updated");
	}
});
