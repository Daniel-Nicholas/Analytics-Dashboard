import createSagaMiddleware from "redux-saga";
import reducer from "./store/reducers.js";
import rootSaga from "./sagas/sagas.js";

// Code in this file should be run in an anonymous function as below as to avoid polluting the global app scope with variables
(function() {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();
  // mount it on the Store

  // Create store
  const storeName = "reduxSagaSample";
  let store = null;

  // check UWF Store name doesn't exist before creating
  if (!UWF.Store.exists(storeName)) {
    store = UWF.Store.create(storeName, reducer, sagaMiddleware);
  }
  // then run the saga
  sagaMiddleware.run(rootSaga);

  // Publish message so any widget created before the store can use the store.
  const broadcastAPI = UWF.API.Broadcast.init();
  broadcastAPI.publish("reduxSagaSample", store);
})();
