function storyPrepend(selectedStory) {
	const container = dom.createTag("div", {
		prop: {
			style: "border: 1px solid #ddd; padding: 0.75rem;",
		},
	});

	selectedStory.appendChild(container);

	dom.append(container, "<p>Original content</p>");

	dom.prepend(container, "<p>Prepended content</p>");
}
