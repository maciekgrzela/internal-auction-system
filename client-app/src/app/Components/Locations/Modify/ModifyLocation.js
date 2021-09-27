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
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthLessThan,
  createValidator,
} from 'revalidate';
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const isPostalCodeValid = createValidator(
  (message) => (value) => {
    if (value && !/^[0-9]{2}-[0-9]{3}$/i.test(value)) {
      return message;
    }
  },
  'Wartosc pola jest niepoprawna. Wprowadz wartosc w formacie XX-XXX'
);

const addLocationValidator = combineValidators({
  street: composeValidators(
    isRequired({ message: 'Pole jest wymagane' }),
    hasLengthLessThan(50)({
      message: 'Pole moze zawierac maksymalnie 50 znakow',
    })
  )({ message: 'Pole jest wymagane' }),
  number: composeValidators(
    isRequired({ message: 'Pole jest wymagane' }),
    hasLengthLessThan(6)({
      message: 'Pole moze zawierac maksymalnie 6 znakow',
    })
  )({ message: 'Pole jest wymagane' }),
  city: composeValidators(
    isRequired({ message: 'Pole jest wymagane' }),
    hasLengthLessThan(31)({
      message: 'Pole moze zawierac maksymalnie 31 znakow',
    })
  )({ message: 'Pole jest wymagane' }),
  postalCode: composeValidators(
    isRequired({ message: 'Pole jest wymagane' }),
    isPostalCodeValid
  )({
    message:
      'Wartosc pola jest niepoprawna. Wprowadz wartosc w formacie XX-XXX',
  }),
});

export default class ModifyLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMessage: null,
    };
  }

  handleAddProductSubmit = (values) => {
    this.setState({
      statusMessage: null,
    });
    httpClient.Locations.create(values)
      .then((response) => {
        this.setState({
          statusMessage: consts.prompts.addElement.success,
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            statusMessage: `${consts.prompts.addElement.error.client}. Komunikat serwera: ${error.response.data[0]}`,
          });
        } else if (error.request) {
          this.setState({
            statusMessage: consts.prompts.addElement.error.server,
          });
        } else {
          this.setState({
            statusMessage: consts.prompts.addElement.error.client,
          });
        }
      });
  };

  render() {
    const location = this.props.location.state.location;
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
                        {consts.modifyLocation}
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
                      onSubmit={this.handleAddProductSubmit}
                      validate={addLocationValidator}
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
                                  Miasto*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='city'
                                  placeholder='Wprowadz miasto lokalizacji'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  defaultValue={location.city}
                                  required={true}
                                  component={TextInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Ulica*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='street'
                                  placeholder='Wprowadz ulice lokalizacji'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  defaultValue={location.street}
                                  required={true}
                                  component={TextInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Numer*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='number'
                                  placeholder='Wprowadz numer ulicy lokalizacji'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  defaultValue={location.number}
                                  required={true}
                                  component={TextInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Kod pocztowy*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='postalCode'
                                  placeholder='Wprowadz kod pocztowy lokalizacji'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  defaultValue={location.postalCode}
                                  required={true}
                                  component={TextInput}
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
                            {consts.modifyLocation}
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
