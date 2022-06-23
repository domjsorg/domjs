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
}