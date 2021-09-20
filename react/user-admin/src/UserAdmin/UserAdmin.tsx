import * as _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { addUser, deleteUser, updateUser } from '../store/actions/actions.js';
import { getUserCount } from '../store/selectors/selector.js';
import Form from './Form/Form';
import NotificationHandler from './NotificationHandler/NotificationHandler';
import Table from './Table/Table';
import Toolbar from './Toolbar/Toolbar';

interface IUserAdminState {
  displayUserForm: boolean;
}

interface IUserAdminProps {
  users: object[];
  usersTotal: number;
  notification?: object;
  addUser: any;
  deleteUser: any;
  updateUser: any;
}

export class UserAdmin extends React.Component<
  IUserAdminProps,
  IUserAdminState
> {
  // Create instance of UWF Notification API
  // @ts-ignore
  private notificationAPI = UWF.API.Notification.init();

  public initialState = {
    displayUserForm: false,
    pods: [], 
    pods2: "String",
    person: null

  } as IUserAdminState;

  public state: IUserAdminState = this.initialState;

  public disconnectedCallback() {
    this.notificationAPI.unregister();
  }

  public componentDidMount() {
      console.log("#### ORCA componentDidMount !!!! #####");
      
      // fetch('http://jsonplaceholder.typicode.com/users')
      // fetch('http://localhost:3080/api/pods')
      fetch('https://api.randomuser.me/')
      .then(res => res.json())
      .then((data) => {
        console.log("#### ORCA Received data !!!! #####");
        console.log(data);
        // this.setState((prevState) => ({
        //   pods2: "!prevState.displayUserForm",
        // }));
        // this.setState({ pods: data });
        // this.setState({ pods2: "hello" });
        // this.setState({ displayUserForm: true });
        this.setState({ person: data.results[0]});
      })
      .catch(console.log)
  }

  public webComponentAttached() {
    console.log("#### webComponentAttached !!!! #####");

    // will be called when the Web Component has been attached
  }

  public toggleFormDisplay = (e: Event) => {
    this.setState((prevState) => ({
      displayUserForm: !prevState.displayUserForm,
    }));
  };

  public render(): JSX.Element {
    // HTML below relies on NEO CSS Framework, which is available in UWF.
    // See NEO documentation for more examples.
    // Elements can subscribe to standard React HTML events.
    const tableHeaders = ['firstName', 'lastName', 'email', 'role'];
    const tableTitle = 'Users';
    const formFields = [
      { fieldName: 'firstName', required: true },
      { fieldName: 'lastName', required: true },
      { fieldName: 'email', required: true },
      {
        fieldName: 'role',
        required: true,
        options: ['admin', 'supervisor'],
      },
    ];
    const viewEntity = 'User';

    const notificationHandler = this.props.notification ? (
      <NotificationHandler notification={this.props.notification} />
    ) : null;

    return (
      <>
        {notificationHandler}
        {this.state.displayUserForm ? (
          <Form
            formFields={formFields}
            formTitle={'Add User'}
            formEntity={viewEntity}
            saveAction={this.props.addUser}
            onFormSubmit={(e) => this.toggleFormDisplay(e)}
          />
        ) : (
          <div class="neo-widget" style={this.styles.widgetContainer}>
            <Toolbar
              onAddClicked={(e) => this.toggleFormDisplay(e)}
              onManageClicked={null}
              viewName={viewEntity}
            />
            <Table
              tableHeaders={tableHeaders}
              tableData={this.props.users ? this.props.users : []}
              totalRows={this.props.usersTotal ? this.props.usersTotal : 0}
              tableTitle={tableTitle}
              deleteAction={this.props.deleteUser}
            />
          </div>
        )}
      </>
    );
  }

  // inline styles for NEO elements
  public readonly styles = {
    widgetContainer: {
      height: '100%',
      overflow: 'auto',
    },
  };
}

// mapStateToProps is used for selecting the part of the data from the store that the connected component needs
// https://react-redux.js.org/using-react-redux/connect-mapstate#connect-extracting-data-with-mapstatetoprops
const mapStateToProps = (state) => {
  return {
    users: state.users,
    // example UWF selector to compute derived data from state
    // https://github.com/reduxjs/reselect
    usersTotal: getUserCount(state),
    notification: state.notification,
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
