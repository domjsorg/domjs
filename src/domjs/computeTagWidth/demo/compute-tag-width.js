function storyComputeTagWidth(selectedStory) {
	const box = dom.createTag("div", {
		text: "Test Element",
		prop: {
			style: "padding: 1.5rem; margin: 0.5rem; border: 1px solid black; background-color: green",
		},
	});

	selectedStory.appendChild(box);

	dom.computeTagWidth(box).then((width) => {
		const widthInfo = dom.createTag("div", {
			text: `Total width: ${width}px`,
		});
		selectedStory.appendChild(widthInfo);
	});
}
