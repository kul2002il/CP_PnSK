
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
			.then(res=>
			{
				if(res.token)
				{
					global.token = res.token;
					changePage("main");
					sendMessage("Авторизация успешно выполнена.");
				}
				else if(res.login)
				{
					sendMessage("Неверное имя пользователя и/или пароль.");
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
