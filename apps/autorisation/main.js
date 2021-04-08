
let autorisationApp = new Vue(
{
	el: "#autorisationApp",
	data:
	{
		phone: "",
		password: "",
	},
	methods:
	{
		login: function () {
			console.log("Вход");
		}
	},
});
