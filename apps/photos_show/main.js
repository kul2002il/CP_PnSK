
let getPhotoApp = new Vue(
{
	el: "#getPhotoApp",
	data:
	{
		photos: [],
	},
	methods:
	{
		getPhotoGo: function()
		{
			query("photo")
			.then(res=>
			{
				if(res.message === undefined)
				{
					sendMessage("Выход успешно выполнен.");
					this.photos = res
				}
				else
				{
					sendMessage("Чтобы получить фотографии, нужно войти.");
				}
			});
		},
	},
});
