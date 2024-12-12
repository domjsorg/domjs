function storyAppend(selectedStory) {
	const content1 = "<p>This is the paragraph added at the beginning</p>";
	dom.append(selectedStory, content1);
	const content2 = "<p>This is the paragraph added later</p>";
	dom.append(selectedStory, content2);
}
