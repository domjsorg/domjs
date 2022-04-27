window.dom.computeTagWidth = (tag, parentTag) => {
    const utils = window.dom.utils;
    const style = window.getComputedStyle(tag, null);

    if (!style) {
        return;
    }

    const leftPad = style.getPropertyValue("padding-left");
    const rightPad = style.getPropertyValue("padding-right");
    const leftMargin = style.getPropertyValue("margin-left");
    const rightMargin = style.getPropertyValue("margin-right");
    const sumPad = utils.getStyleNumValue(leftPad) + utils.getStyleNumValue(rightPad);
    const sumMargin = utils.getStyleNumValue(leftMargin) + utils.getStyleNumValue(rightMargin);
    let result = 0;

    if (parentTag) {
        const style = window.getComputedStyle(parentTag, null);
        if (style) {
            const leftPad = style.getPropertyValue("padding-left");
            const rightPad = style.getPropertyValue("padding-right");
            const sumPad = utils.getStyleNumValue(leftPad) + utils.getStyleNumValue(rightPad);
            result += sumPad + sumMargin;
        }
    }

    result += sumPad + sumMargin + tag.clientWidth;
    return result;
}