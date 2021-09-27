import React from 'react';
import { Header, Grid, Card } from 'semantic-ui-react';
import UsersAccount from './UsersAccount';
import AdminsAccount from './AdminsAccount';
import consts from '../../Consts/consts.json';

class Account extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Card fluid className='ias-rounded ias-py-1'>
              <Card.Content className='ias-pb-4'>
                <Card.Header className='ias-pb-2'>
                  <Header
                    as='h1'
                    className='ias-thin ias-title ias-capitalize ias-pt-1'
                    dividing
                  >
                    {consts.userAccount}
                  </Header>
                </Card.Header>
                {this.props.user.admin === true ? (
                  <AdminsAccount />
                ) : (
                  <UsersAccount />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Account;
