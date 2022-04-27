window.dom.addClass = (tag, cls) => {
    let ele = dom.getTag(tag);
    if (!dom.hasClass(ele, cls)) {
        ele.classList.add(cls);
    }
    return dom;
}