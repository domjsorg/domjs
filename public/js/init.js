// Main Object where Dom is Built
const dom = {};

const domJsMethods = [
	{ alias: "add-class", name: "addClass" },
	{ alias: "append", name: "append" },
	{ alias: "append-svg", name: "appendSVG" },
	{ alias: "compute-tag-height", name: "computeTagHeight" },
	{ alias: "compute-tag-width", name: "computeTagWidth" },
	{ alias: "create-svg-tag", name: "createSVGTag" },
	{ alias: "create-tag", name: "createTag" },
	{ alias: "empty", name: "empty" },
	{ alias: "get-tag", name: "getTag" },
	{ alias: "get-tags", name: "getTags" },
	{ alias: "has-class", name: "hasClass" },
	{ alias: "parse", name: "parse" },
	{ alias: "prepend", name: "prepend" },
	{ alias: "remove", name: "remove" },
	{ alias: "remove-all", name: "removeAll" },
	{ alias: "remove-attrs", name: "removeAttrs" },
	{ alias: "remove-attrs-all", name: "removeAttrsAll" },
	{ alias: "remove-class", name: "removeClass" },
	{ alias: "remove-class-all", name: "removeClassAll" },
	{ alias: "set-attr", name: "setAttr" },
	{ alias: "set-attr-all", name: "setAttrAll" },
	{ alias: "set-props", name: "setProps" },
	{ alias: "set-props-all", name: "setPropsAll" },
	{ alias: "supplant-html", name: "supplantHTML" },
	{ alias: "toggle-class", name: "toggleClass" },
	{ alias: "utils", name: "utils" },
];

async function loadScripts() {
	await Promise.all(
		domJsMethods.map(async (data) => {
			const scriptResponse = await fetch(`/getScript?name=${data.name}`);
			const scriptContent = await scriptResponse.text();
			eval(scriptContent);
		})
	);
}

loadScripts().then(() => {
	console.log("DOMJS scripts loaded");
});
