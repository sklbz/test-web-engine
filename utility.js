function baseUrl(link) {
	const url = new URL(link);
	return url.origin;
}
