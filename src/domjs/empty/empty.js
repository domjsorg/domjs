dom.empty = (selector) => {
	const tag = dom.getTag(selector);
	tag.innerHTML = "";
	return self;
};
