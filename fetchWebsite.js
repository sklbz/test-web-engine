const testWebsite = "https://example.com";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const browserURL = "https://www.google.com";

/*
 * https://cors-anywhere.herokuapp.com/corsdemo?accessRequest=1c3117a6bb2ead1ede3b2cce82f68247195ad4ca2679a50548e2d92a057066e4
 * */

function getBody(html) {
	const bodyRegex = /<body[^>]*>([\s\S]*?)<\/body>/i;
	const match = html.match(bodyRegex);
	return match ? match[1] : null;
}

function getStyle(html) {
	const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/i;
	const match = html.match(styleRegex);
	return match ? match[1] : null;
}

function getScript(html) {
	const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/i;
	const match = html.match(scriptRegex);
	return match ? match[1] : null;
}

function handleCORS(website) {
	return `${proxyUrl}${website}`;
}

async function fetchWebsite(website) {
	fetch(
		handleCORS(website), {
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
		.then(response => {
			if (!response.ok) {
				console.log(response);
				throw new Error('Network response was not ok');
			}

			return response.text();
		})
		.then(html => {
			const body = getBody(html);
			const style = getStyle(html);
			const script = getScript(html);

			return { body, style, script };
		})
		.then(({ body, style, script }) => {
			document.body.innerHTML = replaceLinks(body, baseUrl(website));
			const styleElement = document.createElement('style');
			styleElement.innerText = style;
			document.head.appendChild(styleElement);
			const scriptElement = document.createElement('script');
			scriptElement.innerText = script;
			document.body.appendChild(scriptElement);
		})
		.catch(error => {
			console.error(error);
		});
}
