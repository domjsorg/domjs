dom.supplantHTML = (html, data) => {
	return html.replace(/{([^{}]*)}/g, function (a, b) {
		let r = dom.utils.getProperty(b, data);

		return typeof r === "string" || typeof r === "number" ? r : a;
	});
};
