import React from 'react';
import { Menu, Grid, Checkbox } from 'semantic-ui-react';

class ToggleFilter extends React.Component {
  onChange = (e, data) => {
    if (data.checked === false) {
      data.checked = null;
    }
    this.props.onChangeFilter(this.props.filterProp, data.checked);
  };
  render() {
    return (
      <Menu.Item as='span'>
        <Grid container>
          <Grid.Row
            columns={2}
            textAlign='left'
            className='ias-checkbox-toggle-caption'
          >
            <Grid.Column>
              <p>{this.props.title}</p>
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                toggle
                defaultChecked={this.props.checked}
                onChange={this.onChange}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Menu.Item>
    );
  }
}

export default ToggleFilter;
