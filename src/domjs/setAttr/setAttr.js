window.dom.setAttr = (tagEle, attr) => {
    const utils = window.dom.utils;
    const tag = dom.getTag(tagEle);
    if (tag && !utils.isString(tag) && attr && utils.isObject(attr)) {
        for (const key in attr) {
            tag.setAttribute(key, attr[key]);
        }
    }
    return dom;
}