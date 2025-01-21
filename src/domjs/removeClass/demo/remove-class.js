function storyRemoveClass(selectedStory) {
	const div = dom.createTag("div", {
		text: "Element with classes",
		class: "red-background",
	});

	selectedStory.appendChild(div);

	dom.removeClass(div, "red-background");
	div.innerText = "Element without classes";
}
