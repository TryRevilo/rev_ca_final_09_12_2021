var attributeExceptions = [
    `role`,
];

function appendText(el, text) {
    var textNode = document.createTextNode(text);
    el.appendChild(textNode);
}

function appendArray(el, children) {
    children.forEach((child) => {
        if (Array.isArray(child)) {
            appendArray(el, child);
        } else if (child instanceof window.Element) {
            el.appendChild(child);
        } else if (typeof child === `string`) {
            appendText(el, child);
        }
    });
}

function setStyles(el, styles) {
    if (!styles) {
        el.removeAttribute(`styles`);
        return;
    }

    Object.keys(styles).forEach((styleName) => {
        if (styleName in el.style) {
            el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
        } else {
            console.warn(`${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`);
        }
    });
}

function makeElement(type, textOrPropsOrChild, ...otherChildren) {
    var el = document.createElement(type);

    if (Array.isArray(textOrPropsOrChild)) {
        appendArray(el, textOrPropsOrChild);
    } else if (textOrPropsOrChild instanceof window.Element) {
        el.appendChild(textOrPropsOrChild);
    } else if (typeof textOrPropsOrChild === `string`) {
        appendText(el, textOrPropsOrChild);
    } else if (typeof textOrPropsOrChild === `object`) {
        Object.keys(textOrPropsOrChild).forEach((propName) => {
            if (propName in el || attributeExceptions.includes(propName)) {
                var value = textOrPropsOrChild[propName];

                if (propName === `style`) {
                    setStyles(el, value);
                } else if (value) {
                    el[propName] = value;
                }
            } else {
                console.warn(`${propName} is not a valid property of a <${type}>`);
            }
        });
    }

    if (otherChildren) appendArray(el, otherChildren);

    return el;
}

var A = (...args) => makeElement(`a`, ...args);
var Button = (...args) => makeElement(`button`, ...args);
var DIV = (...args) => makeElement(`div`, ...args);
var H1 = (...args) => makeElement(`h1`, ...args);
var Header = (...args) => makeElement(`header`, ...args);
var P = (...args) => makeElement(`p`, ...args);
var Span = (...args) => makeElement(`span`, ...args);
var I = (...args) => makeElement(`i`, ...args);