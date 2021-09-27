import React from 'react';
import { Grid, Header, Dropdown } from 'semantic-ui-react';

class DropdownFormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChange = (e, data) => {
    this.props.onChangeDevice(this.props.deviceProp, data.value.toString());
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
          <Dropdown
            placeholder={this.props.placeholder}
            fluid
            selection
            className='ias-input-primary ias-rounded'
            options={this.props.options}
            onChange={this.onChange}
          />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default DropdownFormInput;
