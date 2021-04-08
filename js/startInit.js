
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
	return fetch(url, options);
}

function query(url, body, method = "get")
{
	return queryClear(url, body, method)
		.then(response => response.json());
}


function changePage(page)
{
	document.getElementById(page + "ShowBlock").click();
}

let thisIsTheMostUniqueVariableNameSoThatNoOneWillAccidentallyRepeatItAndItIsNeededOnlyInOrderToReadUniqueIdentifiers = 0;
function getID(){
	return thisIsTheMostUniqueVariableNameSoThatNoOneWillAccidentallyRepeatItAndItIsNeededOnlyInOrderToReadUniqueIdentifiers++;
}

let global = {
	token: null,
	messages: [],
};

function sendMessage(message)
{
	global.messages.push(
	{
		id: getID(),
		text: message,
	});
}
