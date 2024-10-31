import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import "./styles/index.css"


class WebComponent extends HTMLElement {
  connectedCallback() {
	createRoot(this).render(
	  <App />,
	  this
	);
  }
}

const ELEMENT_ID = 'to-do-list-react';

if (!customElements.get(ELEMENT_ID)) {
  customElements.define(ELEMENT_ID, WebComponent);
}
