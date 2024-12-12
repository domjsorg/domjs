function storyAddClass(selectedStory) {
	const divTag = dom.createTag("div", {
		text: "Hello World",
		class: "red-background",
	});

	selectedStory.appendChild(divTag);
	dom.addClass(divTag, "green-background");
}
