class LoggerWidget extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Create UWF Notification API instance. 
    const logAPI = UWF.API.Log.init();
    const notificationAPI = UWF.API.Notification.init();
    const widgetName = 'LoggerTestWidget'
    
    this.innerHTML = getTemplate();
    
    const infoBtn = document.getElementById('infoBtn');
    const warningBtn = document.getElementById('warningBtn');
    const errorBtn = document.getElementById('errorBtn');
    const messageInput = document.getElementById('messageInput');
    
    infoBtn.addEventListener('click', () => {
      logAPI.info(widgetName, messageInput.value);
      notificationAPI.info('Info log message added');
    });
    warningBtn.addEventListener('click', () => {
      logAPI.warning(widgetName, messageInput.value);
      notificationAPI.warning('Warning log message added');
    });
    errorBtn.addEventListener('click', () => {
      logAPI.error(widgetName, messageInput.value);
      notificationAPI.error('Error log message added');
    });
  }
}

// Define Web Component
customElements.define('logger-test', LoggerWidget);
// Returns html to use in component
function getTemplate() {
  return `
    <style>
      .log-widget-btn {
        margin : 0 10px 0 0;
      }
    </style>
      <div class='neo-widget__content'>
      <div class='neo-widget__header'>
      <div class='neo-widget__header-left'>
      <span class="neo-icon-chat-outbound"></span>
        <h4>Logger</h4>
      </div>
    </div>
    <div class="neo-widget__body">
        <div class='row'>
          <div class='neo-form-control'>
            <input class='neo-input' value='' id='messageInput' placeholder='Type a message' role='textbox' />
          </div>
          <div>
            <button class='neo-btn neo-btn--success log-widget-btn' role='button' id='infoBtn'>Log Info</button>
            <button class='neo-btn neo-btn--warning log-widget-btn' role='button' id='warningBtn'>Log Warning</button>
            <button class='neo-btn neo-btn--alert log-widget-btn' role='button' id='errorBtn'>Log Error</button>
          </div>
        </div>
        </div>
      </div>`;
}
