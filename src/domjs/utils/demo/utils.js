function storyUtils(selectedStory) {
	const container = dom.createTag("div", {
		class: "utils-demo-container",
		prop: {
			style: "padding: 20px; border: 2px solid #ccc;",
		},
	});

	const svgContainer = dom.utils.createTagNS("svg", "SVG");
	svgContainer.setAttribute("width", "100");
	svgContainer.setAttribute("height", "100");
	const circle = dom.utils.createTagNS("circle", "SVG");
	circle.setAttribute("cx", "50");
	circle.setAttribute("cy", "50");
	circle.setAttribute("r", "40");
	circle.setAttribute("fill", "blue");
	svgContainer.appendChild(circle);

	const elementsContainer = dom.createTag("div", {
		class: "elements-container",
		prop: {
			style: "margin: 10px 0; padding: 10px; border: 1px solid #eee;",
		},
	});

	const elements = [
		dom.createTag("div", { text: "Element 1" }),
		dom.createTag("div", { text: "Element 2" }),
		dom.createTag("div", { text: "Element 3" }),
	];

	dom.utils.appendChildAll([elementsContainer], elements[0].cloneNode(true));

	const data = {
		user: {
			name: "John",
			details: {
				age: 25,
				city: "Madrid",
			},
		},
	};

	const propertyDemo = dom.createTag("div", {
		class: "property-demo",
		prop: {
			innerHTML: `
                Name: ${dom.utils.getProperty("user.name", data)}<br>
                Age: ${dom.utils.getProperty("user.details.age", data)}<br>
                City: ${dom.utils.getProperty("user.details.city", data)}
            `,
		},
	});

	const typeChecks = dom.createTag("div", {
		class: "type-checks",
		prop: {
			innerHTML: `
                isString("test"): ${dom.utils.isString("test")}<br>
                isArray([1,2,3]): ${dom.utils.isArray([1, 2, 3])}<br>
                isObject({}): ${dom.utils.isObject({})}<br>
            `,
		},
	});

	const selectorChecks = dom.createTag("div", {
		class: "selector-checks",
		prop: {
			innerHTML: `
                hasSingleClass(".class"): ${dom.utils.hasSingleClass(".class")}<br>
                hasSingleID("#id"): ${dom.utils.hasSingleID("#id")}<br>
                hasSingleTagName("div"): ${dom.utils.hasSingleTagName("div")}
            `,
		},
	});

	const styledElement = dom.createTag("div", {
		text: "Styled Element",
		prop: {
			style: "padding: 20px; margin: 10px;",
		},
	});

	const style = window.getComputedStyle(styledElement);
	const paddingValue = dom.utils.getStyleNumValue(style.getPropertyValue("padding-top"));

	const styleInfo = dom.createTag("div", {
		text: `Numeric value of padding: ${paddingValue}px`,
	});

	[svgContainer, elementsContainer, propertyDemo, typeChecks, selectorChecks, styledElement, styleInfo].forEach((element) => {
		dom.utils.append(container, element);
	});

	selectedStory.appendChild(container);
}
