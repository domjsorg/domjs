dom.append = (selector, content, prepend) => {
	const utils = dom.utils;

	if (!content || !selector) {
		console.error("DOM.addChild(): missing parameter --> ", selector, content);

		return;
	}

	// Parse content if String type
	if (typeof content === "string") {
		content = dom.parse(content);
	}

	if (utils.hasSingleID(selector)) {
		selector = selector.replace("#", "");
		utils.append(document.getElementById(selector), content, prepend);

		return dom;
	}

	if (utils.hasSingleClass(selector)) {
		const tags = document.getElementsByClassName(selector);

		if (tags && tags.length > 0) {
			utils.appendChildAll(tags, content, prepend);
		}

		return dom;
	}

	if (utils.isString(selector)) {
		const tags = document.querySelectorAll(selector);

		if (tags && tags.length > 0) {
			utils.appendChildAll(tags, content, prepend);
		}

		return dom;
	}

	if (utils.isElement(selector) || utils.isNode(selector)) {
		utils.append(selector, content, prepend);

		return dom;
	}

	if (utils.isNodeList(selector) || utils.isHTMLCollection(selector) || utils.isArray(selector)) {
		utils.appendChildAll(selector, content, prepend);

		return dom;
	}
};
