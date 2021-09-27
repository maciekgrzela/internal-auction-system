import React from 'react';
import { Grid, Card, Header, Item, Placeholder } from 'semantic-ui-react';
import ProductLoading from './ProductLoading';
import '../../Styles/App.css';

class ProductListLoading extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Card fluid className='ias-rounded ias-py-1'>
              <Card.Content>
                <Card.Header>
                  <Header
                    as='h1'
                    className='ias-thin ias-title ias-capitalize ias-pt-1 ias-pb-1'
                    dividing
                  >
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line />
                      </Placeholder.Header>
                    </Placeholder>
                  </Header>
                </Card.Header>
                <Card.Description className='ias-pt-3'>
                  <Item.Group divided>
                    <ProductLoading />
                    <ProductLoading />
                    <ProductLoading />
                  </Item.Group>
                </Card.Description>
              </Card.Content>
              <Card.Content textAlign='center'>
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ProductListLoading;
