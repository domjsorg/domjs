function storyRemoveAttrs(selectedStory) {
	const input = dom.createTag("input", {
		attr: {
			type: "text",
			placeholder: "input disabled",
			disabled: "true",
			style: "background-color: black; padding: 1rem; font-size: 1.25rem; color: white",
		},
	});
	selectedStory.appendChild(input);

	const removeButton = dom.createTag("button", {
		text: "Remove Attrs",
		prop: {
			style: "margin: 10px; padding: 5px 10px; color: black;",
			onclick: () => {
				dom.removeAttrs(input, ["disabled", "placeholder"]);
				input.value = "Hello World!";
			},
		},
	});

	selectedStory.appendChild(removeButton);
}
