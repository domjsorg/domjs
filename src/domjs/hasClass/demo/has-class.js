function storyHasClass(selectedStory) {
	const element = dom.createTag("div", {
		text: "green-background",
		class: "green-background",
		prop: {
			style: "margin: 1rem",
		},
	});
	selectedStory.appendChild(element);

	const resultDiv1 = dom.createTag("div", {
		text: `test-class = ${dom.hasClass(element, "test-class")}`,
	});

	selectedStory.appendChild(resultDiv1);

	const resultDiv2 = dom.createTag("div", {
		text: `green-background = ${dom.hasClass(element, "green-background")}`,
	});

	selectedStory.appendChild(resultDiv2);
}
