import React from 'react';
import { Menu, Image } from 'semantic-ui-react';

class Logo extends React.Component {
  render() {
    return (
      <Menu.Item as='span'>
        <Image
          src={'/assets/images/' + this.props.filename}
          size='medium'
          className='ias-logo'
          centered
        />
      </Menu.Item>
    );
  }
}

export default Logo;
