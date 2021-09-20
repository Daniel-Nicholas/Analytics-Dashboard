import { teamReducer } from "./reducers/reducers.js";
// Code in this file should be run in an anonymous function as below as to avoid polluting the global app scope with variables
(function() {
  // Create store
  const storeName = "flux";
  let store = null;
  // check UWF Store name doesn't exist before creating
  if (!UWF.Store.exists(storeName)) {
    store = UWF.Store.create(storeName, teamReducer);
  }

  // Publish message so any widget created before the store can use the store.
  const broadcastAPI = UWF.API.Broadcast.init();
  broadcastAPI.publish("fluxStoreCreated", store);
})();
