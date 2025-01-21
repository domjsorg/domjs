function storyAddClass(selectedStory) {
  const divTag = dom.createTag("div", {
    text: "Hello World",
    class: "red-background"
  });
  selectedStory.appendChild(divTag);
  dom.addClass(divTag, "green-background");
}
function storyAppend(selectedStory) {
  const content1 = "<p>This is the paragraph added at the beginning</p>";
  dom.append(selectedStory, content1);
  const content2 = "<p>This is the paragraph added later</p>";
  dom.append(selectedStory, content2);
}
function storyAppendSVG(selectedStory) {
  const svgContent1 = "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><circle cx='50' cy='50' r='40' stroke='black' fill='red'/></svg>";
  dom.appendSVG(selectedStory, svgContent1);
  const svgContent2 = "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect x='20' y='20' width='60' height='60' stroke='blue' fill='green'/></svg>";
  dom.appendSVG(selectedStory, svgContent2);
}
function storyComputeTagHeight(selectedStory) {
  const box = dom.createTag("div", {
    text: "Test Element",
    prop: {
      style: "padding: 1.5rem; margin: 0.5rem; border: 1px solid black; background-color: green"
    }
  });
  selectedStory.appendChild(box);
  dom.computeTagHeight(box).then((height) => {
    const heightInfo = dom.createTag("div", {
      text: `Total height: ${height}px`
    });
    selectedStory.appendChild(heightInfo);
  });
}
function storyComputeTagWidth(selectedStory) {
  const box = dom.createTag("div", {
    text: "Test Element",
    prop: {
      style: "padding: 1.5rem; margin: 0.5rem; border: 1px solid black; background-color: green"
    }
  });
  selectedStory.appendChild(box);
  dom.computeTagWidth(box).then((width) => {
    const widthInfo = dom.createTag("div", {
      text: `Total width: ${width}px`
    });
    selectedStory.appendChild(widthInfo);
  });
}
function storyContent(selectedStory) {
  const container = dom.createTag("div", {
    class: "content-container",
    prop: {
      style: "border: 1px solid #ccc; padding: 0.5rem; margin: 0.5rem;"
    }
  });
  selectedStory.appendChild(container);
  dom.content(container, "<p>This is new content</p>");
  dom.content(container, "<p>This is updated content</p>", true);
}
function storyCreateSVGTag(selectedStory) {
  const svgConfig = {
    attr: {
      width: "100",
      height: "100",
      viewBox: "0 0 100 100",
      style: "border: 1px solid black;"
    }
  };
  const svgTag = dom.createSVGTag("svg", svgConfig);
  const rect = dom.createSVGTag("rect", {
    attr: {
      x: "10",
      y: "10",
      width: "80",
      height: "80",
      fill: "blue"
    }
  });
  svgTag.appendChild(rect);
  selectedStory.appendChild(svgTag);
}
function storyCreateTag(selectedStory) {
  const tagConfig = {
    class: "green-background",
    attr: {
      src: "img/dom/dom-isotype.jpg",
      width: "160px"
    }
  };
  let imgTag = dom.createTag("img", tagConfig);
  selectedStory.appendChild(imgTag);
}
function storyEmpty(selectedStory) {
  const container = dom.createTag("div", {
    text: "This content will be emptied in 0.5 seconds",
    class: "container"
  });
  selectedStory.appendChild(container);
  dom.empty(container);
}
function storyGetTag(selectedStory) {
  const container = dom.createTag("dom-tag-container", { class: "container" });
  ["One", "Two", "Three"].forEach((text) => {
    container.appendChild(dom.createTag("p", { text: `Paragraph ${text}`, class: "paragraph" }));
  });
  selectedStory.appendChild(container);
  const tag = dom.getTag("p", container);
  tag.innerHTML = "Paragraph Changed!";
}
function storyGetTags(selectedStory) {
  const container = dom.createTag("div", { class: "container" });
  ["One", "Two", "Three"].forEach((text) => {
    container.appendChild(dom.createTag("p", { text: `Paragraph ${text}`, class: "green-background" }));
  });
  selectedStory.appendChild(container);
  const elements = dom.getTags("p", container);
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add("red-background");
  }
}
function storyHasClass(selectedStory) {
  const element = dom.createTag("div", {
    text: "green-background",
    class: "green-background",
    prop: {
      style: "margin: 1rem"
    }
  });
  selectedStory.appendChild(element);
  const resultDiv1 = dom.createTag("div", {
    text: `test-class = ${dom.hasClass(element, "test-class")}`
  });
  selectedStory.appendChild(resultDiv1);
  const resultDiv2 = dom.createTag("div", {
    text: `green-background = ${dom.hasClass(element, "green-background")}`
  });
  selectedStory.appendChild(resultDiv2);
}
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
function storyPrepend(selectedStory) {
  const container = dom.createTag("div", {
    prop: {
      style: "border: 1px solid #ddd; padding: 0.75rem;"
    }
  });
  selectedStory.appendChild(container);
  dom.append(container, "<p>Original content</p>");
  dom.prepend(container, "<p>Prepended content</p>");
}
function storyRemove(selectedStory) {
  const tempDiv = dom.createTag("div", {
    text: "This div will be removed",
    class: "temp-element"
  });
  selectedStory.appendChild(tempDiv);
  const removeButton = dom.createTag("button", {
    text: "Remove element",
    prop: {
      style: "margin: 10px; padding: 5px 10px; color: black;",
      onclick: () => {
        dom.remove(tempDiv);
      }
    }
  });
  selectedStory.appendChild(removeButton);
}
function storyRemoveAll(selectedStory) {
  const container = dom.createTag("div", {
    class: "remove-all-demo",
    prop: {
      style: "padding: 1.5rem; border: 1px solid #ccc; color: black;"
    }
  });
  const elementsToRemove = [
    dom.createTag("div", {
      text: "Element to remove 1",
      class: "remove-me",
      prop: {
        style: "margin: 0.5rem; padding: 1rem; background-color: #f0f0f0; color: black;"
      }
    }),
    dom.createTag("div", {
      text: "Element to remove 2",
      class: "remove-me",
      prop: {
        style: "margin: 0.5rem; padding: 1rem; background-color: #f0f0f0; color: black;"
      }
    }),
    dom.createTag("div", {
      text: "Element to remove 3",
      class: "remove-me",
      prop: {
        style: "margin: 0.5rem; padding: 1rem; background-color: #f0f0f0; color: black;"
      }
    })
  ];
  elementsToRemove.forEach((element) => {
    container.appendChild(element);
  });
  const removeButton = dom.createTag("button", {
    text: "Remove all elements",
    prop: {
      style: "margin: 1rem; padding: 0.5rem 1rem; color: black;",
      onclick: () => {
        const elementsToDelete = container.querySelectorAll(".remove-me");
        dom.removeAll(elementsToDelete);
      }
    }
  });
  container.appendChild(removeButton);
  selectedStory.appendChild(container);
}
function storyRemoveAttrs(selectedStory) {
  const input = dom.createTag("input", {
    attr: {
      type: "text",
      placeholder: "input disabled",
      disabled: "true",
      style: "background-color: black; padding: 1rem; font-size: 1.25rem; color: white"
    }
  });
  selectedStory.appendChild(input);
  const removeButton = dom.createTag("button", {
    text: "Remove Attrs",
    prop: {
      style: "margin: 10px; padding: 5px 10px; color: black;",
      onclick: () => {
        dom.removeAttrs(input, ["disabled", "placeholder"]);
        input.value = "Hello World!";
      }
    }
  });
  selectedStory.appendChild(removeButton);
}
function storyRemoveAttrsAll(selectedStory) {
  const elements = [1, 2, 3].map((num) => {
    return dom.createTag("input", {
      attr: {
        type: "text",
        placeholder: `Input ${num} disabled`,
        "data-test": "remove-me",
        disabled: "true",
        style: "background-color: black; padding: 1rem; font-size: 1.25rem; color: white"
      }
    });
  });
  elements.forEach((el) => selectedStory.appendChild(el));
  dom.removeAttrsAll(elements, ["data-test", "disabled"]);
  dom.setAttrAll(elements, { placeholder: "Enter Data" });
}
function storyRemoveClass(selectedStory) {
  const div = dom.createTag("div", {
    text: "Element with classes",
    class: "red-background"
  });
  selectedStory.appendChild(div);
  dom.removeClass(div, "red-background");
  div.innerText = "Element without classes";
}
function storyRemoveClassAll(selectedStory) {
  const items = [
    dom.createTag("div", { text: "Item 1", class: "item red-background" }),
    dom.createTag("div", { text: "Item 2", class: "item red-background" }),
    dom.createTag("div", { text: "Item 3", class: "item red-background" })
  ];
  items.forEach((item) => selectedStory.appendChild(item));
  dom.removeClassAll(items, "red-background");
}
function storySetAttr(selectedStory) {
  const div = dom.createTag("input", {
    attr: { style: "background: #AAA; color: white; padding: 0.5rem" }
  });
  div.value = "Hello World";
  selectedStory.appendChild(div);
  dom.setAttr(div, { disabled: true });
  div.innerText = "Element disabled";
}
function storySetAttrAll(selectedStory) {
  const buttons = [
    dom.createTag("button", { text: "Button 1" }),
    dom.createTag("button", { text: "Button 2" }),
    dom.createTag("button", { text: "Button 3" })
  ];
  buttons.forEach((btn) => selectedStory.appendChild(btn));
  dom.setAttrAll(buttons, {
    "data-role": "action-button",
    "aria-label": "Action"
  });
}
function storySetProps(selectedStory) {
  const div = dom.createTag("div");
  dom.setProps(div, {
    innerHTML: "Content with HTML",
    style: "color: white;"
  });
  selectedStory.appendChild(div);
}
function storySetPropsAll(selectedStory) {
  const div1 = dom.createTag("div");
  const div2 = dom.createTag("div");
  const elements = [div1, div2];
  dom.setPropsAll(elements, {
    innerHTML: "Content with HTML",
    style: "color: white;"
  });
  elements.forEach((div) => selectedStory.appendChild(div));
}
function storySupplantHTML(selectedStory) {
  const template = "<div>Hello {name}, you are {age} years old</div>";
  const data = {
    name: "John",
    age: 25
  };
  const result = dom.supplantHTML(template, data);
  selectedStory.innerHTML = result;
}
function storyToggleClass(selectedStory) {
  const button = dom.createTag("button", {
    text: "Toggle Class",
    class: "btn"
  });
  selectedStory.appendChild(button);
  dom.toggleClass(button, "active");
}
function storyUtils(selectedStory) {
  const container = dom.createTag("div", {
    class: "utils-demo-container",
    prop: {
      style: "padding: 20px; border: 2px solid #ccc;"
    }
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
      style: "margin: 10px 0; padding: 10px; border: 1px solid #eee;"
    }
  });
  const elements = [
    dom.createTag("div", { text: "Element 1" }),
    dom.createTag("div", { text: "Element 2" }),
    dom.createTag("div", { text: "Element 3" })
  ];
  dom.utils.appendChildAll([elementsContainer], elements[0].cloneNode(true));
  const data = {
    user: {
      name: "John",
      details: {
        age: 25,
        city: "Madrid"
      }
    }
  };
  const propertyDemo = dom.createTag("div", {
    class: "property-demo",
    prop: {
      innerHTML: `
                Name: ${dom.utils.getProperty("user.name", data)}<br>
                Age: ${dom.utils.getProperty("user.details.age", data)}<br>
                City: ${dom.utils.getProperty("user.details.city", data)}
            `
    }
  });
  const typeChecks = dom.createTag("div", {
    class: "type-checks",
    prop: {
      innerHTML: `
                isString("test"): ${dom.utils.isString("test")}<br>
                isArray([1,2,3]): ${dom.utils.isArray([1, 2, 3])}<br>
                isObject({}): ${dom.utils.isObject({})}<br>
            `
    }
  });
  const selectorChecks = dom.createTag("div", {
    class: "selector-checks",
    prop: {
      innerHTML: `
                hasSingleClass(".class"): ${dom.utils.hasSingleClass(".class")}<br>
                hasSingleID("#id"): ${dom.utils.hasSingleID("#id")}<br>
                hasSingleTagName("div"): ${dom.utils.hasSingleTagName("div")}
            `
    }
  });
  const styledElement = dom.createTag("div", {
    text: "Styled Element",
    prop: {
      style: "padding: 20px; margin: 10px;"
    }
  });
  const style = window.getComputedStyle(styledElement);
  const paddingValue = dom.utils.getStyleNumValue(style.getPropertyValue("padding-top"));
  const styleInfo = dom.createTag("div", {
    text: `Numeric value of padding: ${paddingValue}px`
  });
  [svgContainer, elementsContainer, propertyDemo, typeChecks, selectorChecks, styledElement, styleInfo].forEach((element) => {
    dom.utils.append(container, element);
  });
  selectedStory.appendChild(container);
}
