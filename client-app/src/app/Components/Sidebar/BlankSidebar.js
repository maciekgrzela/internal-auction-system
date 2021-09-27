import React from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import Logo from '../Logo/Logo';

export const BlankSidebar = () => {
  return (
    <Sidebar.Pusher>
      <Sidebar
        as={Menu}
        animation='push'
        direction='left'
        icon='labeled'
        visible={true}
        vertical
        width='thin'
      >
        <Logo filename='logo.svg' />
      </Sidebar>
    </Sidebar.Pusher>
  );
};

export default BlankSidebar;
