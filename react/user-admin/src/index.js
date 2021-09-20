import React, { Component } from 'react';
import ReactWebComponent from 'react-web-component';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagas.js';
import UserAdmin from './UserAdmin/UserAdmin.tsx';
import { usersReducer } from './store/reducers/reducers.js';
import PodList from './components/PodList';
import NodeList from './components/NodeList';
import Deployments from './components/Deployments.js';
import PersistentVolume from './components/PersistentVolume.js';
import ConfigMap from './components/ConfigMap.js';
import Timezone from './components/TimezoneTest.js';
import TransferList from './components/TransferList.js';


// Create UWF store to pass to the Redux <Provider />
const UWF = window.UWF;

let store = null;
const storeName = 'react-admin';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// check UWF Store name doesn't exist before creating
if (!UWF.Store.exists(storeName)) {
  // mount the middleware on the Store
  store = UWF.Store.create(storeName, usersReducer, sagaMiddleware);
}

// then run the redx-saga
sagaMiddleware.run(rootSaga);

class App extends Component {
  render() {
    return (
      // The <Provider /> makes the Redux store available to any
      // nested components that have been wrapped in the connect() function.
      <Provider store={store}>
        <UserAdmin />
        <PodList />
        <NodeList />
        <Deployments />
        <PersistentVolume />
        <ConfigMap />
      </Provider>
    );
  }
}
export default App;

ReactWebComponent.create(<App />, 'react-user-admin', false);
