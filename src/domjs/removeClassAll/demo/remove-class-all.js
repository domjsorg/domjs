function storyRemoveClassAll(selectedStory) {
	const items = [
		dom.createTag("div", { text: "Item 1", class: "item red-background" }),
		dom.createTag("div", { text: "Item 2", class: "item red-background" }),
		dom.createTag("div", { text: "Item 3", class: "item red-background" }),
	];

	items.forEach((item) => selectedStory.appendChild(item));

	dom.removeClassAll(items, "red-background");
}
