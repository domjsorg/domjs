dom.createTag = (name, config) => {
	if (!name || name === "") {
		console.error(`createTag() "name" argument is missing --> config: `, config);
		return;
	}

	const utils = dom.utils;
	const newEl = utils.createTagNS(name);

	if (!config || !utils.isObject(config)) {
		return newEl;
	}

	switch (name) {
		case "input":
		case "textarea":
		case "select":
		case "option":
		case "output":
			newEl.value = config.text ? config.text : "";
			break;
		default:
			newEl.innerText = config.text ? config.text : "";
			break;
	}

	dom.setProps(newEl, config.prop);
	dom.setAttr(newEl, config.attr);
	utils.setEvent(newEl, config.event);

	if (config.class && config.class !== "") {
		newEl.className = config.class;
	}

	return newEl;
};
