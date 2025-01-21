function storySetPropsAll(selectedStory) {
	const div1 = dom.createTag("div");
	const div2 = dom.createTag("div");

	const elements = [div1, div2];

	dom.setPropsAll(elements, {
		innerHTML: "Content with HTML",
		style: "color: white;",
	});

	elements.forEach((div) => selectedStory.appendChild(div));
}
