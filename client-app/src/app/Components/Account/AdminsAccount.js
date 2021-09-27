import React from 'react';
import { Container } from 'semantic-ui-react';
import AccountSection from './AccountSection';
import '../../Styles/App.css';
import { FiShoppingBag, FiMap, FiGift, FiMapPin } from 'react-icons/fi';

class AdminsAccount extends React.Component {
  render() {
    return (
      <Container fluid>
        <AccountSection
          title='Zarzadzaj produktami'
          options={[
            { name: 'Dodaj produkt', link: 'product/add' },
            { name: 'Usun produkt', link: 'product/remove' },
            { name: 'Modyfikuj dane produktu', link: 'product/modify' },
          ]}
          columns={1}
          icon={<FiGift className='ias-2x' />}
        />
        <AccountSection
          title='Zarzadzaj lokalizacjami'
          options={[
            { name: 'Dodaj lokalizacje', link: 'location/add' },
            { name: 'Usun lokalizacje', link: 'location/remove' },
            { name: 'Modyfikuj dane lokalizacji', link: 'location/modify' },
          ]}
          columns={1}
          icon={<FiMap className='ias-2x' />}
        />
        <AccountSection
          title='Zarzadzaj magazynami'
          options={[
            { name: 'Dodaj magazyn', link: 'storage/add' },
            { name: 'Usun magazyn', link: 'storage/list' },
            { name: 'Modyfikuj dane magazynu', link: 'storage/list' },
          ]}
          columns={1}
          icon={<FiMapPin className='ias-2x' />}
        />
        <AccountSection
          title='Zarzadzaj zakupami'
          options={[{ name: 'Lista zakupow', link: 'purchase/list' }]}
          columns={1}
          icon={<FiShoppingBag className='ias-2x' />}
        />
      </Container>
    );
  }
}

export default AdminsAccount;
