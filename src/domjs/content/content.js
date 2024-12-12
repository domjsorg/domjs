dom.content = (selector, content, prepend) => {
	const self = dom;
	const utils = self.utils;

	if (!content || !selector) {
		console.error("DOM.addChild(): missing parameter 'selector', 'content' or both.");

		return;
	}

	selector = dom.getTag(selector);

	// Parse content if String type
	if (typeof content === "string") {
		content = self.parse(content);
	}

	if (utils.hasSingleID(selector)) {
		selector = selector.replace("#", "");
		utils.append(document.getElementById(selector), content, prepend);

		return self;
	}

	if (utils.hasSingleClass(selector)) {
		const tags = document.getElementsByClassName(selector);

		if (tags && tags.length > 0) {
			utils.appendChildAll(tags, content, prepend);
		}

		return self;
	}

	if (utils.isString(selector)) {
		const tags = document.querySelectorAll(selector);

		if (tags && tags.length > 0) {
			utils.appendChildAll(tags, content, prepend);
		}

		return self;
	}

	if (utils.isElement(selector) || utils.isNode(selector)) {
		utils.append(selector, content, prepend);

		return self;
	}

	if (utils.isNodeList(selector) || utils.isHTMLCollection(selector) || utils.isArray(selector)) {
		utils.appendChildAll(selector, content, prepend);

		return self;
	}
};
