class Element {
    constructor(tagName, parent) {
        this.name = tagName;
        this.parent = parent;
        this.children = [];
    }

    getFormattedText() {
        return this.children
            .map((child) =>
                typeof child === "string"
                    ? child.replace(re_whitespace, " ")
                    : child.getFormattedText() +
                      (newLinesAfter.has(child.name) ? "\n" : "")
            )
            .join("");
    }

    toString() {
        return this.children.join("");
    }

}

const formatTags = {
    __proto__: null,
    br: new Element("br"),
    hr: new Element("hr"),
};
const noContent = {
    __proto__: formatTags,
    input: false,
    link: false,
    meta: false,
};

const newLinesAfter = new Set([ "br", "li", "p"]);

const re_whitespace = /\s+/g;

let elements = []

class Readability {
    constructor() {
        this.onreset();
    }

    onreset() {
        this._currentElement = new Element("document");
    }

    // Parser methods
    onopentagname(name) {
        if (name in noContent) {
            if (name in formatTags) {
                this._currentElement.children.push(formatTags[name]);
            }
        } else this._currentElement = new Element(name, this._currentElement);
    }

    ontext(text) {
        this._currentElement.children.push(text);
    }

    onclosetag(tagName) {
        if (tagName in noContent) return;
        let elem = this._currentElement;
        this._currentElement = elem.parent;
        if (tagName === "p" || tagName === "div") {
            if (!/^[\s\t\r\n]+$/.test(elem.children.join(''))) {
                let text = elem.children.join(',').trim()
                if (!/[.。,，！!?？]+/.test(text[text.length-1])) {
                    elem.children.length = 0
                    elem.children = [`${text}。`]
                }
            }
        }
        elem.parent.children.push(elem);
    }

    getText(node = this._currentElement) {
        return node
            ?.getFormattedText()
            ?.trim()
            ?.replace(/\n+(?=\n{2})/g, "") ?? '';
    }
}

module.exports = Readability;
