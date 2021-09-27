import React from 'react';
import { Button, Card, Grid, Header, Item } from 'semantic-ui-react';
import consts from '../../Consts/consts.json';
import ProductToBuy from './ProductToBuy';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  state = { open: false };

  clearAll = () => {
    this.props.clearAll();
  };

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
                    className='ias-thin ias-title ias-capitalize ias-pt-1'
                    dividing
                  >
                    {consts.yourBasket}
                  </Header>
                </Card.Header>

                <Card.Description className='ias-pt-3'>
                  <Item.Group divided>
                    {this.props.products.map((product) => (
                      <ProductToBuy
                        key={`${product.id} ${product.type}`}
                        product={product}
                        currency={this.props.currency}
                        handleNewAmount={this.props.handleNewAmount}
                        deleteProductFromBasket={
                          this.props.deleteProductFromBasket
                        }
                      />
                    ))}
                  </Item.Group>
                  <Header
                    as='h1'
                    className='ias-thin ias-capitalize ias-pt-1 ias-orange-fg'
                    dividing
                  >
                    <p className='right'>
                      {consts.sumUp} {this.props.totalPrice.toFixed(2)}
                      {this.props.currency}
                    </p>
                  </Header>
                  <br /> <br />
                  <Button
                    className='ias-mx-1 ias-white-fg ias-rounded center ias-shadow'
                    color='red'
                    size='medium'
                    floated='right'
                    onClick={this.clearAll}
                    disabled={this.props.invoiceDisabled}
                  >
                    <p className='up'> {consts.clearTheBasket} </p>
                  </Button>
                  <Button
                    className='ias-mx-1 ias-rounded ias-orange-bg ias-white-fg ias-shadow'
                    size='medium'
                    floated='left'
                    disabled={this.props.invoiceDisabled}
                  >
                    <Link to='/invoice' className='ias-inverted up'>
                      <p className='up'> {consts.buy} </p>
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
}

export default Cart;
