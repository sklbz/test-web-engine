function replaceLinks(html, base) {
	const linkRegex = /\b(href|src)="([^"]+)"/g;

	const modifiedHtml = html.replace(linkRegex, (_, attr, url) => {
		const value = modifyLink(url, base);

		return `${attr}="${value}"`;
	});

	return modifiedHtml;
}

function replaceScriptLinks(script) {
	const linkRegex = /(https?:\/\/[^"]+)/g;

	return script.replace(linkRegex, (_, url) => {
		return editLink(url);
	});
}
