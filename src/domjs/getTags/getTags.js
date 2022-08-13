dom.getTags = (selector, parent) => {
	const utils = dom.utils;

	if (typeof selector !== "string") {
		return selector;
	}

	if (utils.hasSingleID(selector)) {
		return "For a single #id selector use getTag() method instead (expects a single tag return, not a list).";
	}

	let element = parent ? parent : document;

	if (utils.hasSingleClass(selector)) {
		return element.getElementsByClassName(selector.replace(".", ""));
	}

	if (utils.hasSingleTagName(selector)) {
		return element.getElementsByTagName(selector);
	}

	console.log(
		"DOM.getTags(): you have used document.querySelectorAll('') that returns DOM tags that are not 'LIVE' therefore won't automatically stay in sync with the browser therefore, it's not recommended. Try a direct String selector."
	);
	return element.querySelectorAll(selector);
};
