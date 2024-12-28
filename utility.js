function baseUrl(link) {
	const url = new URL(link);
	return url.origin;
}

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

function modifyLink(link, base) {
	console.log(typeof link)
	if (link.starstsWith("http")) {
		return link;
	}
	if (link.startsWith("/")) {
		return `${base}${link}`;
	}
	return `${base}/${link}`;
}

