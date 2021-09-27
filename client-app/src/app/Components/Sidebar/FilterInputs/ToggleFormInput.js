import React from 'react';
import { Grid, Header, Checkbox } from 'semantic-ui-react';

class ToggleFormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onClick = (e, data) => {
    this.props.onChangeDevice(this.props.deviceProp, data.checked);
  };

  render() {
    return (
      <Grid.Row className='ias-px-05'>
        <Grid.Column width={3}>
          <Header as='label' width={3} className='ias-capitalize'>
            {this.props.title}
          </Header>
        </Grid.Column>
        <Grid.Column width={13}>
          <Checkbox
            toggle
            onClick={this.onClick}
            className='ias-input-primary'
          />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default ToggleFormInput;
