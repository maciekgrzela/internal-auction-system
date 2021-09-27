import React from 'react';
import { Container } from 'semantic-ui-react';
import AccountSection from './AccountSection';
import { FiFileText, FiMessageSquare } from 'react-icons/fi';

class Logo extends React.Component {
  render() {
    return (
      <Container fluid>
        <AccountSection
          title='Przegladaj zakupy'
          options={[
            { name: 'Moje zrealizowane zakupy', link: 'purchase/list' },
          ]}
          columns={1}
          icon={<FiFileText className='fa-2x' />}
        />
        <AccountSection
          title='Zarzadzaj zapytaniami'
          options={[{ name: 'Zapytaj o sprzet', link: 'contact' }]}
          columns={1}
          icon={<FiMessageSquare className='fa-2x' />}
        />
      </Container>
    );
  }
}

export default Logo;
