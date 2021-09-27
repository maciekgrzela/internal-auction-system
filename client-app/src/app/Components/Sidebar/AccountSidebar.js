import React from 'react';
import {
  Sidebar,
  Menu,
  Container,
  Button,
  Form,
  Header,
  Grid,
  List,
  Message,
} from 'semantic-ui-react';
import consts from '../../Consts/consts.json';
import Logo from '../Logo/Logo';
import httpClient from '../../API/httpClient';
import { FiUser } from 'react-icons/fi';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../Forms/Common/TextInput';
import { combineValidators, isRequired } from 'revalidate';

const companyDetailsValidator = combineValidators({
  name: isRequired({ message: 'Nazwa przedsiębiorstwa jest wymagana' }),
  street: isRequired({ message: 'Ulica jest wymagana' }),
  number: isRequired({ message: 'Numer domu jest wymagany' }),
  city: isRequired({ message: 'Miasto jest wymagane' }),
  postalCode: isRequired({ message: 'Kod pocztowy jest wymagany' }),
  nip: isRequired({ message: 'NIP jest wymagany' }),
  phoneNumber: isRequired({ message: 'Numer telefonu jest wymagany' }),
});

class AccountSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: [],
      updated: false,
    };
  }

  setUpdated = (value) => {
    this.setState({
      updated: value,
    });
  };

  setErrorMessage = (error) => {
    this.setState({
      errorMessage: error,
    });
  };

  handleFinalFormSubmit = (values) => {
    httpClient.Users.updateCompanyDetails(this.props.user.id, values)
      .then((response) => {
        this.props.updateCompanyDetails(values);
        this.setUpdated(true);
      })
      .catch((error) => {
        if (error.response) {
          if (Array.isArray(error.response.data)) {
            this.setErrorMessage(error.response.data);
          } else {
            this.setErrorMessage([error.response.data]);
          }
        } else if (error.request) {
          this.setErrorMessage(consts.prompts.login.error.server);
        } else {
          this.setErrorMessage(consts.prompts.login.error.server);
        }
      });
  };

  render() {
    return (
      <Sidebar.Pusher>
        <Sidebar
          as={Menu}
          animation='push'
          direction='left'
          icon='labeled'
          visible={true}
          vertical
          width='thin'
        >
          <Logo filename='logo.svg' />
          <Menu.Item>
            <Container
              fluid
              textAlign='left'
              className='ias-flex ias-flex-ai-center ias-px-1 ias-pl-1'
            >
              <FiUser className='ias-2x ias-orange-fg' />
              <span className='ias-2x ias-thin ias-capitalize ias-pl-1 ias-orange-fg'>
                {consts.hello}
                {this.props.user.firstName + ' ' + this.props.user.lastName}
              </span>
            </Container>
          </Menu.Item>
          <Menu.Item>
            <Header
              as='h3'
              textAlign='left'
              className='ias-thin ias-capitalize ias-mt-2 ias-mb-1'
              dividing
            >
              Dane do faktury
            </Header>
            <FinalForm
              validate={companyDetailsValidator}
              onSubmit={this.handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit}>
                  <Container>
                    <Grid>
                      {this.state.updated === true ? (
                        <Grid.Row centered className='ias-mb-0' columns='1'>
                          <Grid.Column width='16'>
                            <Message color='orange' className='ias-rounded'>
                              {consts.prompts.updateCompanyDetails.success}
                            </Message>
                          </Grid.Column>
                        </Grid.Row>
                      ) : (
                        <></>
                      )}
                      <Grid.Row className='ias-pt-1 ias-pb-0'>
                        <Grid.Column>
                          <Field
                            name='name'
                            icon='address card outline'
                            iconPosition='left'
                            placeholder='Nazwa firmy'
                            type='text'
                            defaultValue={
                              this.props.user.usersCompanyDetails !== null
                                ? this.props.user.usersCompanyDetails.name
                                : ''
                            }
                            className='ias-input-primary ias-rounded'
                            required
                            component={TextInput}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={2} className='ias-pt-1 ias-pb-0'>
                        <Grid.Column width={9}>
                          <Field
                            name='street'
                            icon='road'
                            iconPosition='left'
                            placeholder='Ulica'
                            defaultValue={
                              this.props.user.usersCompanyDetails !== null
                                ? this.props.user.usersCompanyDetails.street
                                : ''
                            }
                            type='text'
                            className='ias-input-primary ias-rounded'
                            required
                            component={TextInput}
                          />
                        </Grid.Column>
                        <Grid.Column width={7} className='ias-pl-0'>
                          <Field
                            name='number'
                            icon='numbered list'
                            iconPosition='left'
                            placeholder='Numer'
                            defaultValue={
                              this.props.user.usersCompanyDetails !== null
                                ? this.props.user.usersCompanyDetails.number
                                : ''
                            }
                            type='text'
                            className='ias-input-primary ias-rounded'
                            required
                            component={TextInput}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={2} className='ias-pt-1 ias-pb-0'>
                        <Grid.Column width={10}>
                          <Field
                            name='city'
                            icon='building'
                            iconPosition='left'
                            placeholder='Miasto'
                            defaultValue={
                              this.props.user.usersCompanyDetails !== null
                                ? this.props.user.usersCompanyDetails.city
                                : ''
                            }
                            type='text'
                            className='ias-input-primary ias-rounded'
                            required
                            component={TextInput}
                          />
                        </Grid.Column>
                        <Grid.Column width={6} className='ias-pl-0'>
                          <Field
                            name='postalCode'
                            icon='envelope'
                            iconPosition='left'
                            placeholder='Kod pocztowy'
                            defaultValue={
                              this.props.user.usersCompanyDetails !== null
                                ? this.props.user.usersCompanyDetails.postalCode
                                : ''
                            }
                            type='text'
                            className='ias-input-primary ias-rounded'
                            required
                            component={TextInput}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row className='ias-pt-1 ias-pb-0'>
                        <Grid.Column>
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
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row className='ias-pt-1'>
                        <Grid.Column>
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
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Container>
                  <Container className='ias-mt-1'>
                    <Button
                      disabled={invalid || pristine}
                      className='ias-rounded ias-orange-bg ias-white-fg ias-mb-2'
                      size='large'
                      fluid
                    >
                      {consts.updateCompanyDetails}
                    </Button>
                  </Container>
                </Form>
              )}
            />
            {this.state.errorMessage.length > 0 ? (
              <Grid.Row centered className='ias-mt-0' columns='1'>
                <Grid.Column width='6'>
                  <Message className='ias-white-bg ias-white-fg ias-rounded'>
                    <List>
                      <List.Content floated='left'>
                        {this.state.errorMessage.map((error) => (
                          <List.Item className='ias-orange-fg ias-white-bg'>
                            {error}
                          </List.Item>
                        ))}
                      </List.Content>
                    </List>
                  </Message>
                </Grid.Column>
              </Grid.Row>
            ) : (
              <></>
            )}
          </Menu.Item>
        </Sidebar>
      </Sidebar.Pusher>
    );
  }
}

export default AccountSidebar;
