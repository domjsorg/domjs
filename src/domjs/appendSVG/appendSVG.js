dom.appendSVG = (selector, content, prepend) => {
	if (!content || !selector) {
		console.error("DOM.addSVGChild(): missing parameter 'selector', 'content' or both.");
		return;
	}

	// Parse content if String type
	if (typeof content === "string") {
		// Create a dummy receptacle
		let receptacle = document.createElement("div");
		// Wrap the svg string to a svg object (string)
		let svgfragment = "<svg>" + content + "</svg>";
		// Add all svg to the receptacle
		receptacle.innerHTML = "" + svgfragment;

		// Splice the childs of the SVG inside the receptacle to the SVG at the body
		Array.prototype.slice.call(receptacle.childNodes[0].childNodes).forEach(function (el) {
			dom.append(selector, el, prepend);
		});
	} else {
		dom.append(selector, content, prepend);
	}
};
