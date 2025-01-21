function storySupplantHTML(selectedStory) {
	const template = "<div>Hello {name}, you are {age} years old</div>";

	const data = {
		name: "John",
		age: 25,
	};

	const result = dom.supplantHTML(template, data);
	selectedStory.innerHTML = result;
}
