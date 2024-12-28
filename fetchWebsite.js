const testWebsite = "https://example.com";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const browserURL = "https://www.google.com";

function handleCORS(website) {
	return `${proxyUrl}${website}`;
}

function fetchWebsite(website) {

	fetch(handleCORS(website), {
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	})
		.then(response => {
			if (!response.ok) {
				throw new Error(response.status);
			}

			return response.text();
		})
		.then(response => {
			const base = baseUrl(website);
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
