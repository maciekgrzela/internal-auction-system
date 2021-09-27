import React from 'react';
import {
  Grid,
  Form,
  Button,
  Message,
  Container,
  List,
  Card,
} from 'semantic-ui-react';
import consts from '../../Consts/consts.json';
import '../../Styles/App.css';
import { Link } from 'react-router-dom';
import ReactTypingEffect from 'react-typing-effect';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../Forms/Common/TextInput';
import { combineValidators, isRequired } from 'revalidate';
import httpClient from '../../API/httpClient';

const loginValidator = combineValidators({
  email: isRequired({ message: 'Pole e-mail jest wymagane' }),
  password: isRequired({ message: 'Pole hasła jest wymagane' }),
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: [],
    };
  }

  setErrorMessage = (error) => {
    this.setState({
      errorMessage: error,
    });
  };

  handleFinalFormSubmit = (values) => {
    httpClient.Users.login(values)
      .then((response) => {
        this.props.setLogged(true, response);
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
      <Grid>
        <Grid.Row centered columns='1' className='ias-mt-3'>
          <Grid.Column width='6'>
            <Card fluid className='ias-rounded'>
              <Card.Content textAlign='center' className='ias-mt-1'>
                <Card.Header className='ias-2x ias-orange-fg'>
                  <ReactTypingEffect
                    className='ias-thin ias-capitalize'
                    speed='100'
                    text={consts.greetings}
                  />
                </Card.Header>
              </Card.Content>
              <Card.Content textAlign='left' className='ias-pt-3'>
                <FinalForm
                  validate={loginValidator}
                  onSubmit={this.handleFinalFormSubmit}
                  render={({ handleSubmit, invalid, pristine }) => (
                    <Form onSubmit={handleSubmit}>
                      <Field
                        name='email'
                        icon='mail'
                        iconPosition='left'
                        placeholder='E-mail'
                        type='email'
                        className='ias-input-primary ias-rounded'
                        required
                        component={TextInput}
                      />
                      <Field
                        name='password'
                        icon='lock'
                        iconPosition='left'
                        placeholder='Haslo'
                        type='password'
                        className='ias-input-primary ias-rounded'
                        required
                        component={TextInput}
                      />
                      <Container className='ias-my-5'>
                        <Button
                          disabled={invalid || pristine}
                          className='ias-rounded ias-orange-bg ias-white-fg ias-mb-2'
                          size='large'
                          fluid
                        >
                          {consts.signIn}
                        </Button>
                      </Container>
                    </Form>
                  )}
                />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        {this.state.errorMessage.length > 0 ? (
          <Grid.Row centered className='ias-mt-0' columns='1'>
            <Grid.Column width='6'>
              <Message className='ias-orange-bg ias-white-fg ias-rounded'>
                <List>
                  <List.Content floated='left'>
                    {this.state.errorMessage.map((error) => (
                      <List.Item>{error}</List.Item>
                    ))}
                  </List.Content>
                </List>
              </Message>
            </Grid.Column>
          </Grid.Row>
        ) : (
          <></>
        )}
        <Grid.Row centered className='ias-mt-0' columns='1'>
          <Grid.Column width='6' textAlign='center'>
            <Message className='ias-white-bg ias-rounded'>
              {consts.withoutAccount}
              <Link to='/registration'> {consts.signUp} </Link>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default LoginPage;
