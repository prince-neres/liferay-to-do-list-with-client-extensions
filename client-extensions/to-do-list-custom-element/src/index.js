import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./styles/index.css";

class WebComponent extends HTMLElement {
    connectedCallback() {
        ReactDOM.render(React.createElement(App, this.dataset), this);
    }

    disconnectedCallback() {
        // ReactDOM.unmountComponentAtNode(this);
    }
}

const ELEMENT_ID = "to-do-list-custom-element";

if (!customElements.get(ELEMENT_ID)) {
    customElements.define(ELEMENT_ID, WebComponent);
}
