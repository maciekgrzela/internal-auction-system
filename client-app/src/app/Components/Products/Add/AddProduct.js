import React, { Component } from 'react';
import {
  Grid,
  Card,
  Header,
  Button,
  Container,
  Form,
  Segment,
} from 'semantic-ui-react';
import consts from '../../../Consts/consts.json';
import {
  combineValidators,
  isRequired,
  composeValidators,
  isNumeric,
  hasLengthLessThan,
  createValidator,
  hasLengthGreaterThan,
} from 'revalidate';
import { AddProductLaptopForm } from './AddProductLaptopForm';
import { AddProductPcForm } from './AddProductPcForm';
import { AddProductMonitorForm } from './AddProductMonitorForm';
import { AddProductOtherDeviceForm } from './AddProductOtherDeviceForm';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../Forms/Common/TextInput';
import { DropdownInput } from '../../Forms/Common/DropdownInput';
import { ToggleInput } from '../../Forms/Common/ToggleInput';
import { TextAreaInput } from '../../Forms/Common/TextAreaInput';
import { RadioInput } from '../../Forms/Common/RadioInput';
import httpClient from '../../../API/httpClient';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const isGreaterOrEqualsThan = (n) =>
  createValidator(
    (message) => (value) => {
      if (value && Number(value) < n) {
        return message;
      }
    },
    (field) => `Pole ${field} musi byc wieksze niz ${n}`
  );

const isLesserOrEqualsThan = (n) =>
  createValidator(
    (message) => (value) => {
      if (value && Number(value) > n) {
        return message;
      }
    },
    (field) => `Pole ${field} musi byc mniejsze niz ${n}`
  );

