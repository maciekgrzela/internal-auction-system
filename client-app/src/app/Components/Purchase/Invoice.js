import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Button, Card, Grid, Header, Form, Container } from 'semantic-ui-react';
import consts from '../../Consts/consts.json';
import { Redirect } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../Forms/Common/TextInput';
import { combineValidators, isRequired } from 'revalidate';
import { Link } from 'react-router-dom';
import httpClient from '../../API/httpClient';

const purchaseValidator = combineValidators({
  firstName: isRequired({ message: 'Pole imię jest wymagane' }),
  lastName: isRequired({ message: 'Pole nazwisko jest wymagane' }),
  name: isRequired({ message: 'Nazwa przedsiębiorstwa jest wymagana' }),
  street: isRequired({ message: 'Ulica jest wymagana' }),
  number: isRequired({ message: 'Numer domu jest wymagany' }),
  city: isRequired({ message: 'Miasto jest wymagane' }),
  postalCode: isRequired({ message: 'Kod pocztowy jest wymagany' }),
  nip: isRequired({ message: 'NIP jest wymagany' }),
  phoneNumber: isRequired({ message: 'Numer telefonu jest wymagany' }),
});

class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: 0,
      invoiceDetails: [],
      errorMessage: '',
    };
  }

  handleFinalFormSubmit = (personalData) => {
    let cartItems = [];
    this.props.cart.forEach((product) => {
      cartItems.push({
        DeviceKey: product.id,
        producer: product.producer,
        type: product.type,
        name: product.name,
        serviceTag: product.serviceTag,
        comment: product.comment,
        price: product.price,
        quantity: product.amount,
      });
    });

    let finalizePurchaseObject = {
      items: cartItems,
    };

    httpClient.Purchases.finalize(finalizePurchaseObject)
      .then(() => {
        this.setState({
          success: 1,
          invoiceDetails: personalData,
        });
        this.props.clearCart();
      })
      .catch((error) => {
        this.setState({
          success: 2,
          errorMessage: error.response.data,
        });
      });
  };

  render() {
    return (
      <>
        {this.state.success === 0 ? (
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Card fluid className='ias-rounded ias-py-1'>
                  <Card.Content textAlign='center' className='ias-mt-1'>
                    <Card.Header className='ias-2x ias-orange-fg'>
                      <Header
                        as='h1'
                        className='ias-thin ias-title ias-capitalize ias-pt-1'
                        dividing
                      >
                        {consts.shoppingData}
                      </Header>
                    </Card.Header>

                    <p className='center ias-2x ias-orange-fg ias-m-1'>
                      {consts.buyText}
                    </p>

                    <Grid>
                      <Grid.Row centered columns='1' className='ias-mt-3'>
                        <Grid.Column width='10'>
                          <FinalForm
                            validate={purchaseValidator}
                            onSubmit={this.handleFinalFormSubmit}
                            render={({ handleSubmit, invalid, pristine }) => (
                              <Form onSubmit={handleSubmit}>
                                <Field
                                  name='firstName'
                                  icon='user'
                                  iconPosition='left'
                                  placeholder='Imię'
                                  type='text'
                                  initialValue={this.props.user.firstName}
                                  className='ias-input-primary ias-rounded'
                                  required
                                  component={TextInput}
                                />
                                <Field
                                  name='lastName'
                                  icon='user outline'
                                  iconPosition='left'
                                  placeholder='Nazwisko'
                                  type='text'
                                  initialValue={this.props.user.lastName}
                                  className='ias-input-primary ias-rounded'
                                  required
                                  component={TextInput}
                                />
                                <Field
                                  name='name'
                                  icon='address card outline'
                                  iconPosition='left'
                                  placeholder='Nazwa firmy'
                                  type='text'
                                  initialValue={
                                    this.props.user.usersCompanyDetails !== null
                                      ? this.props.user.usersCompanyDetails.name
                                      : ''
                                  }
                                  className='ias-input-primary ias-rounded'
                                  required
                                  component={TextInput}
                                />
                                <Field
                                  name='street'
                                  icon='road'
                                  iconPosition='left'
                                  placeholder='Ulica'
                                  initialValue={
                                    this.props.user.usersCompanyDetails !== null
                                      ? this.props.user.usersCompanyDetails
                                          .street
                                      : ''
                                  }
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required
                                  component={TextInput}
                                />
                                <Field
                                  name='number'
                                  icon='numbered list'
                                  iconPosition='left'
                                  placeholder='Numer'
                                  initialValue={
                                    this.props.user.usersCompanyDetails !== null
                                      ? this.props.user.usersCompanyDetails
                                          .number
                                      : ''
                                  }
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required
                                  component={TextInput}
                                />
                                <Field
                                  name='city'
                                  icon='building'
                                  iconPosition='left'
                                  placeholder='Miasto'
                                  initialValue={
                                    this.props.user.usersCompanyDetails !== null
                                      ? this.props.user.usersCompanyDetails.city
                                      : ''
                                  }
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required
                                  component={TextInput}
                                />
                                <Field
                                  name='postalCode'
                                  icon='envelope'
                                  iconPosition='left'
                                  placeholder='Kod pocztowy'
                                  defaultValue={
                                    this.props.user.usersCompanyDetails !== null
                                      ? this.props.user.usersCompanyDetails
                                          .postalCode
                                      : ''
                                  }
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required
                                  component={TextInput}
                                />
                                <Field
                                  name='nip'
                                  icon='archive'
                                  iconPosition='left'
                                  placeholder='NIP'
                                  defaultValue={
                                    this.props.user.usersCompanyDetails !== null
                                      ? this.props.user.usersCompanyDetails.nip
                                      : ''
                                  }
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required
                                  component={TextInput}
                                />
                                <Field
                                  name='phoneNumber'
                                  icon='phone'
                                  iconPosition='left'
                                  placeholder='Nr. telefonu'
                                  defaultValue={
                                    this.props.user.usersCompanyDetails !== null
                                      ? this.props.user.usersCompanyDetails
                                          .phoneNumber
                                      : ''
                                  }
                                  type='text'
                                  className='ias-input-primary ias-rounded'
                                  required
                                  component={TextInput}
                                />

                                <Container className='ias-my-5'>
                                  <Button
                                    disabled={invalid || pristine}
                                    className='ias-rounded ias-orange-bg ias-white-fg ias-mb-1'
                                    size='large'
                                    fluid
                                  >
                                    {consts.confirm}
                                  </Button>
                                </Container>
                              </Form>
                            )}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Button
                      className='ias-mx-1 ias-rounded ias-shadow ias-white-fg'
                      size='medium'
                      floated='right'
                      color='red'
                    >
                      <Link to='/' className='ias-inverted up'>
                        <FiArrowLeft /> {consts.back2}
                      </Link>
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : this.state.success === 1 ? (
          <Redirect
            to={{
              pathname: '/successfulPurchase',
              state: {
                invoiceDetails: this.state.invoiceDetails,
                products: this.props.cart,
              },
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: '/failure',
              state: {
                errorMessage: this.state.errorMessage,
              },
            }}
          />
        )}
      </>
    );
  }
}
export default Invoice;
