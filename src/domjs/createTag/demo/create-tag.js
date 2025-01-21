function storyCreateTag(selectedStory) {
	const tagConfig = {
		class: "green-background",
		attr: {
			src: "img/dom/dom-isotype.jpg",
			width: "160px",
		},
	};

	let imgTag = dom.createTag("img", tagConfig);
	selectedStory.appendChild(imgTag);
}
