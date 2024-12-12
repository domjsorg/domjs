function installStoryboard(context) {
	const router = object.get("router");

	const cevt = new CustomEvent("compiler-ready", {
		bubbles: true,
		cancelable: true,
		detail: {},
	});

	const demodomjs = {};
	demodomjs.html = "&nbsp;";
	demodomjs.components = [];

	const getModules = Promise.all(
		context.map(async ({ name, alias }) => {
			const demoPath = `src/domjs/${name}/demo/${alias}.js`;
			const codePath = `src/domjs/${name}/${name}.js`;
			const demoResponse = await fetch(`/getFile?path=${encodeURIComponent(demoPath)}`);
			const codeResponse = await fetch(`/getFile?path=${encodeURIComponent(codePath)}`);
			const codeContent = await codeResponse.text();
			const demoContent = await demoResponse.text();

			demodomjs.components.push({
				alias,
				file: `${name}.js`,
				component: `${name}`,
				custom: `demo-${alias}`,
				name,
				code: codeContent,
				demo: demoContent,
			});
		})
	);

	getModules.then(() => {
		demodomjs.components.sort((a, b) => {
			if (a.name < b.name) {
				return -1;
			}

			if (a.name > b.name) {
				return 1;
			}

			return 0;
		});

		window.dispatchEvent(cevt);
	});

	window.addEventListener("compiler-ready", () => {
		demodomjs.manager = new (function demoManager() {
			const OUTPUT_PATH = "/";
			const AREAS = ["area-documentation", "area-src-code", "area-code-example", "area-demo"];
			let documentations = {};

			setup();

			function setup() {
				installTabs("storyboard-component");
				installTreeView(demodomjs.components);
				addRoutes(demodomjs.components);
				setupHomeButton();
			}

			function addRoutes(components) {
				let routes = [
					{
						name: OUTPUT_PATH,
						path: "/",
						action: () => {},
					},
					{
						name: "404",
						path: "/404",
						notfound: true,
						action: () => {},
					},
				];

				components.forEach((story) => {
					routes.push({
						name: story.alias,
						path: `${OUTPUT_PATH}${story.alias}`,
						action: () => {
							outputDocumentation(story.name);
							outputCode(story.name);
							outputStorie(story.name);
							outputDemo(story.name);
						},
					});
				});

				router.add(routes);
			}

			function installTabs(id) {
				let tabConfig = {
					parentTag: id,
					tabs: {
						buttons: [
							{
								text: "Documentation",
								area: AREAS[0],
							},
							{
								text: "Source",
								area: AREAS[1],
							},
							{
								text: "Example",
								area: AREAS[2],
							},
							{
								text: "Demo",
								area: AREAS[3],
								fnClick: () => gotoCurrentUrl(),
							},
						],
					},
					fnComplete: () => {
						const docContainer = dom.getTag("documentation-container");
						docContainer.innerHTML = null;
						loadDocumentation(docContainer);
					},
					contents: [
						dom.createTag("documentation-container", { attr: { id: AREAS[0] }, class: "documentation-container" }),
						dom.createTag("source-code-container", { attr: { id: AREAS[1] } }),
						dom.createTag("code-example-container", { attr: { id: AREAS[2] } }),
						dom.createTag("demo-container", { attr: { id: AREAS[3] } }),
					],
				};

				ui.tab(tabConfig);
			}

			function installTreeView(components) {
				const data = components.map(({ name, alias }) => ({
					text: name,
					id: alias,
				}));

				const treeViewConfig = {
					parentTag: "storyboard-treeview",
					tags: {
						itemIn: {
							attr: {
								onmouseover: "this.style.backgroundColor='black'",
								onmouseout: "this.style.backgroundColor='transparent'",
							},
						},
					},
					data: [
						{
							text: "Domjs Methods",
							items: data,
						},
					],
					expanded: true,
					fnSelect: goTo,
				};

				ui.treeView(treeViewConfig);
			}

			function goTo({ itemData }) {
				if (itemData.id) router.push({ path: `/${itemData.id}` });
			}

			function gotoCurrentUrl() {
				const lastSegment = window.location.pathname.split("/").pop();
				router.push({ path: "/" });
				router.push({ path: lastSegment });
			}

			function slugify(text) {
				return text
					.toString()
					.toLowerCase()
					.trim()
					.replace(/[\s]+/g, " ")
					.replace(/[^\w-]+/g, "");
			}

			async function loadDocumentation(destinationTag) {
				const file = await fetch("/getDocumentation").then((resp) => resp.text());
				const descriptionElement = dom.createTag("description-element");
				descriptionElement.innerHTML = addIdsToHeadings(marked.parse(file));
				destinationTag.appendChild(descriptionElement);
			}

			function addIdsToHeadings(htmlContent) {
				const tempDiv = document.createElement("div");
				tempDiv.innerHTML = htmlContent;
				const headings = tempDiv.querySelectorAll("h2");
				documentations = {};

				headings.forEach((heading, index) => {
					const headingId = slugify(heading.textContent);
					heading.setAttribute("id", headingId);

					let sectionContent = `<h2 id="${headingId}">${heading.textContent}</h2>`;
					let nextElement = heading.nextElementSibling;

					while (nextElement && nextElement.tagName !== "H2") {
						sectionContent += nextElement.outerHTML;
						nextElement = nextElement.nextElementSibling;
					}

					documentations[headingId] = sectionContent;
				});

				return tempDiv.innerHTML;
			}

			function outputDocumentation(storyName) {
				const container = dom.getTag("documentation-container");

				if (documentations[storyName.toLowerCase()]) {
					container.innerHTML = documentations[storyName.toLowerCase()];
				}
			}

			function outputCode(id) {
				const container = dom.getTag("source-code-container");
				const component = demodomjs.components.find((item) => id === item.component);
				container.innerText = null;

				const codeElement = dom.createTag("pre", {
					class: "prettyprint",
					text: component.code,
				});

				container.appendChild(codeElement);
			}

			function outputStorie(id) {
				const container = dom.getTag("code-example-container");
				const component = demodomjs.components.find((item) => id === item.component);
				container.innerText = null;

				const codeElement = dom.createTag("pre", {
					class: "prettyprint",
					text: component.demo,
				});

				container.appendChild(codeElement);
			}

			function outputDemo(id) {
				const storyParentTag = dom.getTag("demo-container");
				storyParentTag.innerHTML = null;
				const fnName = `story${id.charAt(0).toUpperCase() + id.slice(1)}`;

				const storyFn = window[fnName];

				if (typeof storyFn === "function") {
					storyFn(storyParentTag);
				}
			}

			function setupHomeButton() {
				const homeButton = dom.getTag("#home-button");
				homeButton.setup({
					id: "homeButton",
					text: "Home",
					fnClick: () => {
						const docContainer = dom.getTag("documentation-container");
						docContainer.innerHTML = null;
						loadDocumentation(docContainer);
						router.push({ path: "/" });
					},
				});
			}
		})();
	});
}
