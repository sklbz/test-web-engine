const testWebsite = "https://example.com";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const browserURL = "https://www.google.com";

function handleCORS(website) {
	return `${proxyUrl}${website}`;
}

/*function replaceLinks(content, base) {
	return content.replace(/(href|src)="([^"]+)"/g, (match, attr, url) => {
		if (url.startsWith("http")) {
			return match;
		}
		return `${attr}="${base}${url.startsWith("/") ? "" : "/"}${url}"`;
	});
}*/

function fetchWebsite(website) {

	fetch(handleCORS(website), {
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	})
		.then(response => {
			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.status}`);
			}


			const html = response.text();
			const fmtHtml = replaceLinks(html, baseUrl(website));
			return fmtHtml;
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

			scripts.forEach(({ src, inline }) => {
				const scriptElement = document.createElement("script");
				if (src) {
					scriptElement.src = src;
					scriptElement.async = true; // Fetch and execute asynchronously
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
