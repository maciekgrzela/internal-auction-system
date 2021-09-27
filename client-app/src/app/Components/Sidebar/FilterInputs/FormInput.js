import React from 'react';
import { Grid, Header, Input } from 'semantic-ui-react';

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChange = (e) => {
    this.props.onChangeDevice(this.props.deviceProp, e.target.value);
  };

  render() {
    return (
      <Grid.Row className='ias-px-05'>
        <Grid.Column width={3} verticalAlign='middle'>
          <Header as='label' width={3} className='ias-capitalize'>
            {this.props.title}
          </Header>
        </Grid.Column>
        <Grid.Column width={13}>
          <Input
            fluid
            placeholder={this.props.placeholder}
            className='ias-input-primary'
            onInput={this.onChange}
          />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default FormInput;
