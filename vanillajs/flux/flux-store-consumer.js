import {
  getTeamName,
  getTeamMembers,
  getTeamMemberCount
} from "./selectors/selectors.js";
var shadowRoot = null;
let store;
let teamNameDisplay;
let membersDisplay;
let countDisplay;
const broadcastAPI = UWF.API.Broadcast.init();
class FluxStoreConsumer extends HTMLElement {
  storeUnsubscribeFn = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = getTemplate();
    // Check if the store has been created, if not wait for the broadcast message sent by app.init.js on store created
    if (UWF.Store.exists("flux")) {
      store = UWF.Store.get("flux");
      this.initStoreSubscribe(store);
    } else {
      broadcastAPI.subscribe("fluxStoreCreated", store => {
        this.initStoreSubscribe(store);
      });
    }
  }

  disconnectedCallback() {
    // unsubscribe from store listeners
    UWF.Store.unsubscribe(this.storeUnsubscribeFn);
  }

  initStoreSubscribe(store) {
    this.updateState(store.getState());
    this.storeUnsubscribeFn = store.subscribe(() => {
      this.updateState(store.getState());
    });
  }

  updateState(state) {
    teamNameDisplay = document.getElementById("teamName");
    membersDisplay = document.getElementById("members");
    countDisplay = document.getElementById("count");
    const team = getTeamName(state);
    const members = getTeamMembers(state);
    let html = `<ul class='neo-group-list'>`;
    members.forEach(member => {
      html += `<li class='neo-group-list-item'>
        <h5 class='neo-icon-customer'>${member.name}</h5>
        <label class='neo-chip' aria-label='Handwriting'>
        ${member.role}
        </label>
        <label class='neo-chip' aria-label='Handwriting'>
        ${team}
        </label>
        </li>`;
    });
    html += "</ul>";
    membersDisplay.innerHTML = html;
    countDisplay.innerText = getTeamMemberCount(state);
  }
}

// Define Web Component
customElements.define("flux-store-consumer", FluxStoreConsumer);
// Returns html to use in component
function getTemplate() {
  return `
    <div class='neo-widget' style='height:100%'>
    <div class='neo-widget__header neo-icon-chat-outbound'>Flux Consumer</div>
    <div class='neo-widget__content neo-widget__content--indented'>
      <h5>This widget displays the state of the flux store</h5>
        <div id='members'></div>
    </div>
    <div class='neo-widget__footer'>
        <p id='count'></p>
    </div>
  </div>`;
}
