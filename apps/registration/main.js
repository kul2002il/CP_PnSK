
let registrationApp = new Vue(
{
	el: "#registrationApp",
	data:
	{
		first_name: "",
		surname: "",
		phone: "",
		password: "",
	},
	methods:
	{
		login: function()
		{
			query("signup", {
				first_name: this.first_name,
				surname: this.surname,
				phone: this.phone,
				password: this.password,
			}, "post")
			.then(res=>
			{
				if(res.id !== undefined)
				{
					changePage("authorization");
					sendMessage("Регистрация успешно выполнена.");
				}
				else
				{
					for (index in res)
					{
						sendMessage("Unprocessable entity:" + index + ": " + res[index]);
					}
				}
			});
		},
	},
});
