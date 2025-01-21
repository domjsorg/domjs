function storyRemoveAll(selectedStory) {
	const container = dom.createTag("div", {
		class: "remove-all-demo",
		prop: {
			style: "padding: 1.5rem; border: 1px solid #ccc; color: black;",
		},
	});

	const elementsToRemove = [
		dom.createTag("div", {
			text: "Element to remove 1",
			class: "remove-me",
			prop: {
				style: "margin: 0.5rem; padding: 1rem; background-color: #f0f0f0; color: black;",
			},
		}),
		dom.createTag("div", {
			text: "Element to remove 2",
			class: "remove-me",
			prop: {
				style: "margin: 0.5rem; padding: 1rem; background-color: #f0f0f0; color: black;",
			},
		}),
		dom.createTag("div", {
			text: "Element to remove 3",
			class: "remove-me",
			prop: {
				style: "margin: 0.5rem; padding: 1rem; background-color: #f0f0f0; color: black;",
			},
		}),
	];

	elementsToRemove.forEach((element) => {
		container.appendChild(element);
	});

	const removeButton = dom.createTag("button", {
		text: "Remove all elements",
		prop: {
			style: "margin: 1rem; padding: 0.5rem 1rem; color: black;",
			onclick: () => {
				const elementsToDelete = container.querySelectorAll(".remove-me");
				dom.removeAll(elementsToDelete);
			},
		},
	});

	container.appendChild(removeButton);
	selectedStory.appendChild(container);
}
