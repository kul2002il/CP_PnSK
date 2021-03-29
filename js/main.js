/*
let app = new Vue({
	el: "#app",
	data: {
		message: "Начало.",
	},
});


let app2 = new Vue({
	el: "#app2",
	data: {
		message: "Вы загрузили эту страницу: " + new Date().toLocaleString(),
	},
});


let app3 = new Vue({
	el: "#app3",
	data: {
		seen: true,
	},
});


let app4 = new Vue({
	el: "#app4",
	data: {
		todo:
		[
			{text: "Начать"},
			{text: "Продолжить"},
			{text: "Закончить"},
		],
	},
});


let app5 = new Vue({
	el: "#app5",
	data:
	{
		message: "Другое начало.",
	},
	methods:
	{
		reverse: function () {
			this.message = this.message.split('').reverse().join("");
		}
	},
});
*/

let username = new Vue({
	el: "#username",
	data: {
		login: true,
		message: "",
		pinToPush: "",
		list: [],
	},
	methods:
	{
		loginGo: function () {
			this.login = false;
		},
		pushGo: function(){
			this.list.push(this.pinToPush);
		}
	},
});

Vue.component("todo-item", {
	props: ["todo"],
	data: function()
	{
		return {
			exist: true,
			line: false,
		}
	},
	template:
		'<li v-if="exist">' +
		'<span v-on:click="lineGo">' +
		'<span v-if="!line">{{todo}}</span>' +
		'<del v-if="line">{{todo}}</del>' +
		'</span>' +
		'<button v-on:click="deleteGo">Удалить</button>' +
		'</li>',
	methods:
	{
		deleteGo: function(){
			this.exist = false;
		},
		lineGo: function(){
			this.line = !this.line;
		}
	},
});

/*
let app7 = new Vue({
	el: "#app7",
	data: {
		list: [
			{
				id: 0,
				text: "Текст0",
			},
			{
				id: 1,
				text: "Текст1",
			},
			{
				id: 2,
				text: "Текст2",
			},
		],
	},
});
*/
