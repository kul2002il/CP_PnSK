
let logoutApp = new Vue(
{
	el: "#logoutApp",
	data:
	{
		first_name: "",
		surname: "",
		phone: "",
		password: "",
	},
	methods:
	{
		logout: function()
		{
			query("logout", {}, "post")
			.then(res=>
			{
				if(res.message === undefined)
				{
					sendMessage("Выход успешно выполнен.");
					global.token = null;
				}
				else
				{
					sendMessage("Чтобы выйти, нужно войти.");
				}
				changePage("main");
			});
		},
	},
});
