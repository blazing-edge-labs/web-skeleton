import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Radio from '../../components/Radio';
import { alwaysError } from '../../utils/validator';
import css from './style.scss';

const options = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Three', value: 3 },
];

const theSubmitFunction = (values) => {
  // eslint-disable-next-line
  console.log(values)
};

const FormExample = ({ handleSubmit }) => (
  <div className="formContainer">
    <style jsx>{css}</style>
    <h1>H1 Page Title</h1>
    <p>
      Body Text. Short paragraph intro to the page. Generally 2 or more sentences. Now I am just
      trying to fill more space so that I can have two lines. Yay
    </p>
    <p>
      Body Text. Short paragraph intro to the page. Generally 2 or more sentences. Now I am just
      trying to fill more space so that I can have two lines. Yay
    </p>
    <h2>H2 Page Title</h2>
    <p>
      Body Text. Short paragraph intro to the page. Generally 2 or more sentences. Now I am just
      trying to fill more space so that I can have two lines. Yay
    </p>
    <h1>H1 Page Title</h1>
    <h3>H3 Page Title</h3>
    <p>
      Body Text. Short paragraph intro to the page. Generally 2 or more sentences. Now I am just
      trying to fill more space so that I can have two lines. Yay
    </p>
    <h2>Form Example</h2>
    <form onSubmit={handleSubmit(theSubmitFunction)}>
      <Field
        name="errored"
        label="Try not to turn this into an error"
        validate={[alwaysError]}
        component={Input}
      />
      <Field
        name="shortTextInputDisabled"
        label="Disabled Text Input"
        disabled
        component={Input}
      />
      <Field
        name="shortTextInput2"
        label="Input with Placeholder"
        component={Input}
        placeholder="Here is the placeholder"
      />
      <Field
        name="textarea"
        label="Textarea"
        component={Input}
        textarea
        validate={[alwaysError]}
      />
      <Field
        name="textarea--disabled"
        label="Textarea disabled"
        component={Input}
        textarea
        disabled
      />
      <Field
        name="checkbox1"
        label="The Checkbox"
        component={Checkbox}
      />
      <Field
        name="radio1"
        label="Value 1"
        val="value1"
        component={Radio}
      />
      <Field
        name="radio1"
        label="Value 2"
        val="value2"
        component={Radio}
      />
      <Field
        name="select"
        label="Select"
        component={Select}
        options={options}
        validate={[alwaysError]}
      />
      <Field
        name="select disabled"
        label="Select disabled"
        component={Select}
        options={options}
        disabled
        value={1}
      />
      <Button disabled>Useless</Button>
      <Button>Test</Button>
    </form>
  </div>
);

FormExample.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default connect(() => ({
  initialValues: {
    shortTextInputDisabled: 'Ready only value',
  },
}))(reduxForm({
  form: 'formExample',
})(FormExample));
