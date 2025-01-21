dom.createTag = (nameOrConfig, config) => {
	const utils = dom.utils;
	let m_props;

	if (!nameOrConfig || nameOrConfig === "") {
		console.error("createTag() 'required first argument is missing a value. Second argument --> ", config);

		return;
	}

	if (utils.isObject(nameOrConfig)) {
		if (!nameOrConfig.name) {
			console.error("createTag() 'object is missing the key 'name' with string value tag name. Object --> ", nameOrConfig);

			return;
		}

		if (!utils.isString(nameOrConfig.name) || nameOrConfig.name === "") {
			console.error("createTag() 'object key 'name' must be string value tag name. Object --> ", nameOrConfig);

			return;
		}

		m_props = { ...nameOrConfig };
	} else {
		m_props = { ...config };
		m_props.name = nameOrConfig;
	}

	const newEl = utils.createTagNS(m_props.name);

	switch (m_props.name) {
		case "input":
		case "textarea":
		case "select":
		case "option":
		case "output":
			newEl.value = m_props.text ? m_props.text : "";
			break;
		default:
			newEl.innerText = m_props.text ? m_props.text : "";
			break;
	}

	dom.setProps(newEl, m_props.prop);
	dom.setAttr(newEl, m_props.attr);
	utils.setEvent(newEl, m_props.event);

	if (m_props.class && m_props.class !== "") {
		newEl.className = m_props.class;
	}

	return newEl;
};
