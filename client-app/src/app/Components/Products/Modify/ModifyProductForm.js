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
import { AddProductLaptopForm } from '../Add/AddProductLaptopForm';
import { AddProductPcForm } from '../Add/AddProductPcForm';
import { AddProductMonitorForm } from '../Add/AddProductMonitorForm';
import { AddProductOtherDeviceForm } from '../Add/AddProductOtherDeviceForm';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../Forms/Common/TextInput';
import { DropdownInput } from '../../Forms/Common/DropdownInput';
import { ToggleInput } from '../../Forms/Common/ToggleInput';
import { TextAreaInput } from '../../Forms/Common/TextAreaInput';
import httpClient from '../../../API/httpClient';

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
  price: composeValidators(isRequired({ message: 'Pole jest wymagane' }))({
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

class ModifyProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMessage: null,
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

  handleModifyProductSubmit = (values) => {
    this.setState({
      statusMessage: null,
    });
    values.id = Number(this.props.location.state.product.id);
    values.price = Number(values.price);
    values.quantity = Number(values.quantity);
    values.memoryAmount = Number(values.memoryAmount);
    values.diagonal = Number(values.diagonal);
    switch (values.type) {
      case consts.device.type.laptop.typename:
        httpClient.Laptops.update(values)
          .then((response) => {
            this.setState({
              statusMessage: consts.prompts.updateElement.success,
            });
          })
          .catch((error) => {
            if (error.response) {
              this.setState({
                statusMessage: `${consts.prompts.updateElement.error.client}. Komunikat serwera: ${error.response.data[0]}`,
              });
            } else if (error.request) {
              this.setState({
                statusMessage: consts.prompts.updateElement.error.server,
              });
            } else {
              this.setState({
                statusMessage: consts.prompts.updateElement.error.client,
              });
            }
          });
        break;
      case consts.device.type.monitor.typename:
        httpClient.Monitors.update(values)
          .then((response) => {
            this.setState({
              statusMessage: consts.prompts.updateElement.success,
            });
          })
          .catch((error) => {
            if (error.response) {
              this.setState({
                statusMessage: `${consts.prompts.updateElement.error.client}. Komunikat serwera: ${error.response.data[0]}`,
              });
            } else if (error.request) {
              this.setState({
                statusMessage: consts.prompts.updateElement.error.server,
              });
            } else {
              this.setState({
                statusMessage: consts.prompts.updateElement.error.client,
              });
            }
          });
        break;
      case consts.device.type.pc.typename:
        httpClient.PCs.update(values)
          .then((response) => {
            this.setState({
              statusMessage: consts.prompts.updateElement.success,
            });
          })
          .catch((error) => {
            if (error.response) {
              this.setState({
                statusMessage: `${consts.prompts.updateElement.error.client}. Komunikat serwera: ${error.response.data[0]}`,
              });
            } else if (error.request) {
              this.setState({
                statusMessage: consts.prompts.updateElement.error.server,
              });
            } else {
              this.setState({
                statusMessage: consts.prompts.updateElement.error.client,
              });
            }
          });
        break;
      case consts.device.type.otherdevice.typename:
        httpClient.OtherDevices.update(values)
          .then((response) => {
            this.setState({
              statusMessage: consts.prompts.updateElement.success,
            });
          })
          .catch((error) => {
            if (error.response) {
              this.setState({
                statusMessage: `${consts.prompts.updateElement.error.client}. Komunikat serwera: ${error.response.data[0]}`,
              });
            } else if (error.request) {
              this.setState({
                statusMessage: consts.prompts.updateElement.error.server,
              });
            } else {
              this.setState({
                statusMessage: consts.prompts.updateElement.error.client,
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

  render() {
    const product = this.props.location.state.product;
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
                    {consts.modifyProduct}
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
                      onSubmit={this.handleModifyProductSubmit}
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
                                <Field
                                  name='type'
                                  placeholder='Wprowadz typ urzadzenia'
                                  disabled={true}
                                  type='text'
                                  defaultValue={product.type}
                                  className='ias-input-primary ias-rounded'
                                  required={true}
                                  component={TextInput}
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
                                  initialValue={product.name}
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
                                  defaultValue={product.producer}
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
                                  defaultValue={product.storage.id}
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
                                  defaultValue={product.quantity}
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
                                  initialValue={product.saleReason}
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
                                  defaultValue={product.destination.id}
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
                                  defaultValue={product.tested}
                                  required={true}
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
                                  defaultValue={Number(product.price)}
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
                                  defaultValue={product.interest.id}
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
                                  initialValue={product.serviceTag}
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
                                  initialValue={product.interfacePorts}
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
                                  initialValue={product.adminsToDo}
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
                                  initialValue={product.comment}
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
                                  defaultValue={product.length}
                                  required={false}
                                  component={TextInput}
                                />
                                <Field
                                  name='height'
                                  placeholder='Okresl wysokosc urzadzenia'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required={false}
                                  defaultValue={product.height}
                                  component={TextInput}
                                />
                                <Field
                                  name='weight'
                                  placeholder='Okresl wage urzadzenia'
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required={false}
                                  defaultValue={product.weight}
                                  component={TextInput}
                                />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>

                          {product.type ===
                          consts.device.type.laptop.typename ? (
                            <AddProductLaptopForm product={product} />
                          ) : product.type ===
                            consts.device.type.pc.typename ? (
                            <AddProductPcForm product={product} />
                          ) : product.type ===
                            consts.device.type.monitor.typename ? (
                            <AddProductMonitorForm product={product} />
                          ) : (
                            <AddProductOtherDeviceForm product={product} />
                          )}

                          <Button
                            type='submit'
                            disabled={invalid || pristine}
                            floated='right'
                            className='ias-button ias-orange-bg ias-white-fg ias-shadow ias-rounded ias-mb-1 ias-1x'
                          >
                            {consts.modifyProduct}
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

export default ModifyProductForm;
