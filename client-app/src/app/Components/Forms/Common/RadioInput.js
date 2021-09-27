import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

export const RadioInput = (props) => {
  const [value, setValue] = useState(props.defaultValue);

  return (
    <>
      <Form.Field width={props.width} className={props.className}>
        <Form.Group inline>
          {props.options.map((option) => (
            <Form.Radio
              key={option.key}
              label={option.label}
              value={option.value}
              checked={value === option.value}
              onChange={(e, { value }) => {
                setValue(value);
                props.setDeviceType(value);
              }}
            />
          ))}
        </Form.Group>
      </Form.Field>
    </>
  );
};
