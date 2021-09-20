class AccessTokenWidget extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const authenticationAPI = UWF.API.Authentication.init();
    const accessToken = authenticationAPI.getBearerToken();

    const eventAPI = UWF.API.Event.init();
    eventAPI.subscribe('onAccessTokenChanged', (token) => {
      this.innerHTML = getTemplate(token);
    });

    this.innerHTML = getTemplate(accessToken);
  }
}
// Define Web Component
customElements.define("access-token-test", AccessTokenWidget);
// Returns html to use in component
function getTemplate(token) {
  return (
  `<div class='neo-widget' style='height:100%'>
      <div class='neo-widget__header'>Authentication API - Access Token</div>
      <div id="widget_body">
        <p>${token}</p>
      </div>
    </div>
    <style>
    #widget_body {
        padding:10px;
    }
    p {
      overflow-wrap: break-word;
    }
    </style>`
  );
}
