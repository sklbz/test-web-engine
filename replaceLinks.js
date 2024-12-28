function replaceLinks(html, base) {
	const linkRegex = /(\b(?:href|src)="([^"]+)")/g;

	const modified = html.replace(linkRegex, (_, attr, url) => {
		const value = modifyLink(url.toString(), base);

		return `${attr}="${value}"`;
	});
	return modified;
}
