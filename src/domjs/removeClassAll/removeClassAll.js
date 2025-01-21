dom.removeClassAll = (tags, cls) => {
	const utils = dom.utils;

	if (utils.isArray(tags)) {
		for (let index = 0; index < tags.length; index++) {
			dom.removeClass(tags[index], cls);
		}
	} else if (utils.isObject(tags)) {
		for (const key in tags) {
			dom.removeClass(tags[key], cls);
		}
	}
};
