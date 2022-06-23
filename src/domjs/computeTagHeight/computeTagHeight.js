dom.computeTagHeight = (tag) => {
    const utils = dom.utils;
    const style = window.getComputedStyle(tag, null);

    if (!style) {
        return;
    }

    const topPad = style.getPropertyValue("padding-top");
    const bottomPad = style.getPropertyValue("padding-bottom");
    const topMargin = style.getPropertyValue("margin-top");
    const bottomMargin = style.getPropertyValue("margin-bottom");
    const sumPad = utils.getStyleNumValue(topPad) + utils.getStyleNumValue(bottomPad);
    const sumMargin = utils.getStyleNumValue(topMargin) + utils.getStyleNumValue(bottomMargin);
    return sumPad + sumMargin + tag.clientHeight;
}