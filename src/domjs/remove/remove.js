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
}