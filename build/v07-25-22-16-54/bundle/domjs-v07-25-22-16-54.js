/******************************************
*  Copyright 2022 Alejandro Sebastian Scotti, Scotti Corp.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License.

*  @author Alejandro Sebastian Scotti
*  @version v07-25-22-16-54
*******************************************/

(() => {
  // src/configs/domInit.js
  window.dom = {};

  // src/domjs/addClass/addClass.js
  dom.addClass = (tag, cls) => {
    let ele = dom.getTag(tag);
    if (!dom.hasClass(ele, cls)) {
      ele.classList.add(cls);
    }
    return dom;
  };

  // src/domjs/append/append.js
  dom.append = (selector, content, prepend) => {
    const self2 = dom;
    const utils = self2.utils;
    if (!content || !selector) {
      console.error("DOM.addChild(): missing parameter 'selector', 'content' or both.");
      return;
    }
    if (typeof content === "string") {
      content = self2.parse(content);
    }
    if (utils.hasSingleID(selector)) {
      selector = selector.replace("#", "");
      utils.append(document.getElementById(selector), content, prepend);
      return self2;
    }
    if (utils.hasSingleClass(selector)) {
      const tags = document.getElementsByClassName(selector);
      if (tags && tags.length > 0) {
        utils.appendChildAll(tags, content, prepend);
      }
      return self2;
    }
    if (utils.isString(selector)) {
      const tags = document.querySelectorAll(selector);
      if (tags && tags.length > 0) {
        utils.appendChildAll(tags, content, prepend);
      }
      return self2;
    }
    if (utils.isElement(selector) || utils.isNode(selector)) {
      utils.append(selector, content, prepend);
      return self2;
    }
    if (utils.isNodeList(selector) || utils.isHTMLCollection(selector) || utils.isArray(selector)) {
      utils.appendChildAll(selector, content, prepend);
      return self2;
    }
  };

  // src/domjs/appendSVG/appendSVG.js
  dom.appendSVG = (selector, content, prepend) => {
    if (!content || !selector) {
      console.error("DOM.addSVGChild(): missing parameter 'selector', 'content' or both.");
      return;
    }
    if (typeof content === "string") {
      let receptacle = document.createElement("div");
      let svgfragment = "<svg>" + content + "</svg>";
      receptacle.innerHTML = "" + svgfragment;
      Array.prototype.slice.call(receptacle.childNodes[0].childNodes).forEach(function(el2) {
        dom.append(selector, el2, prepend);
      });
    } else {
      dom.append(selector, el, prepend);
    }
  };

  // src/domjs/appendSelfToParentTag/appendSelfToParentTag.js
  dom.appendSelfToParentTag = (parentTag, self2, prepend) => {
    const parentEle = dom.getTag(parentTag);
    if (parentEle) {
      dom.append(parentEle, self2, prepend);
      return parentEle;
    } else {
      return `${self2.localName}: parentTag element not found. DOM install failed.`;
    }
  };

  // src/domjs/computeTagHeight/computeTagHeight.js
  dom.computeTagHeight = (tag) => {
    const utils = dom.utils;
    const style = window.getComputedStyle(tag, null);
    if (!style) {
      return;
    }
    const topPad = style.getPropertyValue("padding-top");
    const bottomPad = style.getPropertyValue("padding-bottom");
    const topMargin = style.getPropertyValue("margin-top");
    const bottomMargin = style.getPropertyValue("margin-bottom");
    const sumPad = utils.getStyleNumValue(topPad) + utils.getStyleNumValue(bottomPad);
    const sumMargin = utils.getStyleNumValue(topMargin) + utils.getStyleNumValue(bottomMargin);
    return sumPad + sumMargin + tag.clientHeight;
  };

  // src/domjs/computeTagWidth/computeTagWidth.js
  dom.computeTagWidth = (tag, parentTag) => {
    const utils = dom.utils;
    const style = window.getComputedStyle(tag, null);
    if (!style) {
      return;
    }
    const leftPad = style.getPropertyValue("padding-left");
    const rightPad = style.getPropertyValue("padding-right");
    const leftMargin = style.getPropertyValue("margin-left");
    const rightMargin = style.getPropertyValue("margin-right");
    const sumPad = utils.getStyleNumValue(leftPad) + utils.getStyleNumValue(rightPad);
    const sumMargin = utils.getStyleNumValue(leftMargin) + utils.getStyleNumValue(rightMargin);
    let result = 0;
    if (parentTag) {
      const style2 = window.getComputedStyle(parentTag, null);
      if (style2) {
        const leftPad2 = style2.getPropertyValue("padding-left");
        const rightPad2 = style2.getPropertyValue("padding-right");
        const sumPad2 = utils.getStyleNumValue(leftPad2) + utils.getStyleNumValue(rightPad2);
        result += sumPad2 + sumMargin;
      }
    }
    result += sumPad + sumMargin + tag.clientWidth;
    return result;
  };

  // src/domjs/createSVGTag/createSVGTag.js
  dom.createSVGTag = (name, config) => {
    const utils = dom.utils;
    const newEl = utils.createTagNS(name, "SVG");
    if (!config || !utils.isObject(config))
      return;
    dom.setProps(newEl, config.prop);
    dom.setAttr(newEl, config.attr);
    utils.setEvent(newEl, config.event);
    if (config.children && Array.isArray(config.children)) {
      config.children.forEach((child) => {
        let newChild = dom.createSVGTag(child.name, child.props, child.attrs, child.children);
        utils.append(newEl, newChild);
      });
    }
    return newEl;
  };

  // src/domjs/createTag/createTag.js
  dom.createTag = (name, config) => {
    const utils = dom.utils;
    const newEl = utils.createTagNS(name);
    if (!config || !utils.isObject(config)) {
      return newEl;
    }
    switch (name) {
      case "input":
      case "textarea":
      case "select":
      case "option":
      case "output":
        newEl.value = config.text ? config.text : "";
        break;
      default:
        newEl.innerText = config.text ? config.text : "";
        break;
    }
    dom.setProps(newEl, config.prop);
    dom.setAttr(newEl, config.attr);
    utils.setEvent(newEl, config.event);
    if (config.class && config.class !== "") {
      newEl.className = config.class;
    }
    return newEl;
  };

  // src/domjs/empty/empty.js
  dom.empty = (selector) => {
    const tag = dom.getTag(selector);
    tag.innerHTML = "";
    return self;
  };

  // src/domjs/getTag/getTag.js
  dom.getTag = (selector, parent) => {
    const utils = dom.utils;
    if (typeof selector !== "string") {
      return selector;
    }
    let parentTag = parent ? parent : document;
    if (typeof parentTag === "string") {
      parentTag = utils.getElement(parentTag);
    }
    if (utils.hasSingleID(selector)) {
      return parentTag.getElementById(selector.replace("#", ""));
    }
    if (utils.hasSingleClass(selector)) {
      return parentTag.getElementsByClassName(selector.replace(".", ""))[0];
    }
    if (utils.hasSingleTagName(selector)) {
      return parentTag.getElementsByTagName(selector)[0];
    }
    return parentTag.querySelector(selector);
  };

  // src/domjs/getTags/getTags.js
  dom.getTags = (selector, parent) => {
    const utils = dom.utils;
    if (typeof selector !== "string") {
      return selector;
    }
    if (utils.hasSingleID(selector)) {
      return "For a single #id selector use getTag() method instead (expects a single tag return, not a list).";
    }
    let element = parent ? parent : document;
    if (utils.hasSingleClass(selector)) {
      return element.getElementsByClassName(selector.replace(".", ""));
    }
    if (utils.hasSingleTagName(selector)) {
      return element.getElementsByTagName(selector);
    }
    console.log("DOM.getTags(): you have used document.querySelectorAll('') that returns DOM tags that are not 'LIVE' therefore won't automatically stay in sync with the browser therefore, it's not recommended. Try a direct String selector.");
    return element.querySelectorAll(selector);
  };

  // src/domjs/hasClass/hasClass.js
  dom.hasClass = (target, className) => {
    return target.className.indexOf(className) !== -1;
  };

  // src/domjs/parse/parse.js
  dom.parse = (stringHTML) => {
    var template = document.createElement("template");
    stringHTML = stringHTML.trim();
    template.innerHTML = stringHTML;
    return template.content;
  };

  // src/domjs/prepend/prepend.js
  dom.prepend = (selector, content) => {
    dom.append(selector, content, true);
  };

  // src/domjs/remove/remove.js
  dom.remove = (selector) => {
    const utils = dom.utils;
    if (typeof selector === "string") {
      if (utils.hasSingleID(selector)) {
        remove(getTag(selector));
      } else {
        dom.removeAll(getTags(selector));
      }
    } else {
      remove(selector);
    }
    return self;
    function remove(ele) {
      if (ele.parentNode.removeChild) {
        ele.parentNode.removeChild(ele);
      }
    }
  };

  // src/domjs/removeAll/removeAll.js
  dom.removeAll = (tagList) => {
    for (let index = 0; index < tagList.length; index++) {
      dom.remove(tagList[index]);
    }
  };

  // src/domjs/removeAttrs/removeAttrs.js
  dom.removeAttrs = (tagEle, attrs) => {
    const utils = dom.utils;
    const tag = dom.getTag(tagEle);
    if (tag && !utils.isString(tag) && attrs && Array.isArray(attrs)) {
      attrs.forEach((attr) => {
        tag.removeAttribute(attr);
      });
    }
    return dom;
  };

  // src/domjs/removeAttrsAll/removeAttrsAll.js
  dom.removeAttrsAll = (ele, attrs) => {
    const utils = dom.utils;
    const tags = dom.getTags(ele);
    if (tags && !utils.isString(tags) && attrs && Array.isArray(attrs)) {
      for (let index = 0; index < tags.length; index++) {
        attrs.forEach((attr) => {
          tags[index].removeAttribute(attr);
        });
      }
    }
    return dom;
  };

  // src/domjs/removeClass/removeClass.js
  dom.removeClass = (tag, cls) => {
    let ele = dom.getTag(tag);
    ele.classList.remove(cls);
    return dom;
  };

  // src/domjs/removeClassAll/removeClassAll.js
  dom.removeClassAll = (tags, cls) => {
    const utils = dom.utils;
    if (utils.isArray(tags)) {
      for (let index = 0; index < tags.length; index++) {
        dom.removeClass(tags[index], cls);
      }
    } else if (utils.isObject(tags)) {
      for (const key in tags) {
        dom.removeClass(tags[key], cls);
      }
    }
  };

  // src/domjs/setAttr/setAttr.js
  dom.setAttr = (tagEle, attr) => {
    const utils = dom.utils;
    const tag = dom.getTag(tagEle);
    if (tag && !utils.isString(tag) && attr && utils.isObject(attr)) {
      for (const key in attr) {
        tag.setAttribute(key, attr[key]);
      }
    }
    return dom;
  };

  // src/domjs/setAttrAll/setAttrAll.js
  dom.setAttrAll = (ele, attrs) => {
    const utils = dom.utils;
    const tags = dom.getTags(ele);
    if (tags && !utils.isString(tags) && attrs && utils.isObject(attrs)) {
      for (let index = 0; index < tags.length; index++) {
        for (const key in attrs) {
          tags[index].setAttribute(key, attrs[key]);
        }
      }
    }
    return dom;
  };

  // src/domjs/setProps/setProps.js
  dom.setProps = (ele, prop) => {
    const utils = dom.utils;
    const tag = dom.getTag(ele);
    if (tag && !utils.isString(tag) && prop && utils.isObject(prop)) {
      for (const key in prop) {
        tag[key] = prop[key];
      }
    }
    return dom;
  };

  // src/domjs/setPropsAll/setPropsAll.js
  dom.setPropsAll = (ele, props) => {
    const utils = dom.utils;
    const tags = dom.getTags(ele);
    if (tags && !utils.isString(tags) && props && utils.isObject(props)) {
      for (let index = 0; index < tags.length; index++) {
        for (const key in props) {
          tags[index][key] = props[key];
        }
      }
    }
    return dom;
  };

  // src/domjs/supplantHTML/supplantHTML.js
  dom.supplantHTML = (html, data) => {
    return html.replace(/{([^{}]*)}/g, function(a, b) {
      let r = dom.utils.getProperty(b, data);
      return typeof r === "string" || typeof r === "number" ? r : a;
    });
  };

  // src/domjs/toggleClass/toggleClass.js
  dom.toggleClass = (tag, cls) => {
    let ele = dom.getTag(tag);
    ele.classList.toggle(cls);
    return dom;
  };

  // src/domjs/utils/utils.js
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
        return (string.match(RegExp("#", "g")) || []).length === 1;
      }
    }
    function singlePeriodChar(string) {
      if (isString(string)) {
        return (string.match(RegExp("\\.", "g")) || []).length === 1;
      }
    }
  }();
})();
