import { AddUser } from "../store/actions/actions.js";
let adminStore;
const notificationAPI = UWF.API.Notification.init();
const broadcastAPI = UWF.API.Broadcast.init();
let addBtn;
let inputFirstName;
let inputLastName;
let inputEmail;
let inputRole;

class Add extends HTMLElement {
  constructor() {
    super();
    const div = document.createElement("div");
    div.innerHTML = getTemplate();
    div.classList.add('neo-widget', 'neo-widget--flat');
    this.appendChild(div);
  }

  connectedCallback() {
    // Add DOM selectors
    addBtn = this.querySelector("#addBtn");
    inputFirstName = this.querySelector("#input-firstName");
    inputLastName = this.querySelector("#input-lastName");
    inputEmail = this.querySelector("#input-email");
    inputRole = this.querySelector("#input-role");

    // Check if the store has been created,
    // if not wait for the broadcast message sent by app.init.js on store created
    if (UWF.Store.exists("admin")) {
      // get existing store and initStoreSubscribe
      adminStore = UWF.Store.get("admin");
      this.initStoreSubscribe(adminStore);
    } else {
      // initStoreSubscribe
      broadcastAPI.subscribe("adminStoreCreated", store => {
        this.initStoreSubscribe(store);
      });
    }
  }

  initStoreSubscribe(store) {
    // Set button callbacks
    addBtn.addEventListener("click", () => {
      // Get Values and send to store
      const user = {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        email: inputEmail.value,
        role: inputRole.value
      };
      store.dispatch(AddUser(user));
      notificationAPI.info(
        "User Added",
        `${user.firstName} ${user.lastName} has been added`
      );
    });
  }
}

// Define Web Component
customElements.define("add-user", Add);
// Returns html to use in component
function getTemplate() {
  return `
  <style>
    .grid-columns {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 10px;
      justify-content: start;
      font-weight: bold;
    }
  
    .grid-columns__label--right {
      min-width: 100px;
      text-align: end;
    }
   
  </style>
    <div class='neo-widget__content'>
    <div class='neo-widget__header'>
    <div class='neo-widget__header-left'>
    <span class="neo-icon-add"></span>
      <h4>Add User</h4>
    </div>
  </div>
  <div class="neo-widget__body">
      <!-- First Name -->
      <div class='grid-columns neo-input-group neo-form-control'>
        <label
          for='input-firstName'
          class='grid-columns__label--right'
          aria-label='name'
          >First Name:</label
        >
        <input
          class='neo-input'
          id='input-firstName'
          placeholder='First Name'
          aria-label='name'
          role='textbox'
        />
      </div>
      <!-- Last Name -->
      <div class='grid-columns neo-input-group neo-form-control'>
        <label
          for='input-lastName'
          class='grid-columns__label--right'
          aria-label='name'
          >Last Name:</label
        >
        <input
          class='neo-input'
          id='input-lastName'
          placeholder='Last Name'
          aria-label='name'
          role='textbox'
        />
      </div>
      <!-- Email -->
  
      <div class='grid-columns neo-input-group neo-form-control'>
        <label
          for='input-email'
          class='grid-columns__label--right'
          aria-label='name'
          >Email:</label
        >
        <input
          class='neo-input'
          id='input-email'
          placeholder='Email'
          aria-label='email'
          role='textbox'
        />
      </div>
      <!-- Role -->
      <div class='grid-columns neo-input-group neo-form-control'>
        <label
          for='input-role'
          class='grid-columns__label--right'
          aria-label='name'
          >Role:</label
        >
        <input
          class='neo-input'
          id='input-role'
          placeholder='Role'
          aria-label='role'
          role='textbox'
        />
      </div>
      <div class='neo-widget__footer'>
      <button id='addBtn' class='neo-btn'>Add</button>
    </div> 
    </div>
    </div>
  `;
}
