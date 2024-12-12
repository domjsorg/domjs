function storyCreateSVGTag(selectedStory) {
	const svgConfig = {
		attr: {
			width: "100",
			height: "100",
			viewBox: "0 0 100 100",
			style: "border: 1px solid black;",
		},
	};

	const svgTag = dom.createSVGTag("svg", svgConfig);

	const rect = dom.createSVGTag("rect", {
		attr: {
			x: "10",
			y: "10",
			width: "80",
			height: "80",
			fill: "blue",
		},
	});

	svgTag.appendChild(rect);
	selectedStory.appendChild(svgTag);
}
