// Create UWF Event API instance.
const eventAPI = UWF.API.Event.init();
class RouteTest extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    //shadowRoot = this.attachShadow({ mode: 'closed' });
    this.innerHTML = getTemplate();
    const routeDisplay = document.getElementById("routeDisplay");
    const additionalPropertiesDisplay = document.getElementById(
      "additionalPropertiesDisplay"
    );

    // Set current link route on component load.
    // Get Current link from UWF Store
    const currentLink = UWF.Store.getCurrentLink();
    if (currentLink) {
      routeDisplay.innerHTML = currentLink.route;

      // Display additional properties associated with the link
      if (currentLink.additionalProperties) {
        additionalPropertiesDisplay.innerHTML = JSON.stringify(
          currentLink.additionalProperties
        );
      }
    }

    // Subscribe to onLinkChanged event for link updates to change route after component has been loaded
    // Note as we are only subscribing when this component is loaded we need to use the UWF store
    // to get the current value. This component will only be created once the link is clicked on therefore
    // it will miss this event. After the component is loaded it will remain in the DOM until the application
    // is destroyed.
    eventAPI.subscribe("onLinkChanged", data => {
      if (data.selected) {
        //setTimeout(() => {
        routeDisplay.innerHTML = data.selected.route;

        if (data.selected.additionalProperties) {
          additionalPropertiesDisplay.innerHTML = JSON.stringify(
            data.selected.additionalProperties
          );
        }
        //}, 2000);
      }
    });
  }
}

// Define Web Component
customElements.define("route-test", RouteTest);
// Returns html to use in component
function getTemplate() {
  return `
    <div class='neo-widget__content'>
    <div class='neo-widget__header'>
    <div class='neo-widget__header-left'>
    <span class="neo-icon-chat-outbound"></span>
      <h4>UWF Events</h4>
    </div>
  </div>
      <div class='neo-empty-state'>
        <p class='neo-icon-auto-answer' id='routeDisplay'></p>
        <p id='additionalPropertiesDisplay'></p>
      </div>
      <div class='neo-widget__footer'>
      Routes
    </div>
    </div>`;
}
