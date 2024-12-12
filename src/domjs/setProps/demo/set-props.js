function storySetProps(selectedStory) {
	const div = dom.createTag("div");

	dom.setProps(div, {
		innerHTML: "Content with HTML",
		style: "color: white;",
	});

	selectedStory.appendChild(div);
}
