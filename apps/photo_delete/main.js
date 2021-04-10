
let deletePhotoApp = new Vue(
{
	el: "#deletePhotoApp",
	data:
	{
		id: 0,
	},
	methods:
	{
		deleteGo: function()
		{
			queryClear("photo/" + this.id, undefined, "delete")
			.then(res=>
			{
				console.log(res);
				if(res.status === 204)
				{
					sendMessage("Удаление выполнено")
				}
				else if (res.status === 403)
				{
					sendMessage("Вы пытаетесь удалить не своё фото, либо не вошли.");
				}
				else if (res.status === 404)
				{
					sendMessage("Фотография не найдена.");
				}
				else
				{
					sendMessage("Непредвиденная ошибка.");
				}
			});
		},
	},
});
