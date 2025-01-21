function storyAppendSVG(selectedStory) {
	const svgContent1 =
		"<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>" +
		"<circle cx='50' cy='50' r='40' stroke='black' fill='red'/>" +
		"</svg>";

	dom.appendSVG(selectedStory, svgContent1);

	const svgContent2 =
		"<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>" +
		"<rect x='20' y='20' width='60' height='60' stroke='blue' fill='green'/>" +
		"</svg>";

	dom.appendSVG(selectedStory, svgContent2);
}
