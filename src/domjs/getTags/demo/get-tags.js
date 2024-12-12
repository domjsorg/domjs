function storyGetTags(selectedStory) {
	const container = dom.createTag("div", { class: "container" });

	["One", "Two", "Three"].forEach((text) => {
		container.appendChild(dom.createTag("p", { text: `Paragraph ${text}`, class: "green-background" }));
	});

	selectedStory.appendChild(container);
	const elements = dom.getTags("p", container);

	for (let i = 0; i < elements.length; i++) {
		elements[i].classList.add("red-background");
	}
}
