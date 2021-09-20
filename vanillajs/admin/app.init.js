import { usersReducer } from "./src/store/reducers/reducers.js";
// Code in this file should be run in an anonymous function as below as to avoid polluting the global app scope with variables
(function() {
  // Create store
  const storeName = "admin";
  let store = null;
  // check UWF Store name doesn't exist before creating
  if (!UWF.Store.exists(storeName)) {
    store = UWF.Store.create(storeName, usersReducer);
  } 

  // Publish message so any widget created before the store can use the store by subscribing to this event.
  const broadcastAPI = UWF.API.Broadcast.init();
  broadcastAPI.publish("adminStoreCreated", store);
})();
