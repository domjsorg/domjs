dom.utils = new function() {
    "use strict";

    this.append = append;
    this.appendChildAll = appendChildAll;
    this.createTagNS = createTagNS;
    this.getElement = getElement;
    this.getProperty = getProperty;
    this.getStyleNumValue = getStyleNumValue;
    this.hasColon = hasColon;
    this.hasSingleClass = hasSingleClass;
    this.hasSingleID = hasSingleID;
    this.hasSingleTagName = hasSingleTagName;
    this.isArray = isArray;
    this.isElement = isElement;
    this.isHTMLCollection = isHTMLCollection;
    this.isNode = isNode;
    this.isNodeList = isNodeList;
    this.isObject = isObject;
    this.isString = isString;
    this.setEvent = setEvent;
    this.singleHashChar = singleHashChar;
    this.singlePeriodChar = singlePeriodChar;

    function append(parent, content, prepend) {
        if (content && parent) {
            if (prepend) {
                if (!parent.firstChild) {
                    parent.appendChild(content);
                } else {
                    parent.insertBefore(content, parent.firstChild);
                }
            } else {
                parent.appendChild(content);
            }
        }
    }
    
    function appendChildAll(list, content, prepend) {
        for (let i = 0; i < list.length; i++) {
            append(list[i], content, prepend);
        }
    }

    function createTagNS(name, namespace) {
        switch (namespace) {
            case "SVG":
                return document.createElementNS("http://www.w3.org/2000/svg", name);
            case "MathML":
                return document.createElementNS("http://www.w3.org/1998/Math/MathML", name);
            default:
                return document.createElementNS("http://www.w3.org/1999/xhtml", name);
        }
    }

    function getElement(selector) {
        if (typeof selector !== "string") {
            return selector;
        }

        if (hasSingleID(selector)) {
            return document.getElementById(selector.replace("#", ""));
        }

        if (hasSingleClass(selector)) {
            return document.getElementsByClassName(selector.replace(".", ""))[0];
        }

        if (hasSingleTagName(selector)) {
            return document.getElementsByTagName(selector)[0];
        }

        return document.querySelector(selector);
    }

    function getProperty(propertyName, object) {
        let parts = propertyName.split(".");
        let property = object;

        for (let i = 0, length = parts.length; i < length; i++) {
            if (parts[i] in property === false) {
                return "";
            }
            property = property[parts[i]];
        }

        return property;
    }

    function getStyleNumValue(style) {
        return parseInt(style.replace("px", ""));
    }
    
    function hasColon(string) {
        if (isString(string)) {
            return string.includes(":");
        }
    }

    function hasSingleClass(string) {
        if (isString(string)) {
            return string.startsWith(".") && singlePeriodChar(string) && !hasColon(string) && !string.includes("#") && !string.includes(" ");
        }
    }

    function hasSingleID(string) {
        if (isString(string)) {
            return string.startsWith("#") && singleHashChar(string) && !hasColon(string) && !string.includes(".") && !string.includes(" ");
        }
    }

    function hasSingleTagName(string) {
        if (isString(string)) {
            return !string.includes("#") && !string.includes(".") && !string.includes(" ") && !hasColon(string);
        }
    }

    function isArray(array) {
        return Array.isArray(array);
    }

    function isElement(element) {
        return element instanceof Element;
    }

    function isHTMLCollection(htmlCollection) {
        return HTMLCollection.prototype.isPrototypeOf(htmlCollection);
    }

    function isNode(node) {
        return node instanceof Node;
    }

    function isNodeList(nodeList) {
        return NodeList.prototype.isPrototypeOf(nodeList);
    }

    function isObject(value) {
        return typeof value === "object";
    }

    function isString(value) {
        return typeof value === "string";
    }

    function setEvent(tagEle, events) {
        const tag = dom.getTag(tagEle);
        if (tag && !isString(tag) && events && isObject(events)) {
            for (const key in events) {
                tag.addEventListener(key, events[key]);
            }
        }
        return self;
    }

    function singleHashChar(string) {
        if (isString(string)) {
            return (string.match(RegExp('#', 'g')) || []).length === 1;
        }
    }

    function singlePeriodChar(string) {
        if (isString(string)) {
            return (string.match(RegExp('\\.', 'g')) || []).length === 1;
        }
    }
}