import React, { Component } from 'react';
import { Item, Grid, Header, Button, Container } from 'semantic-ui-react';
import consts from '../../Consts/consts.json';
import httpClient from '../../API/httpClient';
import { Link } from 'react-router-dom';
import { FiTrash2, FiEdit } from 'react-icons/fi';

export default class Storage extends Component {
  handleRemove = () => {
    httpClient.Storages.delete(this.props.storage.id)
      .then((response) => {
        this.props.handleRemoveSuccess(this.props.storage.id);
      })
      .catch((error) => {
        if (error.response) {
          this.props.handleRemoveError(
            consts.prompts.removeStorage.error.client
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
            {`Magazyn ${this.props.storage.name}`}
          </Item.Header>
          <Item.Meta></Item.Meta>
          <Item.Description>
            <Grid>
              <Grid.Row verticalAlign='middle'>
                <Grid.Column width={12}>
                  <Header.Subheader>
                    <b className='ias-capitalize ias-pr-1'>
                      {consts.description}
                    </b>
                    {this.props.storage.description}
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
                              {consts.removeStorage}
                            </span>
                            <FiTrash2 />
                          </Container>
                        </Button>
                        <Link
                          to={{
                            pathname: `/storage/modify/${this.props.storage.id}`,
                            state: {
                              storage: this.props.storage,
                            },
                          }}
                        >
                          <Button className='ias-orange-bg ias-white-fg ias-mb-1 ias-rounded ias-capitalize ias-thin ias-shadow'>
                            <Container
                              fluid
                              className='ias-flex ias-flex-ai-center'
                            >
                              <span className='ias-pr-1'>
                                {consts.modifyStorage}
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
