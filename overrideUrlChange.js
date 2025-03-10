// Save original methods
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

// Override pushState
history.pushState = function(_, _, url) {
	// Optionally handle internally or block
	console.log('Blocked pushState:', url);
	// To allow controlled navigation, update your UI here without changing the URL
};

// Override replaceState
history.replaceState = function(_, _, url) {
	console.log('Blocked replaceState:', url);
};

document.addEventListener('submit', function(e) {
	e.preventDefault();
	const form = e.target;
	const url = form.action
		.replace('http', 'https')
		.replace('httpss', 'https');

	const method = form.method;
	const formData = new FormData(form);

	doCORSRequest({ url: url, method: method, data: formData }, updateUI)
}, true);
