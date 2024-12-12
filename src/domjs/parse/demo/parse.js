function storyParse(selectedStory) {
	const htmlString = `
        <div class="parsed-content">
            <h3>Parsed Content</h3>
            <p>This is a paragraph inside the parsed content</p>
        </div>
    `;

	const parsedContent = dom.parse(htmlString);
	selectedStory.appendChild(parsedContent);
}
