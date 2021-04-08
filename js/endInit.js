
Vue.component("message",
{
	props: ["message"],
	template: "<li>{{message.text}} <button @click='closeMessage'>✖</button></li>",
	methods:
	{
		closeMessage: function ()
		{
			let index = global.messages.indexOf(this.message);
			global.messages.splice(index, 1);
		}
	}
});

let globalApp = new Vue(
{
	el: "#globalApp",
	data: global,
});
