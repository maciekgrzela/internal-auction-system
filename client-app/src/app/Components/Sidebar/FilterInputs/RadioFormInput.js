import React from 'react';
import { Grid, Header, Form } from 'semantic-ui-react';

class RadioFormInput extends React.Component {
  render() {
    return (
      <Grid.Row className='ias-px-05'>
        <Grid.Column width={3}>
          <Header as='label' width={3} className='ias-capitalize'>
            {this.props.title}
          </Header>
        </Grid.Column>
        <Grid.Column width={13} verticalAlign='middle'>
          <Form.Group inline>
            {this.props.radios.map((radio) => (
              <Form.Radio
                label={radio.label}
                value={radio.value}
                checked={this.props.device.type === radio.value}
                onChange={() => {
                  this.props.onChangeDevice(this.props.deviceProp, radio.value);
                }}
              />
            ))}
          </Form.Group>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default RadioFormInput;
