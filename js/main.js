
function saveLists()
{
	localStorage.setList = JSON.stringify(data.setList);
}

let data = {
	nameList: "",
	sortType: "Имя",
	sortReverse: false,
	setList: JSON.parse(localStorage.setList || "[]"),
};

Vue.component("todo-list", {
	props: ["list"],
	template:
'<li :style="styleObject" class="list">\
	<table class="listHeader">\
		<tr>\
			<td><input v-model="list.name"></td>\
			<td class="priority">\
				<input v-model="list.priority" type="number">\
			</td>\
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
					out = this.setList.sort((a,b)=>{
						console.log(a.dateCreate);
						return a.dateCreate - b.dateCreate;
					});
					break;
				case "Приоритет":
					out = this.setList.sort((a,b)=>{
						return a.priority - b.priority;
					});
					break;
				case "Имя":
					out = this.setList.sort((a,b)=>{
						if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
						if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
						return 0;
					});
					break;
			}

			if(this.sortReverse)
			{
				out.reverse();
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
				priority: 1,
				list: [],
			});
			let sort = this.sortType;
			this.sortType = "";
			this.sortType = sort;
		}
	},
	updated: function () {
		saveLists();
	},
});
