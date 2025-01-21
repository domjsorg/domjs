function storyToggleClass(selectedStory) {
	const button = dom.createTag("button", {
		text: "Toggle Class",
		class: "btn",
	});

	selectedStory.appendChild(button);
	dom.toggleClass(button, "active");
}
