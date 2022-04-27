window.dom.toggleClass = (tag, cls) => {
    let ele = dom.getTag(tag);
    ele.classList.toggle(cls);
    return dom;
}