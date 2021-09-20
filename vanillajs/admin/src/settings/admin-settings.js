class Settings extends HTMLElement {
  shadowRoot = null;
  addUser = null;
  userDetails = null;
  constructor() {
    super();
  }

  connectedCallback() {
    this.shadowRoot = this.attachShadow({ mode: "open" });
    const div = document.createElement("div");
    div.style.height = "100%";
    div.innerHTML = getTemplate();
    this.shadowRoot.appendChild(div);
  }
}

// Define Web Component
customElements.define("admin-settings", Settings);
// Returns html to use in component
function getTemplate() {
  return `
    <div class='neo-widget' style='height:100%; border-bottom:none'>
      <div class='neo-widget__header neo-icon-settings'>Settings</div>
      <div class='neo-widget__content neo-widget__content--indented'>
        Some settings go here. 
      </div>
    </div>`;
}
