dom.removeAll = (tagList) => {
    for (let index = 0; index < tagList.length; index++) {
        dom.remove(tagList[index]);
    }
}