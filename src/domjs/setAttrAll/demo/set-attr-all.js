function storySetAttrAll(selectedStory) {
	const buttons = [
		dom.createTag("button", { text: "Button 1" }),
		dom.createTag("button", { text: "Button 2" }),
		dom.createTag("button", { text: "Button 3" }),
	];

	buttons.forEach((btn) => selectedStory.appendChild(btn));

	dom.setAttrAll(buttons, {
		"data-role": "action-button",
		"aria-label": "Action",
	});
}
