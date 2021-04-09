
let searchUsersApp = new Vue(
{
	el: "#searchUsersApp",
	data:
	{
		search: "",
		users: [],
	},
	methods:
	{
		searchGo: function()
		{
			query("user?search=" + this.search)
			.then(res=>
			{
				if(res.message === undefined)
				{
					sendMessage("Поиск выполнен.");
					this.users = res;
				}
				else
				{
					sendMessage("Невыполнен вход.");
				}
			});
		},
	},
});
