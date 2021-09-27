import React from 'react';
import { Menu, Input } from 'semantic-ui-react';

class SearchInput extends React.Component {
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.onChangeFilter(this.props.filterProp, e.target.value, true);
    }
  };

  onChange = (e) => {
    this.props.onChangeFilter(this.props.filterProp, e.target.value);
  };

  render() {
    return (
      <Menu.Item as='span'>
        <Input
          placeholder={this.props.placeholder}
          size='large'
          className='ias-input-primary ias-rounded'
          onInput={this.onChange}
          onKeyPress={this.handleKeyDown}
        />
      </Menu.Item>
    );
  }
}

export default SearchInput;
