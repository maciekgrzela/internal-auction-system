import React from 'react';
import {
  Grid,
  Card,
  Header,
  Container,
  Segment,
  Button,
  Item,
} from 'semantic-ui-react';
import consts from '../../../Consts/consts.json';
import httpClient from '../../../API/httpClient';
import { FiFrown, FiHome } from 'react-icons/fi';
import ProductListLoading from '../../Loaders/ProductListLoading';
import { ProductBrief } from '../ProductBrief';
import { Link } from 'react-router-dom';

class RemoveProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMessage: null,
      products: [],
      loading: true,
    };
  }

  setStatusMessage = (message) => {
    this.setState({
      statusMessage: message,
    });
  };

  setProducts = (productList) => {
    this.setState({
      products: productList,
    });
  };

  setLoading = (value) => {
    this.setState({
      loading: value,
    });
  };

  handleRemoveError = (error) => {
    this.setStatusMessage(error);
  };

  handleRemoveSuccess = (id) => {
    const indexToDelete = this.state.products.findIndex(
      (product) => product.id === id
    );
    let tempProducts = this.state.products;
    tempProducts.splice(indexToDelete, 1);
    this.setProducts(tempProducts);
  };

  componentDidMount = () => {
    httpClient.Devices.list()
      .then((response) => {
        let devices = [];
        response.forEach((device) => {
          devices.push(device);
        });
        this.setProducts(devices);
      })
      .then(() => {
        this.setLoading(false);
      });
  };

  render() {
    if (this.state.loading === true) {
      return <ProductListLoading />;
    } else {
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
                      <Link
                        to='/account'
                        className='ias-flex ias-flex-ai-center'
                      >
                        <Button className='ias-mr-1 ias-white-bg ias-orange-fg ias-orange-border ias-rounded'>
                          <FiHome />
                        </Button>
                        <span className='ias-capitalize'>
                          {consts.removeProduct}
                        </span>
                      </Link>
                    </Header>
                  </Card.Header>
                  <Card.Description className='ias-pt-3'>
                    <Container fluid className='ias-py-3'>
                      {this.state.statusMessage !== null ? (
                        <Segment color='orange' className='ias-rounded'>
                          {this.state.statusMessage}
                        </Segment>
                      ) : (
                        <></>
                      )}
                      {this.state.products.length > 0 ? (
                        <Item.Group divided>
                          {this.state.products.map((product) => (
                            <ProductBrief
                              product={product}
                              removeMode={true}
                              handleRemoveError={this.handleRemoveError}
                              handleRemoveSuccess={this.handleRemoveSuccess}
                            />
                          ))}
                        </Item.Group>
                      ) : (
                        <Container textAlign='center'>
                          <FiFrown size={100} />
                          <Header as='p' className='ias-mb-3 ias-mt-1'>
                            {consts.notFound}
                          </Header>
                        </Container>
                      )}
                    </Container>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
  }
}

export default RemoveProduct;
