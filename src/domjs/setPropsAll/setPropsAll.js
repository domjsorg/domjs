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
}