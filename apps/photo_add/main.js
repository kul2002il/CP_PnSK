
let photoAddApp = new Vue(
{
	el: "#photoAddApp",
	data:
	{
		photo: "",
		response: {},
	},
	methods:
	{
		send: function()
		{
			const fileForm = document.getElementById("photoForm");

			let url = "http://u104386.test-handyhost.ru/api/photo";
			let options = {
				method: "POST",
				headers: {},
				body: new FormData(fileForm),
			};

			if (global.token)
			{
				options.headers.Authorization = "Bearer " + global.token;
			}
			else
			{
				sendMessage("Чтобы отправить фото, необходимо войти.");
				return;
			}

			fetch(url, options).then(response => response.json())
			.then(res=>
			{
				if(res.id)
				{
					sendMessage("Фото успешно загружено.");
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
						sendMessage("Unprocessable entity: " + index + ": " + res[index]);
					}
				}
			});
		},
	},
});
