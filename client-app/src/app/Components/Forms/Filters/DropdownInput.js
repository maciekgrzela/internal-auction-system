import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

class DropdownInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChange = (e, data) => {
    this.props.onChangeFilter(this.props.filterProp, data.value);
  };

  render() {
    return (
      <Menu.Item as='span'>
        <Dropdown
          className='ias-input-primary ias-rounded ias-dropdown'
          placeholder={this.props.placeholder}
          fluid
          multiple
          selection
          onChange={this.onChange}
          options={this.props.options}
        />
      </Menu.Item>
    );
  }
}

export default DropdownInput;
