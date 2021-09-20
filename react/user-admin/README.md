## User Admin

This React user-admin example demonstrates composing reusable components with the help of `react-web-component`, `react-redux`, `@avaya/neo` packages and the `UWF Store`. The root `<Provider />` component makes the UWF store available to any nested components that have been wrapped in the Redux `connect()` function. See `src/index.js` for more details.

In this sample `redux-saga` is also used to demonstrate handling side effects of an async request in our store. See [sagas.js](../react/user-admin/src/sagas/sagas.js)

## Connecting a React component to UWF Store

1. Create an instance of a UWF Store, wrap the root React component in a <Provider /> and pass in the store object.

```javascript
import React, { Component } from 'react';
import ReactWebComponent from 'react-web-component';
import { Provider } from 'react-redux';
import UserAdmin from './UserAdmin/UserAdmin.tsx';
import { usersReducer } from './store/reducers/reducers.js';

// Create UWF store to pass to the Redux <Provider />
const UWF = window.UWF;

var store = null;
const storeName = 'react-admin';

if (!UWF.Store.exists(storeName)) {
  store = UWF.Store.create(storeName, usersReducer);
}

class App extends Component {
  render() {
    return (
      // The <Provider /> makes the Redux store available to any
      // nested components that have been wrapped in the connect() function.
      <Provider store={store}>
        <UserAdmin />
      </Provider>
    );
  }
}
export default App;

ReactWebComponent.create(<App />, 'react-user-admin', false);
```

2. In the container component, connect the component via Redux connect() and
   pass in your `mapStateToProps` and `mapDispatchToProps` functions.

```TSX
import * as _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { addUser, deleteUser, updateUser } from '../store/actions/actions.js';
import Form from './Form/Form';
import Table from './Table/Table';
import Toolbar from './Toolbar/Toolbar';


export class UserAdmin extends React.Component<{},{}> {

  public componentDidMount() {}

  public webComponentAttached() {
    // will be called when the Web Component has been attached
  }

  public render(): JSX.Element {
    // HTML below relies on NEO CSS Framework, which is available in UWF.
    // See NEO documentation for more examples.
    // Elements can subscribe to standard React HTML events.

    return (
      <>
        {this.state.displayUserForm ? (
          <Form
            formFields={[]}
            formTitle={'Add User'}
            formEntity={'User'}
            saveAction={this.props.addUser}
          />
        ) : (
          <div class="neo-widget">
            <Toolbar
              onManageClicked={null}
              viewName={'Users'}
            />
            <Table
              tableHeaders={[]}
              tableData={this.props.users ? this.props.users : []}
              tableTitle={'Users'}
              deleteAction={this.props.deleteUser}
            />
          </div>
        )}
      </>
    );
  }
}

// mapStateToProps is used for selecting the part of the data from the store that the connected component needs
// https://react-redux.js.org/using-react-redux/connect-mapstate#connect-extracting-data-with-mapstatetoprops
const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

// mapDispatchToProps allows you to specify which actions your component might need to dispatch.
// It lets you provide action dispatching functions as props.
// Therefore, instead of calling props.dispatch(() => increment()), you may call props.increment()
// https://react-redux.js.org/using-react-redux/connect-mapdispatch#connect-dispatching-actions-with-mapdispatchtoprops
const mapDispatchToProps = {
  addUser,
  deleteUser,
  updateUser,
};

// The connect() function connects a React component to a Redux store.
// It provides its connected component with the pieces of the data it needs from the store,
// and the functions it can use to dispatch actions to the store.
// https://react-redux.js.org/api/connect
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAdmin);


```

## React User Admin Sample Project Structure

```
   .
   |-build
   |---static
   |-----js (contains the main.js bundle build file)
   |-config
   |---jest (contains the jest and webpack configuration files)
   |-node_modules (npm packages folder)
   |-scripts (contains build scripts invoked to build & test)
   |-src
   |---UserAdmin (contains the React Components and Jest test files)
   |----Form (Re-usable Presentational React component for displaying form fields and dispatching UWF Store actions)
   |----NotificationHandler (Renderless component handles sending notifications based on props values)
   |----Table (Re-usable Presentational component for displaying, sorting & filtering tabular data)
   |----Toolbar (Re-usable Presentational component for displaying table action buttons)
   |----UserAdmin (Container component, connects to UWF store and passes props to children)
   |-index.js (Application Entry point, creates the UWF Store and passes to the root <App> component, also defines the web-component and gives it name.`)
   |-package.json (package registry file)

```

## Installing NPM Packages

[Adding new NPM packages](./docs/installing-npm-packages/installing-new-packages.md)

## Available Scripts

In the project directory, you can run:

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and your widgets are ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
For more information on the Redux and the Flux pattern see [Redux Data Flow](https://redux.js.org/basics/data-flow)
