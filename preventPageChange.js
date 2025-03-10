(function() {
	function handleLinkClick(event) {
		event.preventDefault();

		const targetUrl = event.target.href;
		fetchWebsite(targetUrl);
	}

	function interceptLinks() {
		const links = document.querySelectorAll('a[href]');
		links.forEach(link => {
			link.removeEventListener('click', handleLinkClick);
			link.addEventListener('click', handleLinkClick);
		});
	}

	const observer = new MutationObserver(interceptLinks);
	observer.observe(document.body, { childList: true, subtree: true });

	interceptLinks();
})();

