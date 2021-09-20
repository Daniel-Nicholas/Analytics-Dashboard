class Counter extends HTMLElement {
  shadowRoot = null;
  btnIncrementAsync;
  btnIncrement;
  btnDecrement;
  storeDisplay;
  storeUnsubscribeFn = null;
  broadcastAPI = UWF.API.Broadcast.init();

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = getTemplate();
    this.init();
    let store;
    if (UWF.Store.exists("reduxSagaSample")) {
      store = UWF.Store.get("reduxSagaSample");
      this.initStoreSubscribe(store);
    } else {
      this.broadcastAPI.subscribe("reduxSagaSampleStoreCreated", store => {
        this.initStoreSubscribe(store);
      });
    }
  }

  disconnectedCallback() {
    // unsubscribe from store listeners
    UWF.Store.unsubscribe(this.storeUnsubscribeFn);
  }

  init() {
    this.btnIncrementAsync = document.getElementById("btnIncrementAsync");
    this.btnIncrement = document.getElementById("btnIncrement");
    this.btnDecrement = document.getElementById("btnDecrement");
    this.storeDisplay = document.getElementById("storeDisplay");
  }

  initStoreSubscribe(store) {
    this.storeUnsubscribeFn = store.subscribe(() => {
      this.updateState(store.getState());
    });

    // Set button callbacks
    this.btnIncrementAsync.addEventListener("click", () => {
      // This action triggers an effect from redux-saga
      // See sagas/sagas.js
      store.dispatch({ type: "INCREMENT_ASYNC" });
    });
    this.btnIncrement.addEventListener("click", () => {
      store.dispatch({ type: "INCREMENT" });
    });
    this.btnDecrement.addEventListener("click", () => {
      store.dispatch({ type: "DECREMENT" });
    });
  }

  updateState(state) {
    this.storeDisplay.innerHTML = state.count;
  }
}

// Define Web Component
customElements.define("saga-counter", Counter);
// Returns html to use in component
function getTemplate() {
  return `
      <div class='neo-widget' style='height:100%'>
      <div class='neo-widget__header neo-icon-chat-outbound'>Counter</div>
      <div class='neo-widget__content neo-widget__content--indented'>
       <div class='neo-empty-state'>
          <h2>Value held in store:</h2>
          <h1 id='storeDisplay'></h1>
        </div>
      </div>
      <div class='neo-widget__footer'>
          <button class='neo-btn neo-btn--primary' id='btnIncrementAsync'>Increment after 1 second</button>
          <button class='neo-btn neo-btn--primary' id='btnIncrement'>Increment</button>
          <button class='neo-btn neo-btn--primary' id='btnDecrement'>Decrement</button>
      </div>
    </div>`;
}
