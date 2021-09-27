import React, { Component } from 'react';
import consts from '../../../Consts/consts.json';
import httpClient from '../../../API/httpClient';
import {
  Form,
  Grid,
  Header,
  Card,
  Container,
  Segment,
  Button,
} from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../Forms/Common/TextInput';
import { DropdownInput } from '../../Forms/Common/DropdownInput';
import { combineValidators, composeValidators, isRequired } from 'revalidate';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const addStorageValidator = combineValidators({
  name: composeValidators(isRequired({ message: 'Pole jest wymagane' }))({
    message: 'Pole jest wymagane',
  }),
  description: composeValidators(isRequired({ message: 'Pole jest wymagane' }))(
    {
      message: 'Pole jest wymagane',
    }
  ),
  locationId: composeValidators(isRequired({ message: 'Pole jest wymagane' }))({
    message: 'Pole jest wymagane',
  }),
});

export default class AddStorage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      locationOptions: [],
      statusMessage: null,
    };
  }

  componentDidMount = () => {
    httpClient.Locations.list().then((response) => {
      let values = [];
      let options = [];
      response.forEach((location) => {
        values.push(location);
        options.push({
          key: location.id,
          text: `${location.street} ${location.number}, ${location.city}`,
          value: location.id,
        });
      });
      this.setLocationOptions(options);
      this.setLocations(values);
    });
  };

  setLocations = (value) => {
    this.setState({
      locations: value,
    });
  };

  setLocationOptions = (value) => {
    this.setState({
      locationOptions: value,
    });
  };

  handleAddStorageSubmit = (values) => {
    this.setState({
      statusMessage: null,
    });
    httpClient.Storages.create(values)
      .then(() => {
        this.setState({
          statusMessage: consts.prompts.addStorage.success,
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            statusMessage: `${consts.prompts.addStorage.error.client}. Komunikat serwera: ${error.response.data[0]}`,
          });
        } else if (error.request) {
          this.setState({
            statusMessage: consts.prompts.addStorage.error.server,
          });
        } else {
          this.setState({
            statusMessage: consts.prompts.addStorage.error.client,
          });
        }
      });
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
                    <Link to='/account' className='ias-flex ias-flex-ai-center'>
                      <Button className='ias-mr-1 ias-white-bg ias-orange-fg ias-orange-border ias-rounded'>
                        <FiHome />
                      </Button>
                      <span className='ias-capitalize'>
                        {consts.addStorage}
                      </span>
                    </Link>
                  </Header>
                </Card.Header>
                <Card.Description className='ias-pt-3'>
                  <Container fluid className='ias-py-3'>
                    {this.state.statusMessage !== null ? (
                      <Segment color='orange' className='ias-rounded ias-mb-2'>
                        {this.state.statusMessage}
                      </Segment>
                    ) : (
                      <></>
                    )}
                    <FinalForm
                      onSubmit={this.handleAddStorageSubmit}
                      validate={addStorageValidator}
                      render={({
                        handleSubmit,
                        invalid,
                        pristine,
                        submitting,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <Grid className='ias-mb-2'>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Kod magazynu*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='name'
                                  placeholder='Wprowadz kod magazynu'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required={true}
                                  component={TextInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Opis*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='description'
                                  placeholder='Wprowadz opis magazynu'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required={true}
                                  component={TextInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Lokalizacja*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='locationId'
                                  className='ias-input-primary ias-rounded'
                                  placeholder='Wybierz lokalizacje'
                                  required={false}
                                  options={this.state.locationOptions}
                                  component={DropdownInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>

                          <Button
                            disabled={pristine || submitting}
                            floated='right'
                            color='red'
                            className='ias-rounded ias-mb-1 ias-1x'
                          >
                            {consts.clear}
                          </Button>
                          <Button
                            type='submit'
                            disabled={invalid || pristine}
                            floated='right'
                            className='ias-button ias-orange-bg ias-white-fg ias-shadow ias-rounded ias-mb-1 ias-1x'
                          >
                            {consts.addStorage}
                          </Button>
                        </Form>
                      )}
                    />
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
