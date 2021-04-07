
function query(url, out, body, method = "get")
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
	fetch(url, options)
		.then(response => response.json())
		.then(commits => out.response = commits);
}
