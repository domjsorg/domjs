function storyGetTag(selectedStory) {
	const container = dom.createTag("dom-tag-container", { class: "container" });

	["One", "Two", "Three"].forEach((text) => {
		container.appendChild(dom.createTag("p", { text: `Paragraph ${text}`, class: "paragraph" }));
	});

	selectedStory.appendChild(container);

	const tag = dom.getTag("p", container);

	tag.innerHTML = "Paragraph Changed!";
}
