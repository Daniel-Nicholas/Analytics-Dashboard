import { SortTable } from "../utils/table.js";
import { UpdateUser, DeleteUser } from "../store/actions/actions.js";
let store;
const broadcastAPI = UWF.API.Broadcast.init();
const notificationAPI = UWF.API.Notification.init();

class Details extends HTMLElement {
  listenersAdded = false;
  storeUnsubscribeFn = null;
  constructor() {
    super();
    const div = document.createElement("div");
    div.style.maxHeight = "calc(100% - 50px)";
    div.style.overflow = "scroll";
    div.innerHTML = getTemplate();
    this.appendChild(div);
  }

  connectedCallback() {
    // Check if the store has been created,
    // if not wait for the broadcast message sent by app.init.js on store created
    if (UWF.Store.exists("admin")) {
      // get existing store and initStoreSubscribe
      store = UWF.Store.get("admin");
      this.initStoreSubscribe(store);
    } else {
      // initStoreSubscribe
      broadcastAPI.subscribe("adminStoreCreated", store => {
        this.initStoreSubscribe(store);
      });
    }
  }

  disconnectedCallback() {
    // unsubscribe from store listeners
    UWF.Store.unsubscribe(this.storeUnsubscribeFn);
  }

  initStoreSubscribe(store) {
    this.storeUnsubscribeFn = store.subscribe(() => {
      this.updateState(store.getState());
    });
    // call store.getState() due to store.subscribe() listener
    // not firing during initial render of template
    this.updateState(store.getState());
  }

  updateState(state) {
    const usersState = state;

    let element = this.querySelector("#neo-sort-example");
    let table = SortTable({ el: element, items: usersState.users });
    // Add listener to catch update user events from user-tr components
    if (!this.listenersAdded) {
      element.addEventListener("updateUser", e => {
        store.dispatch(UpdateUser(e.detail));
        notificationAPI.info(
          "User Updated",
          `User ${e.detail.email} has been updated`
        );
      });
      element.addEventListener("deleteUser", e => {
        store.dispatch(DeleteUser(e.detail));
        notificationAPI.info(
          "User Deleted",
          `User ${e.detail.email} has been deleted`
        );
      });
    }

    table.init();
    this.listenersAdded = true;
  }
}

// Define Web Component
customElements.define("user-details", Details);
// Returns html to use in component
function getTemplate() {
  return `  
      <table id='neo-sort-example' class='neo-table neo-table--sortable neo-table--hover'>
        <thead>
          <tr>
            <th data-sortby='firstName'>First Name</th>
            <th data-sortby='lastName'>Last Name</th>
            <th data-sortby='email'>Email</th>
            <th data-sortby='role'>Role</th>
          </tr>
          <tr>
            <td>
              <input
                class='neo-input'
                data-filterby='firstName'
                placeholder='Filter by first name'
                aria-label='name'
                role='textbox'
              />
            </td>
            <td>
              <input
                class='neo-input'
                data-filterby='lastName'
                placeholder='Filter by last name'
                aria-label='name'
                role='textbox'
              />
            </td>
            <td>
              <input
                class='neo-input'
                data-filterby='email'
                placeholder='Filter by email'
                aria-label='name'
                role='textbox'
              />
            </td>
            <td>
              <div class="neo-select">
                <select
                  class='neo-input'
                  data-filterby='role'
                  aria-label='select-option'
                  role='listbox'
                >
                  <option value=''>Filter by role</option>
                  <option value='administrator'>Administrator</option>
                  <option value='supervisor'>Supervisor</option>
                </select>
              </div>
            </td>
          </tr>
        </thead>
        <tbody></tbody>
      </table>`;
}
