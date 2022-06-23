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
}