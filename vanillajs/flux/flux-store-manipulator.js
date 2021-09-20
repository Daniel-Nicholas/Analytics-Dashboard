import { AddMember, DeleteMember } from "./actions/actions.js";

var shadowRoot = null;
const notificationAPI = UWF.API.Notification.init();
const broadcastAPI = UWF.API.Broadcast.init();
class FluxStoreManipulator extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = getTemplate();

    // Check if the store has been created,
    // if not wait for the broadcast message sent by app.init.js on store created
    if (UWF.Store.exists("flux")) {
      const store = UWF.Store.get("flux");
      this.init(store);
    } else {
      broadcastAPI.subscribe("fluxStoreCreated", store => {
        this.init(store);
      });
    }
  }

  init(store) {
    const addBtn = document.getElementById("btn-add");
    const deleteBtn = document.getElementById("btn-delete");
    const nameInput = document.getElementById("input-name");
    const roleInput = document.getElementById("input-role");
    addBtn.addEventListener("click", () => {
      const role = roleInput.value;
      const name = nameInput.value;
      store.dispatch(AddMember({ name, role }));
      notificationAPI.info(
        "Member Added",
        `${name} has been added to the store`
      );
    });
    deleteBtn.addEventListener("click", () => {
      const name = nameInput.value;
      store.dispatch(DeleteMember(name));
      notificationAPI.info(
        "Member Deleted",
        `${name} has been deleted from the store`
      );
    });
  }
}

// Define Web Component
customElements.define("flux-store-manipulator", FluxStoreManipulator);
// Returns html to use in component
function getTemplate() {
  return `
    <div class='neo-widget' style='height:100%'>
    <div class='neo-widget__header neo-icon-chat-outbound'>Flux Manipulator</div>
    <div class='neo-widget__content neo-widget__content--indented'>
     <div class='row neo-input-group'>
        <h3>This widget changes state of the store</h3>
        <label for='input-name' class='grid--medium-3' aria-label='name'>Name:</label>
        <div class='grid--medium-6'>
          <input class='neo-input' type='text' id='input-name'/>
        </div>
        <label for='input-role' class='grid--medium-3' aria-label='name'>Role:</label>
        <div class='grid--medium-6'>
          <input class='neo-input grid--medium-6' type='text' id='input-role'/>
        </div>
    </div>
    <button class='neo-btn' id='btn-add'>Add</button>
    <button class='neo-btn' id='btn-delete'>Delete</button>
    </div>
  </div>`;
}
