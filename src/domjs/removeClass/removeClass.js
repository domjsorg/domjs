dom.removeClass = (tag, cls) => {
	let ele = dom.getTag(tag);
	ele.classList.remove(cls);

	return dom;
};
