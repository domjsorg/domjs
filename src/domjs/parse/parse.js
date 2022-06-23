dom.parse = (stringHTML) => {
    var template = document.createElement('template');
    stringHTML = stringHTML.trim();
    template.innerHTML = stringHTML;
    return template.content;
}