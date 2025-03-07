const testWebsite = "https://example.com";
//const proxyUrl = "https://cors-anywhere.herokuapp.com/";
//const proxyUrl = "https://localhost:8080/proxy?target=";
const browserURL = "https://www.google.com";

function handleProxy(website) {
	const proxyUrl = localStorage.getItem("proxyUrl");
	return `${proxyUrl}${website}`;
}

function headers() {
	return {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
	};
}

function fetchWebsite(website) {

	const base = baseUrl(website);

	fetch(handleProxy(website), {
		headers: headers(),
	})
		.then(response => {
			if (!response.ok) {
				throw new Error(response.status);
			}

			return response.text();
		})
		.then(response => {
			const html = replaceLinks(response, base);
			return html;
		})
		.then(html => {
			const head = getHead(html);
			const body = getBody(html);
			const styles = getStyles(html);
			const scripts = getScripts(html);

			return { head, body, styles, scripts };
		})
		.then(({ head, body, styles, scripts }) => {
			document.body.innerHTML = body;
			document.head.innerHTML = head;

			return { styles, scripts };
		})
		.then(({ styles, scripts }) => {

			styles.forEach(styleContent => {
				const styleElement = document.createElement("style");
				styleElement.innerText = styleContent;
				document.head.appendChild(styleElement);
			});

			return scripts;
		})
		.then(scripts => {

			scripts.forEach(({ src, inline }) => {
				const scriptElement = document.createElement("script");
				if (src) {
					scriptElement.src = src;
					scriptElement.async = true;
				} else if (inline) {
					scriptElement.textContent = inline;
				}
				document.body.appendChild(scriptElement);
			});

		})
		.catch(error => {
			console.log(error);
		})
}
