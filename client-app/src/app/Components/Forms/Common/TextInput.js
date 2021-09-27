import React from 'react';
import { Form, Label } from 'semantic-ui-react';

const TextInput = (props) => {
  return (
    <>
      <Form.Input
        icon={props.icon}
        iconPosition={props.iconPosition}
        error={props.meta.touched && !!props.meta.error}
        type={props.input.type}
        {...props.input}
        placeholder={props.placeholder}
        className={props.className}
        required={props.required}
        disabled={props.disabled}
      ></Form.Input>
      {props.meta.touched && props.meta.error && (
        <Label className='ias-mb-1 ias-rounded' basic color='orange'>
          {props.meta.error}
        </Label>
      )}
    </>
  );
};

export default TextInput;
