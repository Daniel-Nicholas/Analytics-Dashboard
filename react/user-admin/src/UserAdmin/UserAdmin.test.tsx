import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Table from './Table/Table';
import Toolbar from './Toolbar/Toolbar';
import { UserAdmin } from './UserAdmin';

// Mock component's props functions
const onAddClicked = () => {};

describe('UserAdmin component', () => {
  it('renders a Toolbar and Table by default', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <UserAdmin
        users={[]}
        usersTotal={0}
        notification={{}}
        addUser={{}}
        deleteUser={{}}
        updateUser={{}}
      />,
    );
    const result = renderer.getRenderOutput();

    // See: https://github.com/facebook/jest/issues/5998#issuecomment-381442719
    expect(JSON.stringify(result.props.children[1])).toEqual(
      JSON.stringify(
        <div class="neo-widget" style={{ height: '100%', overflow: 'auto' }}>
          <Toolbar
            onManageClicked={null}
            onAddClicked={onAddClicked}
            viewName="User"
          />
          <Table
            tableHeaders={['firstName', 'lastName', 'email', 'role']}
            tableData={[]}
            totalRows={0}
            tableTitle="Users"
            deleteAction={{}}
          />
        </div>,
      ),
    );
  });
});
