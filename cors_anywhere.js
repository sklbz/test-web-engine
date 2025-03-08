function doGetRequest({ url, data }, execute) {
	const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
	const x = new XMLHttpRequest();

	x.open("GET", `${cors_api_url}${url}`)
	x.onload = x.onerror = function() {
		console.log(`
${url} 
${x.status} ${x.statusText}
${x.responseText || ''}
		`);
		execute(x.response);
	};

	x.send(data);
}

function doCORSRequest({ method, url, data }, execute) {
	const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
	const x = new XMLHttpRequest();
	x.open(method, cors_api_url + url);

	x.onload = x.onerror = function() {
		console.log(`
${method} ${url} 
${x.status} ${x.statusText}
${x.responseText || ''}`
		);
		execute(x.response);
	};

	if (/^POST/i.test(method)) {
		x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	x.send(data);

}

function setupProxy() {
	doCORSRequest({
		method: 'GET',
		url: `https://cors-anywhere.herokuapp.com/cors-demo`,
		data: null
	})
}
