import React from 'react';
import { Checkbox, Label } from 'semantic-ui-react';

export const ToggleInput = (props) => {
  return (
    <>
      <Checkbox
        toggle
        error={props.meta.touched && !!props.meta.error}
        width={props.width}
        className={props.className}
        {...props.input}
        onChange={(e, { checked }) => {
          if (props.input.value === undefined) {
            props.input.onChange(checked);
          }
        }}
      ></Checkbox>
      {props.meta.touched && props.meta.error && (
        <Label className='ias-mb-1 ias-rounded' basic color='orange'>
          {props.meta.error}
        </Label>
      )}
    </>
  );
};
