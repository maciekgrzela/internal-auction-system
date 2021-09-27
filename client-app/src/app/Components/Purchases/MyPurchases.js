import React, { Component } from 'react';
import httpClient from '../../API/httpClient';
import {
  Grid,
  Card,
  Header,
  Item,
  Container,
  Button,
  Accordion,
  Icon,
} from 'semantic-ui-react';
import consts from '../../Consts/consts.json';
import { FiFrown, FiHome } from 'react-icons/fi';
import ProductListLoading from '../Loaders/ProductListLoading';
import { Link } from 'react-router-dom';

export default class MyPurchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: [],
      loading: true,
    };
  }

  setLoading = (value) => {
    this.setState({
      loading: value,
    });
  };

  setPurchases = (value) => {
    this.setState({
      purchases: value,
    });
  };

  componentDidMount = () => {
    httpClient.Purchases.list()
      .then((response) => {
        let purchases = [];
        console.log(this.props.user);
        response.forEach((purchase) => {
          if (this.props.user.admin === false) {
            if (this.props.user.id === purchase.clientId) {
              purchases.push(purchase);
            }
          } else {
            purchases.push(purchase);
          }
        });
        this.setPurchases(purchases);
      })
      .then(() => {
        this.setLoading(false);
      });
  };

  expandAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const activeIndex = this.state.activeIndex;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({
      activeIndex: newIndex,
    });
  };

  prepareServiceTag = (serviceTag) => {
    return serviceTag !== null ? serviceTag : 'Brak ServiceTag';
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
                          {consts.myPurchases}
                        </span>
                      </Link>
                    </Header>
                  </Card.Header>
                  <Card.Description className='ias-pt-3'>
                    {this.state.purchases.length > 0 ? (
                      <Accordion fluid styled className='ias-rounded'>
                        {this.state.purchases.map((purchase) => (
                          <>
                            <Accordion.Title
                              active={this.state.activeIndex === purchase.id}
                              className='ias-rounded'
                              index={purchase.id}
                              onClick={this.expandAccordion}
                            >
                              <Icon name='dropdown' />
                              {purchase.client.firstName +
                                ' ' +
                                purchase.client.lastName +
                                ', Data: ' +
                                new Date(purchase.created).toLocaleString()}
                            </Accordion.Title>
                            <Accordion.Content
                              active={this.state.activeIndex === purchase.id}
                            >
                              {purchase.items.map((item) => (
                                <Container className='ias-py-3'>
                                  <Grid>
                                    <Grid.Row>
                                      <Item>
                                        <Item.Header>
                                          {item.type.toUpperCase() +
                                            ' ' +
                                            item.name +
                                            ', Producent: ' +
                                            item.producer +
                                            ', ' +
                                            this.prepareServiceTag(
                                              item.serviceTag
                                            ) +
                                            ', ' +
                                            item.quantity +
                                            ' SZT, ' +
                                            item.price +
                                            ' PLN'}
                                        </Item.Header>
                                      </Item>
                                    </Grid.Row>
                                  </Grid>
                                </Container>
                              ))}
                            </Accordion.Content>
                          </>
                        ))}
                      </Accordion>
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
      );
    }
  }
}
