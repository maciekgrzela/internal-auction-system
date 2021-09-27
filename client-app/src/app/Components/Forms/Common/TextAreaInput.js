import React from 'react';
import { Form, Label } from 'semantic-ui-react';

export const TextAreaInput = (props) => {
  return (
    <>
      <Form.Input
        error={props.meta.touched && !!props.meta.error}
        width={props.width}
        className={props.className}
      >
        <textarea
          rows={props.rows}
          {...props.input}
          placeholder={props.placeholder}
        />
      </Form.Input>
      {props.meta.touched && props.meta.error && (
        <Label className='ias-mb-1 ias-rounded' basic color='orange'>
          {props.meta.error}
        </Label>
      )}
    </>
  );
};
