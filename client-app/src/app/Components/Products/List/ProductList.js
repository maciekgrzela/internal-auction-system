import React from 'react';
import {
  Grid,
  Card,
  Header,
  Item,
  Container,
  Modal,
  Button,
  Icon,
} from 'semantic-ui-react';
import Product from './Product';
import ProductListLoading from '../../Loaders/ProductListLoading';
import httpClient from '../../../API/httpClient';
import consts from '../../../Consts/consts.json';
import { FiFrown } from 'react-icons/fi';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };
    this.filterString = this.props.filterString;
  }

  alreadyFiltered = false;
  filterString = null;

  setDevicesWithFilters = (filter) => {
    this.setLoading(true);
    httpClient.Devices.listWithFilters(filter)
      .then((response) => {
        let devices = [];
        response.forEach((device) => {
          if (device.quantity > 0) {
            devices.push(device);
          }
        });
        this.setDevices(devices);
      })
      .then(() => this.setLoading(false));
  };

  setLoading = (load) => {
    this.setState({
      loading: load,
    });
  };

  setDevices = (devices) => {
    this.setState({
      products: devices,
    });
  };

  setOutOfQuantity = () => {
    this.props.setOutOfQuantity();
  };

  componentDidMount() {
    this.props.clearNavbar();
    httpClient.Devices.list()
      .then((response) => {
        let devices = [];
        response.forEach((device) => {
          if (device.quantity > 0) {
            devices.push(device);
          }
        });
        this.setDevices(devices);
      })
      .then(() => this.setLoading(false));
  }

  render() {
    if (this.filterString !== this.props.filterString) {
      this.filterString = this.props.filterString;
      this.alreadyFiltered = false;
    }
    if (this.filterString !== null && this.alreadyFiltered === false) {
      this.setDevicesWithFilters(this.filterString);
      this.alreadyFiltered = true;
    }
    if (this.state.loading === true) {
      return <ProductListLoading />;
    } else {
      return (
        <>
          {this.props.outOfQuantity === true ? (
            <Modal open={this.props.outOfQuantity} basic size='small'>
              <Header
                className='ias-3x ias-capitalize ias-thin'
                icon='archive'
                content='Dostepna ilosc'
              />
              <Modal.Content>
                <p className='ias-bold ias-2x'>
                  Ilość sztuk produktu, którą chcesz zakupić przekracza dostępne
                  zasoby magazynowe. Wybierz inny produkt. Jeżeli jesteś
                  zainteresowany zakupem większej ilości sztuk tego produktu,
                  wyślij zapytanie z wykorzystaniem formularza kontaktowego
                </p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  basic
                  className='ias-rounded'
                  color='orange'
                  onClick={this.setOutOfQuantity}
                  inverted
                >
                  <Icon name='checkmark' /> Rozumiem
                </Button>
              </Modal.Actions>
            </Modal>
          ) : (
            <></>
          )}
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
                        {consts.availableDevices}
                      </Header>
                    </Card.Header>
                    <Card.Description className='ias-pt-3'>
                      {this.state.products.length > 0 ? (
                        <Item.Group divided>
                          {this.state.products.map((product) =>
                            product.quantity > 0 ? (
                              <Product
                                key={`${product.id} ${product.type}`}
                                user={this.props.user}
                                product={product}
                                cart={this.props.cart}
                                currency={this.props.currency}
                                change={this.props.globalChange}
                              />
                            ) : (
                              <></>
                            )
                          )}
                        </Item.Group>
                      ) : (
                        <Container textAlign='center'>
                          <FiFrown size={100} />
                          <Header as='p' className='ias-mb-3 ias-mt-1'>
                            {consts.notFound}
                          </Header>
                        </Container>
                      )}
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      );
    }
  }
}

export default ProductList;
