function storyContent(selectedStory) {
	const container = dom.createTag("div", {
		class: "content-container",
		prop: {
			style: "border: 1px solid #ccc; padding: 0.5rem; margin: 0.5rem;",
		},
	});

	selectedStory.appendChild(container);
	dom.content(container, "<p>This is new content</p>");
	dom.content(container, "<p>This is updated content</p>", true);
}
