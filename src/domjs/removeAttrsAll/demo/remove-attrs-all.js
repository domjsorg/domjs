function storyRemoveAttrsAll(selectedStory) {
	const elements = [1, 2, 3].map((num) => {
		return dom.createTag("input", {
			attr: {
				type: "text",
				placeholder: `Input ${num} disabled`,
				"data-test": "remove-me",
				disabled: "true",
				style: "background-color: black; padding: 1rem; font-size: 1.25rem; color: white",
			},
		});
	});

	elements.forEach((el) => selectedStory.appendChild(el));

	dom.removeAttrsAll(elements, ["data-test", "disabled"]);
	dom.setAttrAll(elements, { placeholder: "Enter Data" });
}
