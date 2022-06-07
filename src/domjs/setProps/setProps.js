window.dom.setProps = (ele, prop) => {
    const utils = window.dom.utils;
    const tag = dom.getTag(ele);
    if (tag && !utils.isString(tag) && prop && utils.isObject(prop)) {
        for (const key in prop) {
            tag[key] = prop[key];
        }
    }
    return dom;
}