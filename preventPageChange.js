(function() {
	function handleLinkClick(event) {
		event.preventDefault();

		const targetUrl = event.target.href;
		fetchWebsite(`${proxyUrl}${targetUrl}`);
	}

	function interceptLinks() {
		const links = document.querySelectorAll('a[href]');
		links.forEach(link => {
			link.addEventListener('click', handleLinkClick);
		});
	}

	const observer = new MutationObserver(interceptLinks);
	observer.observe(document.body, { childList: true, subtree: true });

	interceptLinks();
})();

