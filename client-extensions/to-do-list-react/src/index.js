import React from 'react';
import {createRoot} from 'react-dom/client';
import Start from './Start';

const App = ({route}) => {

  return (
	<div>
	  <Start />
	</div>
  );
};

class WebComponent extends HTMLElement {
  connectedCallback() {
	createRoot(this).render(
	  <App route={this.getAttribute('route')} />,
	  this
	);
  }
}

const ELEMENT_ID = 'to-do-list-react';

if (!customElements.get(ELEMENT_ID)) {
  customElements.define(ELEMENT_ID, WebComponent);
}
