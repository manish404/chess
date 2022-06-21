export default class Fn {
    newElement(name, className, text) {
        let elm = document.createElement(name);
        elm.classList.add(className);
        elm.textContent = text;
        return elm;
    }

    elm(id) {
        return document.querySelector(id);
    }
}