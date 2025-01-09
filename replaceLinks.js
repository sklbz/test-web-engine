function replaceLinks(html, base) {
	const linkRegex = /\b(href|src)="([^"]+)"/g;

	return html.replace(linkRegex, (_, attr, url) => {
		const value = modifyLink(url, base);

		return `${attr}="${value}"`;
	});
}
