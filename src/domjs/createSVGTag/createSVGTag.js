window.dom.createSVGTag = (name, config) => {
    const utils = window.dom.utils;
    const newEl = utils.createTagNS(name, "SVG");

    if (!config || !utils.isObject(config))
        return;

    dom.setProps(newEl, config.prop);
    dom.setAttr(newEl, config.attr);
    utils.setEvent(newEl, config.event);

    if (config.children && Array.isArray(config.children)) {
        config.children.forEach(child => {
            let newChild = dom.createSVGTag(child.name, child.props, child.attrs, child.children);
            utils.append(newEl, newChild);
        });
    }

    return newEl;
}