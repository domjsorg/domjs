function storyEmpty(selectedStory) {
	const container = dom.createTag("div", {
		text: "This content will be emptied in 0.5 seconds",
		class: "container",
	});

	selectedStory.appendChild(container);
	dom.empty(container);
}
