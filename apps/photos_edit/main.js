
let photoEditApp = new Vue(
{
	el: "#photoEditApp",
	data:
	{
		id: "0",
		photoForm: "",
		name: "Новое имя",
		response: {},
	},
	methods:
	{
		send: function()
		{
			let elemForm = document.getElementById("photoEditInput");
			encodeImageFileAsBase64(elemForm)
			.then(function(dataImage)
			{
				let body = {
					_method: "patch",
					name: this.name,
					photo: dataImage,
				};

				query(
					"photo/" + photoEditApp.id,
					body,
					"post")
				.then(res=>
				{
					if(res.id)
					{
						sendMessage("Фото успешно изменено.");
						this.response = res;
					}
					else if(res.message)
					{
						sendMessage("Чтобы отправить фото, необходимо войти.");
					}
					else
					{
						for (let index in res)
						{
							sendMessage("Ошибка: " + index + ": " + res[index]);
						}
					}
				});

			});
		},
	},
});
