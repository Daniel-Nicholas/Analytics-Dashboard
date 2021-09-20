var shadowRoot = null;
class RouteChanger extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = getTemplate();
    const btnChangeRoute = document.getElementById("btnChangeRoute");
    const inputRoute = document.getElementById("inputRoute");

    btnChangeRoute.addEventListener("click", () => {
      window.location.hash = inputRoute.value;
    });
  }
}

// Define Web Component
customElements.define("route-changer", RouteChanger);
// Returns html to use in component
function getTemplate() {
  return `
      <div class="neo-widget__content">
      <div class='neo-widget__header'>
      <div class='neo-widget__header-left'>
      <span class="neo-icon-chat-outbound"></span>
        <h4>Change Route</h4>
      </div>
    </div>
    <div class="neo-widget__body">
        <div class="row">
        <label for="input-group-addon-on-left-plus-icon" aria-label="Addon on the left plus icon">Type and hit change to change url route</label>
        <div class="neo-input-group">
          <div class="neo-input-group__addon neo-icon-link"></div>
            <input class="neo-input" value="" id="inputRoute" placeholder="Type A Route" role="textbox" aria-label="Addon on the left plus icon" />
            <button class="neo-btn" role="button" id="btnChangeRoute">Change</button>
          </div>
        </div>
      </div>
      </div>`;
}
