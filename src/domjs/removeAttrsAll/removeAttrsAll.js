dom.removeAttrsAll = (ele, attrs) => {
	const utils = dom.utils;
	const tags = dom.getTags(ele);
	if (tags && !utils.isString(tags) && attrs && Array.isArray(attrs)) {
		for (let index = 0; index < tags.length; index++) {
			attrs.forEach((attr) => {
				tags[index].removeAttribute(attr);
			});
		}
	}
	return dom;
};
