import * as _ from 'lodash';
import React from 'react';

interface IFieldProps {
  fieldName: string;
  required: boolean;
  options?: string[];
}
interface IFormProps {
  formFields: IFieldProps[];
  formTitle: string;
  formEntity: string;
  saveAction: any;
  onFormSubmit: any;
}

interface IFormState {
  formData: object;
  multiValueFields: object[];
}

class Form extends React.Component<IFormProps, IFormState> {
  public initialState = {
    formData: {},
    multiValueFields: [{}],
  } as IFormState;
  public state: IFormState = this.initialState;

  constructor(props: IFormProps) {
    super(props);
  }

  public disconnectedCallback() {}

  public setMultivalueFieldsDefaults = (formFields: IFieldProps[]) => {
    // Get fields with options values
    const multiValueFields: IFieldProps[] = formFields.filter(
      (field) => field.options && field.options.length,
    );
    const defaultMultivalueFieldObjects: object[] = multiValueFields.map(
      (field) => ({ [field.fieldName]: field.options[0] }),
    );
    // Merge into single object
    const defaultMultivalueFieldState: object = _.assign.apply(
      _,
      defaultMultivalueFieldObjects,
    );

    // Initialise the multi value form fields
    // with default state value
    this.setState({ formData: defaultMultivalueFieldState });
  };

  public componentDidMount() {
    // Regular React lifecycle method

    // Add default value for any field.options fields
    this.setMultivalueFieldsDefaults(this.props.formFields);
  }

  public webComponentAttached() {
    // will be called when the Web Component has been attached
  }

  public handleChange = (e: Event, field: string) => {
    const element = e.target as HTMLInputElement;
    const newValue: string = element.value;

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [field]: newValue,
      },
    }));
  };

  public handleSubmit = (e: Event) => {
    e.preventDefault();
    // Get form values and dispatch payload to store
    const formData = this.state.formData;

    this.props.saveAction(formData);
    // reset the form state
    this.setState(this.initialState);
    this.props.onFormSubmit(e);
  };

  public handleCancel = (e: Event) => {
    e.preventDefault();
    this.props.onFormSubmit(e);
  };

  public render(): JSX.Element {
    // HTML below relies on NEO CSS Framework, which is available in UWF.
    // See NEO documentation for more examples.
    // Elements can subscribe to standard React HTML events.

    const formFields =
      this.props.formFields.length > 0 &&
      this.props.formFields.map((field, index) => (
        <div style={this.styles.gridColumns}>
          <label
            for={`input-${field.fieldName}`}
            aria-label={field.fieldName}
            style={this.styles.gridColumnsLabelRight}>
            {_.startCase(field.fieldName)}:
          </label>
          <div>
            {field.options && field.options.length ? (
              <div class="neo-select">
                <select
                  class="neo-input"
                  aria-label="select-option"
                  role="listbox"
                  aria-multiselectable="false"
                  onChange={(e) => this.handleChange(e, field.fieldName)}>
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex} role="option">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <input
                class="neo-input"
                id={`input-${field}`}
                placeholder={_.startCase(field.fieldName)}
                aria-label={_.startCase(field.fieldName)}
                role="textbox"
                onChange={(e) => this.handleChange(e, field.fieldName)}
                required={field.required}
              />
            )}
          </div>
        </div>
      ));

    return (
      <div class="neo-widget neo-widget--flat" style={this.styles.mediumWidth}>
        <div class="neo-widget__header neo-icon-add">{this.props.formTitle}</div>
        <div class="neo-widget__content neo-widget__content--indented">
          {formFields}
        </div>
        <div class="neo-widget__footer">
          <div style={this.styles.buttonGroup}>
            <button
              class="neo-btn neo-btn neo-btn--secondary neo-icon-end"
              onClick={(e) => this.handleCancel(e)}>
              Cancel
            </button>
            <span style={this.styles.buttonGroupPadding} />
            <button
              class="neo-btn neo-btn--primary"
              onClick={(e) => this.handleSubmit(e)}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
  // inline styles for NEO elements
  public readonly styles = {
    mediumWidth: {
      width: '80%',
    },
    gridColumns: {
      display: 'grid',
      gridAutoFlow: 'column',
      gridGap: '10px',
      justifyContent: 'start',
      fontWeight: 'bold',
    },
    gridColumnsLabelRight: {
      minWidth: '100px',
      textAlign: 'end',
    },
    buttonGroup: {
      float: 'right',
    },
    buttonGroupPadding: {
      marginLeft: '30px',
    },
  };
}
export default Form;
