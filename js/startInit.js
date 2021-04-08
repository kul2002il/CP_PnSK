
function queryClear(url, body, method = "get")
{
	url = "http://u104386.test-handyhost.ru/api/" + url;
	let options = {
		method: method.toUpperCase(),
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
	};
	if (body)
	{
		options.body = JSON.stringify(body);
	}
	console.log(options);
	return fetch(url, options);
}

function query(url, body, method = "get")
{
	return queryClear(url, body, method)
		.then(response => response.json());
}

let global = {
	token: null,
};
