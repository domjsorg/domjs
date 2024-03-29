function installStoryboard() {
  const cevt = new CustomEvent("compiler-ready", {
    bubbles: true,
    cancelable: true,
    detail: {},
  });

  const demodomjs = {};
  demodomjs.html = "&nbsp;";
  demodomjs.components = [];
  const demoFiles = [
    { alias: "add-class", name: "addClass" },
    { alias: "append", name: "append" },
    { alias: "append-self-to-parent", name: "appendSelfToParentTag" },
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

  const getModules = Promise.all(
    demoFiles.map(async ({ name, alias }) => {
      const demoContent = await getScript(`src/domjs/${name}/demo/${alias}.js`);
      const mdContent = await getScript(
        `src/domjs/${name}/demo/description.md`
      );
      demodomjs.components.push({
        alias,
        code: demoContent.code,
        component: `${name}.js`,
        custom: `demo-${alias}`,
        description: mdContent.fullcontent,
        name,
        script: demoContent.fullcontent,
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

    getHtml();
  });

  async function getHtml() {
    const html = await getScript(`src/components/storyboard/storyboard.html`);
    demodomjs.html = html.fullcontent;
    window.dispatchEvent(cevt);
  }

  async function getScript(path) {
    const file = await (await fetch(path)).text();

    const htmlEntities = (html) => {
      return html.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
        return "&#" + i.charCodeAt(0) + ";";
      });
    };

    const object = {
      content: "",
      fullcontent: file,
      code: null,
    };

    if (path.endsWith(".js")) {
      object.content = object.fullcontent.replace(
        /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm,
        "$1"
      );

      const codeList = object.fullcontent.match(/\/\/\:([\s\S]*?)\/\/\!/gm);

      if (null !== codeList) {
        object.code = codeList.map((code) => {
          return {
            comment: htmlEntities(code.match(/(?<=\/\/\:)(.*)/gm)[0].trim()),
            script: code.match(/(?<=\/\/\@)([\s\S]*?)(?=\/\/\!)/gm)[0],
          };
        });
      }
    }

    return object;
  }

  window.addEventListener("compiler-ready", () => {
    demodomjs.manager = new (function demoManager() {
      const OUTPUT_PATH = "/";
      const AREAS = ["area", "area-desc", "area-code"];
      const TYPES = ["script", "description", "code"];

      const ROUTE = {
        name: "DomJSHomeDemo",
        path: OUTPUT_PATH,
        action: () => {
          AREAS.forEach((area) => {
            clearArea(area);
          });
        },
      };

      setup();

      function setup() {
        createHTMLbase();
        showComponentsList(demodomjs.components);
        addRoutes(demodomjs.components);
      }

      function addRoutes(components) {
        let routes = components.map((component) => {
          return {
            name: component.name,
            path: `${OUTPUT_PATH}${component.name.toLowerCase()}`,
            action: () => {
              runComponent(component);
            },
          };
        });

        routes.push(ROUTE);

        router.routes(routes);
      }

      function applyCode(code, custom) {
        if (null !== code) {
          let area = document.getElementsByTagName(custom)[0];

          let printCodes = code.map((code) => {
            return `<h4>${code.comment}</h4><pre>${code.script}</pre>`;
          });

          area.innerHTML = printCodes.join("");
        }
      }

      function applyDescription(desc, custom, name) {
        let area = document.getElementsByTagName(custom)[0];
        area.innerHTML = desc;
      }

      function applyScript(script, custom) {
        eval(script);
      }

      function clearArea(area) {
        let element = document.getElementById(area);
        element.innerHTML = "";
      }

      function createHTMLbase() {
        const html = eval("`" + demodomjs.html + "`");
        let parser = new DOMParser().parseFromString(html, "text/html");
        document
          .querySelector("tools-storyboard")
          .prepend(parser.body.firstChild);

        createTabs("#main");
      }

      function createTabs(id) {
        let tabConfig = {
          parentTag: id,
          tabs: {
            buttons: [
              {
                text: "Que es DomJS?",
                area: AREAS[1],
                fnClick: (context) => {
                  // You can declare individual event handlers for tab clicks
                },
              },
              {
                text: "Como lo uso?",
                area: AREAS[2],
              },
              {
                text: "storyboard",
                area: AREAS[0],
              },
            ],
            fnClick: (buttonContext) => {
              // You can declare a single event handler for all tab clicks
            },
          },
          fnTabReady: (contentTag, tab) => {
            const content = dom.createTag("div", {
              text: `This is content for Tab id: ${tab.id} name: ${tab.text}`,
              attr: { id: tab.area },
            });
            contentTag.appendChild(content);
          },
        };

        ui.tab(tabConfig);
      }

      function hidrateArea(object) {
        let area = document.getElementById(object.area);
        let customTag = document.createElement(object.id);

        clearArea(object.area);

        area.appendChild(customTag);

        switch (object.type) {
          case TYPES[0]:
            applyScript(object.component[object.type], object.id);
            break;

          case TYPES[1]:
            applyDescription(
              object.component[object.type],
              object.id,
              object.component.name
            );
            break;

          case TYPES[2]:
            applyCode(object.component[object.type], object.id);
            break;
        }
      }

      function runComponent(component) {
        const options = [
          { area: AREAS[0], component, id: component.custom, type: TYPES[0] },
          {
            area: AREAS[1],
            component,
            id: `${component.custom}-desc`,
            type: TYPES[1],
          },
          {
            area: AREAS[2],
            component,
            id: `${component.custom}-code`,
            type: TYPES[2],
          },
        ];

        options.forEach((option) => {
          hidrateArea(option);
        });
      }

      function showComponentsList(components) {
        let sidebar = document.getElementById("sidebar");
        let list = document.createElement("ul");

        components.forEach((component) => {
          let item = document.createElement("li");
          item.innerText = component.name;
          item.onclick = () => {
            tools.router.push({
              path: `${OUTPUT_PATH}${component.name.toLowerCase()}`,
            });
          };
          list.appendChild(item);
        });

        sidebar.appendChild(list);
      }
    })();
  });
}