const addProductValidator = combineValidators({
  name: composeValidators(
    isRequired({ message: 'Pole jest wymagane' }),
    hasLengthLessThan(100)({
      message: 'Pole moze zawierac maksymalnie 100 znakow',
    })
  )({ message: 'Pole jest wymagane' }),
  saleReason: composeValidators(
    isRequired({ message: 'Pole jest wymagane' }),
    hasLengthLessThan(300)({
      message: 'Pole moze zawierac maksymalnie 300 znakow',
    })
  )({ message: 'Pole jest wymagane' }),
  quantity: composeValidators(
    isRequired({ message: 'Pole jest wymagane' }),
    isNumeric({ message: 'Wartosc pola jest nieprawidlowa' })
  )({ message: 'Pole jest wymagane' }),
  price: composeValidators(
    isRequired({ message: 'Pole jest wymagane' }),
    isGreaterOrEqualsThan(0)({
      message: 'Wartosc w polu musi byc wieksza lub rowna 0',
    })
  )({ message: 'Pole jest wymagane' }),
  destinationId: composeValidators(
    isRequired({ message: 'Pole jest wymagane' })
  )({ message: 'Pole jest wymagane' }),
  interestId: composeValidators(isRequired({ message: 'Pole jest wymagane' }))({
    message: 'Pole jest wymagane',
  }),
  length: composeValidators(
    hasLengthLessThan(7)({ message: 'Pole moze zawierac maksymalnie 7 znakow' })
  )({ message: 'Wartosc pola jest nieprawidlowa' }),
  height: composeValidators(
    hasLengthLessThan(7)({ message: 'Pole moze zawierac maksymalnie 7 znakow' })
  )({ message: 'Wartosc pola jest nieprawidlowa' }),
  weight: composeValidators(
    hasLengthLessThan(7)({ message: 'Pole moze zawierac maksymalnie 7 znakow' })
  )({ message: 'Wartosc pola jest nieprawidlowa' }),
  processor: composeValidators(
    hasLengthLessThan(200)({
      message: 'Pole moze zawierac maksymalnie 200 znakow',
    })
  )({ message: 'Pole jest wymagane' }),
  memoryAmount: composeValidators(
    isGreaterOrEqualsThan(0)({
      message: 'Pole musi byc wieksze lub rowne 0',
    }),
    isLesserOrEqualsThan(1024)({
      message: 'Pole musi byc mniejsze lub rowne 1024',
    }),
    isNumeric({ message: 'Wartosc w polu jest nieprawidlowa' })
  )({ message: 'Pole jest wymagane' }),
  graphicsCard: composeValidators(
    hasLengthLessThan(100)({
      message: 'Pole moze zawierac maksymalnie 100 znakow',
    })
  )({ message: 'Pole moze zawierac maksymalnie 100 znakow' }),
  diskDrive: composeValidators(
    hasLengthLessThan(100)({
      message: 'Pole moze zawierac maksymalnie 100 znakow',
    })
  )({ message: 'Pole jest wymagane' }),
  screenResolution: composeValidators(
    hasLengthLessThan(10)({
      message: 'Pole moze zawierac maksymalnie 10 znakow',
    }),
    hasLengthGreaterThan(6)({
      message: 'Pole musi zawierac minimum 7 znakow',
    })
  )({ message: 'Wartosc w polu jest nieprawidlowa' }),
  operatingSystem: composeValidators(
    hasLengthLessThan(100)({
      message: 'Pole moze zawierac maksymalnie 100 znakow',
    })
  )({ message: 'Wartosc w polu jest nieprawidlowa' }),
  refreshing: composeValidators(
    isGreaterOrEqualsThan(30)({
      message: 'Pole musi byc wieksze lub rowne 30',
    }),
    isLesserOrEqualsThan(240)({
      message: 'Pole musi byc mniejsze lub rowne 240',
    })
  )({ message: 'Wartosc w polu jest nieprawidlowa' }),
  diagonal: composeValidators(
    isGreaterOrEqualsThan(12)({
      message: 'Pole musi byc wieksze lub rowne 12',
    }),
    isLesserOrEqualsThan(100)({
      message: 'Pole musi byc mniejsze lub rowne 100',
    })
  )({ message: 'Wartosc w polu jest nieprawidlowa' }),
  description: composeValidators(
    hasLengthLessThan(500)({
      message: 'Pole moze zawierac maksymalnie 500 znakow',
    })
  )({ message: 'Wartosc w polu jest nieprawidlowa' }),
  features: composeValidators(
    hasLengthLessThan(500)({
      message: 'Pole moze zawierac maksymalnie 500 znakow',
    })
  )({ message: 'Wartosc w polu jest nieprawidlowa' }),
});

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMessage: null,
      deviceType: consts.device.type.laptop.typename,
      storages: [],
      storageOptions: [],
    };
  }

  componentDidMount = () => {
    httpClient.Storages.list().then((response) => {
      let values = [];
      let options = [];
      response.forEach((storage) => {
        values.push(storage);
        options.push({
          key: storage.id,
          text: `${storage.name}, ${storage.location.city}`,
          value: storage.id,
        });
      });
      this.setStoragesOptions(options);
      this.setStorages(values);
    });
  };

  handleAddProductSubmit = (values) => {
    this.setState({
      statusMessage: null,
    });
    values.price = Number(values.price);
    values.quantity = Number(values.quantity);
    values.memoryAmount = Number(values.memoryAmount);
    values.diagonal = Number(values.diagonal);
    values.refreshing = Number(values.refreshing);
    values.type = this.state.deviceType;
    switch (values.type) {
      case consts.device.type.laptop.typename:
        httpClient.Laptops.create(values)
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
        break;
      case consts.device.type.monitor.typename:
        httpClient.Monitors.create(values)
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
        break;
      case consts.device.type.pc.typename:
        httpClient.PCs.create(values)
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
        break;
      case consts.device.type.otherdevice.typename:
        httpClient.OtherDevices.create(values)
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
        break;
      default:
        break;
    }
  };

  setStoragesOptions = (value) => {
    this.setState({
      storageOptions: value,
    });
  };

  setStorages = (value) => {
    this.setState({
      storages: value,
    });
  };

  setDeviceType = (type) => {
    this.setState({
      deviceType: type,
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
                        {consts.addProduct}
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
                    <FinalForm
                      subscription={{ submitting: true, pristine: true }}
                      onSubmit={this.handleAddProductSubmit}
                      validate={addProductValidator}
                      render={({
                        handleSubmit,
                        invalid,
                        pristine,
                        submitting,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <Grid>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Typ urzadzenia
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <RadioInput
                                  options={[
                                    {
                                      key: consts.device.type.laptop.typename,
                                      label:
                                        consts.device.type.laptop.displayName,
                                      value: consts.device.type.laptop.typename,
                                    },
                                    {
                                      key: consts.device.type.pc.typename,
                                      label: consts.device.type.pc.displayName,
                                      value: consts.device.type.pc.typename,
                                    },
                                    {
                                      key: consts.device.type.monitor.typename,
                                      label:
                                        consts.device.type.monitor.displayName,
                                      value:
                                        consts.device.type.monitor.typename,
                                    },
                                    {
                                      key:
                                        consts.device.type.otherdevice.typename,
                                      label:
                                        consts.device.type.otherdevice
                                          .displayName,
                                      value:
                                        consts.device.type.otherdevice.typename,
                                    },
                                  ]}
                                  defaultValue={
                                    consts.device.type.laptop.typename
                                  }
                                  setDeviceType={this.setDeviceType}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Nazwa urzadzenia*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='name'
                                  placeholder='Wprowadz nazwe urzadzenia'
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
                                  Producent*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='producer'
                                  placeholder='Wprowadz nazwe producenta'
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
                                  Magazyn*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='storageId'
                                  className='ias-input-primary ias-rounded'
                                  placeholder='Wybierz magazyn'
                                  required={false}
                                  options={this.state.storageOptions}
                                  component={DropdownInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Ilosc sztuk*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='quantity'
                                  placeholder='Okresl ilosc dostepnych sztuk'
                                  type='number'
                                  defaultValue={0}
                                  className='ias-input-primary ias-rounded'
                                  required={true}
                                  component={TextInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Powod sprzedazy*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='saleReason'
                                  placeholder='Okresl powod sprzedazy'
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
                                  Przeznaczenie*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='destinationId'
                                  className='ias-input-primary ias-rounded'
                                  placeholder='Okresl przeznaczenie urzadzenia'
                                  required={true}
                                  options={[
                                    {
                                      key: 'sale',
                                      text: 'Na sprzedaz',
                                      value: 3,
                                    },
                                    {
                                      key: 'toGive',
                                      text: 'Do oddania',
                                      value: 2,
                                    },
                                    {
                                      key: 'electronicWaste',
                                      text: 'Elektrosmieci',
                                      value: 1,
                                    },
                                  ]}
                                  component={DropdownInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Czy testowany?*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='tested'
                                  className='ias-input-primary ias-rounded'
                                  defaultValue={false}
                                  component={ToggleInput}
                                  type='checkbox'
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Cena*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='price'
                                  placeholder='Okresl cene urzadzenia'
                                  type='number'
                                  defaultValue={0}
                                  className='ias-input-primary ias-rounded'
                                  required={true}
                                  component={TextInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Zainteresowanie*
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='interestId'
                                  placeholder='Wybierz stopien zainteresowania urzadzeniem'
                                  className='ias-input-primary ias-rounded'
                                  required={true}
                                  options={[
                                    {
                                      key: 'none',
                                      text: 'Brak',
                                      value: 4,
                                    },
                                    {
                                      key: 'low',
                                      text: 'Male',
                                      value: 3,
                                    },
                                    {
                                      key: 'average',
                                      text: 'Srednie',
                                      value: 2,
                                    },
                                    {
                                      key: 'high',
                                      text: 'Duze',
                                      value: 1,
                                    },
                                  ]}
                                  component={DropdownInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  ServiceTag
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='serviceTag'
                                  placeholder='Wprowadz serviceTag urzadzenia'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required={false}
                                  component={TextInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Porty interfejsow
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='interfacePorts'
                                  placeholder='Wymien interfejsy urzadzenia'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required={false}
                                  component={TextInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Uwagi administratora
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='adminsTodo'
                                  placeholder='Okresl uwagi widoczne tylko dla administratorow'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required={false}
                                  component={TextAreaInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Komentarz dla uzytkownika
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='comment'
                                  placeholder='Okresl uwagi widoczne tylko dla uzytkownikow'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required={false}
                                  component={TextAreaInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                              <Grid.Column width={4} verticalAlign='middle'>
                                <Header as='label' className='ias-capitalize'>
                                  Wymiary
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={12}>
                                <Field
                                  name='length'
                                  placeholder='Okresl szerokosc urzadzenia'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required={false}
                                  component={TextInput}
                                />
                                <Field
                                  name='height'
                                  placeholder='Okresl wysokosc urzadzenia'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required={false}
                                  component={TextInput}
                                />
                                <Field
                                  name='weight'
                                  placeholder='Okresl wage urzadzenia'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required={false}
                                  component={TextInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>

                          {this.state.deviceType ===
                          consts.device.type.laptop.typename ? (
                            <AddProductLaptopForm />
                          ) : this.state.deviceType ===
                            consts.device.type.pc.typename ? (
                            <AddProductPcForm />
                          ) : this.state.deviceType ===
                            consts.device.type.monitor.typename ? (
                            <AddProductMonitorForm />
                          ) : (
                            <AddProductOtherDeviceForm />
                          )}

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
                            {consts.addDevice}
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

export default AddProduct;
