
function quetyClear(url, body, method = "get")
{
	url = "http://u104386.test-handyhost.ru/api/" + url;
	let options = {
		method: method.toUpperCase(),
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
	};
	if (method.toUpperCase() in ["POST"])
	{
		options.body = JSON.stringify(body);
	}
	return fetch(url, options);
}

function quety(url, body, method = "get")
{
	return quetyClear(url, body, method = "get")
		.then(response => response.json());
}

let global = {
	token: null,
};
