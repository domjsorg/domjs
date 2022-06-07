window.dom.appendSelfToParentTag = (parentTag, self, prepend) => {
    const parentEle = dom.getTag(parentTag);
    if (parentEle) {
        dom.append(parentEle, self, prepend);
        return parentEle;
    } else {
        return `${self.localName}: parentTag element not found. DOM install failed.`;
    }
}