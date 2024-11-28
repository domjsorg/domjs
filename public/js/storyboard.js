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
			const docPath = `src/domjs/${name}/demo/description.md`;
			const codePath = `src/domjs/${name}/${name}.js`;
			const demoResponse = await fetch(`/getFile?path=${encodeURIComponent(demoPath)}`);
			const docResponse = await fetch(`/getFile?path=${encodeURIComponent(docPath)}`);
			const codeResponse = await fetch(`/getFile?path=${encodeURIComponent(codePath)}`);
			const codeContent = await codeResponse.text();
			const demoContent = await demoResponse.text();
			const docContent = await docResponse.text();

			demodomjs.components.push({
				alias,
				file: `${name}.js`,
				component: `${name}`,
				custom: `demo-${alias}`,
				name,
				code: codeContent,
				demo: demoContent,
				documentation: docContent,
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
			const AREAS = ["area-documentation", "area-code"];
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
								text: "Code",
								area: AREAS[2],
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
						dom.createTag("code-container", { attr: { id: AREAS[1] } }),
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
				router.push({ path: `/${itemData.id}` });
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
				const container = dom.getTag("#area-code");
				const component = demodomjs.components.find((item) => id === item.component);
				container.innerText = null;

				const codeElement = dom.createTag("pre", {
					class: "prettyprint",
					text: component.code,
				});

				container.appendChild(codeElement);
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
