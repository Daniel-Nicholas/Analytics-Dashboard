var shadowRoot = null;
// Create UWF Broadcast API instance.
const broadcastAPI = UWF.API.Broadcast.init();

class Chat extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // mode: "open" doesn't allow inheriting parent CSS stylesheet
    // but allows accessing the shadowRoot root component from the parent
    // see: https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode
    //shadowRoot = this.attachShadow({ mode: "open" });
    this.innerHTML = getTemplate();

    const sendBtn = document.getElementById("sendBtn");
    const chatArea = document.getElementById("chatArea");
    const nameInput = document.getElementById("nameInput");
    const messageInput = document.getElementById("messageInput");

    const userAction = async () => {
      const response = await fetch('http://jsonplaceholder.typicode.com/users');
      const myJson = await response.json(); //extract JSON from the http response
      console.log("#### Received data from REST call !!!! ####");
      console.log(myJson);
      // do something with myJson
    }

    broadcastAPI.subscribe("message.new", message => {
      const div = document.createElement("div");
      div.innerHTML = createChatMessage(message);
      chatArea.append(div);
    });

    sendBtn.addEventListener("click", () => {
      userAction();
      broadcastAPI.publish("message.new", {
        sender: nameInput.value,
        content: messageInput.value
      });
    });
  }
}

// Define Web Component
customElements.define("simple-chat", Chat);
// Returns html to use in component
function getTemplate() {
  return `
      <div class='neo-widget__content'>
      <div class='neo-widget__header'>
      <div class='neo-widget__header-left'>
      <span class="neo-icon-chat-outbound"></span>
        <h4>Chat</h4>
      </div>
    </div>
    <div class="neo-widget__body">
        <div class='row' id='chatArea'></div>
        <div class='neo-form-control'>
          <input id='nameInput' class='neo-input'placeholder='Name' role='textbox'/>
        </div>
        <div class='neo-form-control'>
          <textarea class='neo-input' id='messageInput' rows='5' placeholder='Type to chat' aria-label='description' role='textbox'></textarea>
        </div>
        <div class='neo-widget__footer'>
        <button class='neo-btn' id='sendBtn'>Send</button>
        </div>
      </div>
      </div>`;
}

function createChatMessage(message) {
  return `
  <span  class='neo-label neo-label--secondary'><h4>${message.sender}</h4> </br> ${message.content}</span>`;
}
