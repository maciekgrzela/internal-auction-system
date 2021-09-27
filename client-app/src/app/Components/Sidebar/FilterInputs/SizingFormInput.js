import React from 'react';
import { Grid, Header, Input } from 'semantic-ui-react';

class SizingFormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0,
      width: 0,
      height: 0,
    };
  }

  lengthChange = (e) => {
    this.props.onChangeDevice('length', e.target.value);
  };

  weightChange = (e) => {
    this.props.onChangeDevice('weight', e.target.value);
  };

  heightChange = (e) => {
    this.props.onChangeDevice('height', e.target.value);
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
          <Grid className='ias-px-05'>
            <Grid.Row columns='equal'>
              <Grid.Column>
                <Input
                  fluid
                  className='ias-input-primary'
                  placeholder='Waga'
                  onChange={this.weightChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Input
                  fluid
                  className='ias-input-primary'
                  placeholder='Dlugosc'
                  onChange={this.lengthChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Input
                  fluid
                  className='ias-input-primary'
                  placeholder='Wysokosc'
                  onChange={this.heightChange}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default SizingFormInput;
