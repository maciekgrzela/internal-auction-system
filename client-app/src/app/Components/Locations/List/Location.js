import React, { Component } from 'react';
import { Item, Grid, Header, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import consts from '../../../Consts/consts.json';
import httpClient from '../../../API/httpClient';
import { FiTrash2, FiEdit } from 'react-icons/fi';

export default class Location extends Component {
  handleRemove = () => {
    httpClient.Locations.delete(this.props.location.id)
      .then((response) => {
        this.props.handleRemoveSuccess(this.props.location.id);
      })
      .catch((error) => {
        if (error.response) {
          this.props.handleRemoveError(
            consts.prompts.removeLocation.error.client
          );
        }
      });
  };

  render() {
    return (
      <Item>
        <Item.Image
          className='ias-p-2 ias-mr-2'
          src={'/assets/images/location.svg'}
        />
        <Item.Content className='ias-pt-1'>
          <Item.Header className='ias-orange-fg'>
            {this.props.location.street + ' ' + this.props.location.number}
          </Item.Header>
          <Item.Meta></Item.Meta>
          <Item.Description>
            <Grid>
              <Grid.Row verticalAlign='middle'>
                <Grid.Column width={12}>
                  <Header.Subheader>
                    <b className='ias-capitalize ias-pr-1'>{consts.city}</b>
                    {this.props.location.city}
                  </Header.Subheader>
                  <Header.Subheader>
                    <b className='ias-capitalize ias-pr-1'>
                      {consts.postalCode}
                    </b>
                    {this.props.location.postalCode}
                  </Header.Subheader>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column textAlign='center'>
                        <Button
                          color='red'
                          className='ias-rounded ias-capitalize ias-thin ias-shadow ias-mb-1'
                          onClick={this.handleRemove}
                        >
                          <Container
                            fluid
                            className='ias-flex ias-flex-ai-center'
                          >
                            <span className='ias-pr-1'>
                              {consts.removeLocation}
                            </span>
                            <FiTrash2 />
                          </Container>
                        </Button>
                        <Link
                          to={{
                            pathname: `/location/edit/${this.props.location.id}`,
                            state: {
                              location: this.props.location,
                            },
                          }}
                        >
                          <Button className='ias-orange-bg ias-white-fg ias-mb-1 ias-rounded ias-capitalize ias-thin ias-shadow'>
                            <Container
                              fluid
                              className='ias-flex ias-flex-ai-center'
                            >
                              <span className='ias-pr-1'>
                                {consts.modifyLocation}
                              </span>
                              <FiEdit />
                            </Container>
                          </Button>
                        </Link>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}
