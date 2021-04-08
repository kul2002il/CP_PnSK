
let authorizationApp = new Vue(
{
	el: "#authorizationApp",
	data:
	{
		phone: "",
		password: "",
	},
	methods:
	{
		login: function()
		{
			query("login", {
				phone: this.phone,
				password: this.password,
			}, "post")
			.then(res=>console.log(res));
		},
	},
});
