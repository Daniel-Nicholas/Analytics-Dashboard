var shadowRoot = null;
class SimpleWebComponent extends HTMLElement {
  constructor() {
    super();
    shadowRoot = this.attachShadow({ mode: 'closed' });
    const div = document.createElement('div');
    div.style.height = '100%';

    div.innerHTML = getTemplate(
      'This is a simple web component that displays this text in a colored tile'
    );
    shadowRoot.appendChild(div);
  }
}
// Define Web Component
customElements.define('simple-web-component', SimpleWebComponent);
// Returns html to use in component
function getTemplate(message) {
  return (
    `<div class='sms'><h4>Message:</h4> <p>` +
    message +
    '</p></div> <style> .sms{background-color: #666;color: #fff;font-weight: bold; height:95%; padding: 10px;}} </style>'
  );
}
