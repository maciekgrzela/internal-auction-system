import React, { Component } from 'react';
import httpClient from '../../../API/httpClient';
import ProductListLoading from '../../Loaders/ProductListLoading';
import Location from './Location';
import {
  Grid,
  Card,
  Header,
  Container,
  Button,
  Segment,
  Item,
} from 'semantic-ui-react';
import consts from '../../../Consts/consts.json';
import { FiFrown, FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default class ListLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMessage: null,
      loading: true,
      locations: [],
    };
  }

  setLoading = (value) => {
    this.setState({
      loading: value,
    });
  };

  setLocations = (value) => {
    this.setState({
      locations: value,
    });
  };

  setStatusMessage = (value) => {
    this.setState({
      statusMessage: value,
    });
  };

  componentDidMount = () => {
    httpClient.Locations.list()
      .then((response) => {
        let locations = [];
        response.forEach((location) => {
          locations.push(location);
        });
        this.setLocations(locations);
      })
      .then((response) => {
        this.setLoading(false);
      });
  };

  handleRemoveSuccess = (id) => {
    const indexToDelete = this.state.locations.findIndex(
      (location) => location.id === id
    );
    let tempLocations = this.state.locations;
    tempLocations.splice(indexToDelete, 1);
    this.setLocations(tempLocations);
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
                          {consts.locations}
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
                      {this.state.locations.length > 0 ? (
                        <Item.Group divided>
                          {this.state.locations.map((location) => (
                            <Location
                              key={location.id}
                              handleRemoveError={this.handleRemoveError}
                              handleRemoveSuccess={this.handleRemoveSuccess}
                              location={location}
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
