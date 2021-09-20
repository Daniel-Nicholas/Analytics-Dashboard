import * as _ from 'lodash';
import React from 'react';

interface IToolbarProps {
  viewName: string;
  onAddClicked: any;
  onManageClicked: any;
}

class Toolbar extends React.Component<IToolbarProps> {
  constructor(props: IToolbarProps) {
    super(props);
  }

  public componentDidMount() {
    // Regular React lifecycle method
  }

  public webComponentAttached() {
    // will be called when the Web Component has been attached
  }

  public handleAdd = (e: Event) => {
    // bubble up event to parent
    event.preventDefault();
    this.props.onAddClicked(e);
  };

  public handleManage = (e: Event) => {
    // bubble up event to parent
    event.preventDefault();
  };

  public render(): JSX.Element {
    // HTML below relies on NEO CSS Framework, which is available in UWF.
    // See NEO documentation for more examples.
    // Elements can subscribe to standard React HTML events.

    return (
      <div class="row" style={this.styles.indentedRowStyle}>
        <div class="grid--medium-6">
          <button
            style={this.styles.button}
            disabled={this.props.onAddClicked ? false : true}
            class="neo-btn neo-btn--primary neo-icon-add"
            onClick={(e) => this.handleAdd(e)}>
            Add {this.props.viewName}
          </button>
          <button
            disabled={this.props.onManageClicked ? false : true}
            class="neo-btn neo-btn--secondary neo-icon-add"
            onClick={(e) => this.handleManage(e)}>
            Manage {this.props.viewName}
          </button>
        </div>
      </div>
    );
  }
  public readonly styles = {
    indentedRowStyle: {
      marginTop: '5px',
      marginLeft: '5px',
    },
    button: {
      margin: '10px',
    },
  };
}
export default Toolbar;
