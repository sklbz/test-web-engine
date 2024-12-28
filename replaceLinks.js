const prefix = "https://google.com";

function btn(onclick, content) {
	return `<button onclick="${onclick}">${content}</button>`;
}

function navBtn(link, content) {
	return btn(`fetchWebsite('${link}')`, content)
}

function replaceLinks(html) {
	function modifyLink(link) {
		if (link.startsWith("/")) {
			return `${prefix}${link}`;
		}
		return link;
	}

	const linkRegex = /<a href="([^"]+)">([^<]*)<\/a>/g;

	const result = html.replace(linkRegex, (_, href, text) => {
		console.log(href);
		const modifiedLink = modifyLink(href);
		console.log(modifiedLink);
		return navBtn(modifiedLink, text);
	});

	return result;
}
