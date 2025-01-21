function storySetAttr(selectedStory) {
	const div = dom.createTag("input", {
		attr: { style: "background: #AAA; color: white; padding: 0.5rem" },
	});

	div.value = "Hello World";

	selectedStory.appendChild(div);

	dom.setAttr(div, { disabled: true });
	div.innerText = "Element disabled";
}
