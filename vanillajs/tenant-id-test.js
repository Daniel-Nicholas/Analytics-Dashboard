class TenantIdWidget extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const authenticationAPI = UWF.API.Authentication.init();
    const tenantId = authenticationAPI.getTenantId();

    this.innerHTML = getTemplate(tenantId);
  }
}
// Define Web Component
customElements.define("tenant-id-test", TenantIdWidget);
// Returns html to use in component
function getTemplate(tenantId) {
  return `     
    <div class='neo-widget' style='height:100%'>
      <div class='neo-widget__header'>Authentication API - Tenant Id</div>
      <div id="widget_body">
        <p>Tenant Id: ${tenantId}</p>
      </div>
    </div>
    <style>
    #widget_body {
        padding:10px;
    }
    p {
      overflow-wrap: break-word;
    }
    </style>`;
}
