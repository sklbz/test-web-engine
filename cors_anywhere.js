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


function setupProxy() {
	function doCORSRequest(options, printResult) {
		const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
		const x = new XMLHttpRequest();
		x.open(options.method, cors_api_url + options.url);

		x.onload = x.onerror = function() {
			printResult(
				options.method + ' ' + options.url + '\n' +
				x.status + ' ' + x.statusText + '\n\n' +
				(x.responseText || '')
			);
		};

		if (/^POST/i.test(options.method)) {
			x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		x.send(options.data);
	}

	doCORSRequest({
		method: 'GET',
		url: `cors-demo`,
		data: null
	},
		console.log
	)
}
