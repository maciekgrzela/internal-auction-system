import React, { Component } from 'react';
import httpClient from '../../API/httpClient';
import ProductListLoading from '../Loaders/ProductListLoading';
import Storage from './Storage';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  Header,
  Container,
  Segment,
  Item,
  Button,
} from 'semantic-ui-react';
import consts from '../../Consts/consts.json';
import { FiFrown, FiHome } from 'react-icons/fi';

export default class ListStorage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMessage: null,
      loading: true,
      storages: [],
    };
  }

  setLoading = (value) => {
    this.setState({
      loading: value,
    });
  };

  setStorages = (value) => {
    this.setState({
      storages: value,
    });
  };

  setStatusMessage = (value) => {
    this.setState({
      statusMessage: value,
    });
  };

  componentDidMount = () => {
    httpClient.Storages.list()
      .then((response) => {
        let storages = [];
        response.forEach((storage) => {
          storages.push(storage);
        });
        this.setStorages(storages);
      })
      .then((response) => {
        this.setLoading(false);
      });
  };

  handleRemoveSuccess = (id) => {
    const indexToDelete = this.state.storages.findIndex(
      (storage) => storage.id === id
    );
    let tempStorages = this.state.storages;
    tempStorages.splice(indexToDelete, 1);
    this.setStorages(tempStorages);
  };

  handleRemoveError = (error) => {
    this.setStatusMessage(error);
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
                          {consts.storages}
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
                      {this.state.storages.length > 0 ? (
                        <Item.Group divided>
                          {this.state.storages.map((storage) => (
                            <Storage
                              key={storage.id}
                              handleRemoveError={this.handleRemoveError}
                              handleRemoveSuccess={this.handleRemoveSuccess}
                              storage={storage}
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
