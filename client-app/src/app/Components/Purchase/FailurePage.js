import React from 'react';
import { Header, Card, Grid, Button } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import consts from '../../Consts/consts.json';
import '../../Styles/App.css';
import { Link } from 'react-router-dom';

function FailurePage() {
  let errorMessage = useLocation().state.errorMessage;
  return (
    <Grid>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Card fluid className='ias-rounded ias-py-1'>
            <Card.Content>
              <Card.Header>
                <Header
                  as='h1'
                  className='ias-thin ias-title ias-capitalize ias-pt-1'
                  dividing
                >
                  {consts.failure}
                </Header>
              </Card.Header>
              <p className='center ias-2x ias-orange-fg ias-m-1'>
                {consts.failureText}
              </p>
              <p className='center ias-m-1'>Opis problemu: {errorMessage}</p>

              <Card.Description className='ias-pt-3'>
                <Button
                  className='ias-mx-1 ias-orange-bg ias-white-fg ias-shadow ias-rounded'
                  size='medium'
                >
                  <Link to='/' className='ias-inverted up'>
                    {consts.back}
                  </Link>
                </Button>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default FailurePage;
