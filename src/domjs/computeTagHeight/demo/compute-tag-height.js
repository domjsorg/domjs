function storyComputeTagHeight(selectedStory) {
	const box = dom.createTag("div", {
		text: "Test Element",
		prop: {
			style: "padding: 1.5rem; margin: 0.5rem; border: 1px solid black; background-color: green",
		},
	});

	selectedStory.appendChild(box);

	dom.computeTagHeight(box).then((height) => {
		const heightInfo = dom.createTag("div", {
			text: `Total height: ${height}px`,
		});
		selectedStory.appendChild(heightInfo);
	});
}
