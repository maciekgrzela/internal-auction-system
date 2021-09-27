import React from 'react';
import { Form, Select, Label } from 'semantic-ui-react';

export const DropdownInput = (props) => {
  return (
    <Form.Field
      error={props.touched && !!props.error}
      width={props.width}
      className={props.className}
    >
      <Select
        className={props.className}
        {...props.input}
        onChange={(e, data) => props.input.onChange(data.value)}
        placeholder={props.placeholder}
        options={props.options}
      />
      {props.meta.touched && props.meta.error && (
        <Label className='ias-mt-1 ias-rounded' basic color='orange'>
          {props.meta.error}
        </Label>
      )}
    </Form.Field>
  );
};
