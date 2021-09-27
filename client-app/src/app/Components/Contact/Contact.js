import React from 'react';
import {
  Header,
  Card,
  Grid,
  Form,
  Button,
  Icon,
  Message,
} from 'semantic-ui-react';
import consts from '../../Consts/consts.json';
import Recaptcha from 'react-recaptcha';
import '../../Styles/App.css';
import emailjs from 'emailjs-com';

class Contact extends React.Component {
  state = {
    topic: '',
    name: '',
    lastName: '',
    about: '',
    email: '',
    sent: false,
    isVerified: false,
    captchaError: false,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  componentDidMount = () => {
    this.setState({
      name: this.props.user.firstName,
      lastName: this.props.user.lastName,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let templateParams = {
      email: this.state.email,
      topic: this.state.topic,
      name: this.state.name,
      lastName: this.state.lastName,
      about: this.state.about,
    };

    if (this.state.isVerified) {
      emailjs.send(
        'contact_service',
        'contact_form',
        templateParams,
        'user_WBazeor9XtyDwMuGQD8s3'
      );
      this.recaptchaInstance.reset();
      this.setState({
        topic: '',
        name: '',
        lastName: '',
        about: '',
        email: '',
        isVerified: false,
        sent: true,
        captchaError: false,
      });
    } else {
      this.setState({
        captchaError: true,
      });
    }
  };

  verifyCallback = (response) => {
    if (response) {
      this.setState({ isVerified: true });
    }
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
                    {consts.contactForm}
                  </Header>
                </Card.Header>

                {this.state.sent === true ? (
                  <Message
                    attached
                    header='Wyslano'
                    content='Wiadomosc zostala poprawnie wyslana do administratora'
                    color='green'
                    className='ias-rounded'
                    size='tiny'
                  />
                ) : (
                  <Message
                    attached
                    header='Witamy z sekcji kontaktowej!'
                    content='Okresl temat wiadomosci, wypelnij formularz i skontaktuj sie z administratorami sprzetu'
                    color='orange'
                    className='ias-rounded'
                    size='tiny'
                  />
                )}

                {this.state.captchaError === true ? (
                  <Message
                    attached
                    header='Captcha'
                    content='Aby wyslac zapytanie musisz zweryfikowac swoja tozsamosc za pomoca pola Captcha'
                    color='red'
                    className='ias-mt-2 ias-rounded'
                    size='tiny'
                  />
                ) : (
                  <></>
                )}

                <Card.Description className='ias-pt-3'>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                      <Form.Input
                        fluid
                        label='Temat'
                        name='topic'
                        className='ias-input-primary'
                        value={this.state.topic}
                        placeholder='Temat...'
                        onChange={this.handleChange}
                        required
                      />
                      <Form.Input
                        fluid
                        label='Imie'
                        placeholder='Imie ...'
                        name='name'
                        className='ias-input-primary'
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        fluid
                        label='Nazwisko'
                        placeholder='Nazwisko ...'
                        name='lastName'
                        className='ias-input-primary'
                        value={this.state.lastName}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.TextArea
                      label='Opis pytania'
                      placeholder='Opisz swoje zapytanie...'
                      className='ias-rounded ias-input-primary'
                      name='about'
                      value={this.state.about}
                      onChange={this.handleChange}
                      required
                    />
                    <Form.Input
                      fluid
                      label='Email'
                      placeholder='Email...'
                      name='email'
                      className='ias-input-primary'
                      value={this.state.email}
                      width={8}
                      onChange={this.handleChange}
                      required
                    />
                    <Recaptcha
                      sitekey='6Ld_LKoZAAAAAEqACg_VAFAkOa0IXSPvDVErXJHs'
                      verifyCallback={this.verifyCallback}
                      render='explicit'
                      onloadCallback={() => {}}
                      ref={(e) => (this.recaptchaInstance = e)}
                    />
                    <Button
                      animated
                      className='ias-rounded ias-orange-bg ias-white-fg'
                      floated='right'
                      size='medium'
                    >
                      <Button.Content visible>Wyslij!</Button.Content>
                      <Button.Content hidden>
                        <Icon name='envelope' />
                      </Button.Content>
                    </Button>
                  </Form>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Contact;
