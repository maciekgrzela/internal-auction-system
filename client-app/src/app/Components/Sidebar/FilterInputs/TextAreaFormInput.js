import React from 'react';
import { Grid, Header, TextArea } from 'semantic-ui-react';

class TextAreaFormInput extends React.Component {
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
        <Grid.Column width={3} verticalAlign='top'>
          <Header as='label' width={3} className='ias-capitalize'>
            {this.props.title}
          </Header>
        </Grid.Column>
        <Grid.Column width={13}>
          <TextArea
            fluid
            className='ias-input-primary'
            placeholder={this.props.placeholder}
            onChange={this.onChange}
          />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default TextAreaFormInput;
