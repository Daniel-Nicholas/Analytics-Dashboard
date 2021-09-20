var shadowRoot = null;
class Publisher extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Create UWF Notification API instance. 
    const notificationAPI = UWF.API.Notification.init();
    this.innerHTML = getTemplate();

    const sendBtn = document.getElementById('sendBtn');
    const titleInput = document.getElementById('titleInput');
    const messageInput = document.getElementById('messageInput');
    sendBtn.addEventListener('click', () => {
      notificationAPI.info(titleInput.value, messageInput.value);
    });
  }
}

// Define Web Component
customElements.define('notification-publisher', Publisher);
// Returns html to use in component
function getTemplate() {
  return `
    <div class="neo-widget" style="height:100%">
    <div class="neo-widget__content">
    <div class='neo-widget__header'>
    <div class='neo-widget__header-left'>
    <span class="neo-icon-chat-outbound"></span>
      <h4>Publisher</h4>
    </div>
  </div>
  <div class="neo-widget__body">
      <div class="row">
      <label for="input-group-addon-on-left-plus-icon" aria-label="Addon on the left plus icon">Type and hit send to send notification</label>
      <div class="neo-input-group neo-form-control">
        <div class="neo-input-group__addon neo-icon-notifications"></div>
        <input class="neo-input" value="" id="titleInput" placeholder="Type a title" role="textbox" aria-label="Addon on the left plus icon" />
        <input class="neo-input" value="" id="messageInput" placeholder="Type a message" role="textbox" aria-label="Addon on the left plus icon" />
        <button class="neo-btn" role="button" id="sendBtn">Send</button>
      </div>
      </div>
    </div>
    </div>
  </div>`;
}
