function setupProxy() {
	const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
	function doCORSRequest(options, printResult) {
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
