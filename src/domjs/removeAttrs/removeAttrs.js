dom.removeAttrs = (tagEle, attrs) => {
	const utils = dom.utils;
	const tag = dom.getTag(tagEle);

	if (tag && !utils.isString(tag) && attrs && Array.isArray(attrs)) {
		attrs.forEach((attr) => {
			tag.removeAttribute(attr);
		});
	}

	return dom;
};
