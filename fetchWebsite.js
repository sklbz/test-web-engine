const testWebsite = "https://example.com";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const browserURL = "https://www.google.com";

function getBody(html) {
	const bodyRegex = /<body[^>]*>([\s\S]*?)<\/body>/i;
	const match = html.match(bodyRegex);
	return match ? match[1] : null;
}

function getHead(html) {
	const headRegex = /<head[^>]*>([\s\S]*?)<\/head>/i;
	const match = html.match(headRegex);
	return match ? match[1] : null;
}

function getStyles(html) {
	const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
	const matches = [...html.matchAll(styleRegex)];
	return matches.map(match => match[1]);
}

function getScripts(html) {
	const scriptRegex = /<script[^>]*src="([^"]+)"[^>]*>|<script[^>]*>([\s\S]*?)<\/script>/gi;
	const matches = [...html.matchAll(scriptRegex)];
	return matches.map(match => ({
		src: match[1] || null,
		inline: match[2] || null,
	}));
}

function handleCORS(website) {
	return `${proxyUrl}${website}`;
}

function baseUrl(website) {
	try {
		const url = new URL(website);
		return url.origin;
	} catch (e) {
		console.error("Invalid URL:", website);
		return "";
	}
}

function replaceLinks(content, base) {
	return content.replace(/(href|src)="([^"]+)"/g, (match, attr, url) => {
		if (url.startsWith("http")) {
			return match;
		}
		return `${attr}="${base}${url.startsWith("/") ? "" : "/"}${url}"`;
	});
}

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
