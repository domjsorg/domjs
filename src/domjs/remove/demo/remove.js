function storyRemove(selectedStory) {
	const tempDiv = dom.createTag("div", {
		text: "This div will be removed",
		class: "temp-element",
	});

	selectedStory.appendChild(tempDiv);

	const removeButton = dom.createTag("button", {
		text: "Remove element",
		prop: {
			style: "margin: 10px; padding: 5px 10px; color: black;",
			onclick: () => {
				dom.remove(tempDiv);
			},
		},
	});

	selectedStory.appendChild(removeButton);
}
