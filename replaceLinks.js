function replaceLinks(html, url) {
	function modifyLink(link) {
		if (link.startsWith("/")) {
			return `${url}${link}`;
		}
		return link;
	}

	console.log(url);

	const linkRegex = /(\b(?:href|src)="([^"]+)")/g;

	return html.replace(linkRegex, (_, fullAttribute, attributeValue) => {
		const newValue = modifyLink(attributeValue);
		const replacement = fullAttribute.replace(attributeValue, newValue);
		return replacement;
	});
}
