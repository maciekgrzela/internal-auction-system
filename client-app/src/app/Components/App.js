import React from 'react';
import PropertiesSidebar from './Sidebar/PropertiesSidebar';
import '../Styles/App.css';
import { Container } from 'semantic-ui-react';
import Main from './Main';
import httpClient from '../API/httpClient';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'PLN',
      amount: 0,
      user: {
        id: null,
        lastName: '',
        firstName: '',
        usersCompanyDetails: null,
        admin: true,
      },
      filterString: null,
      accountMode: false,
      contactMode: false,
      cartMode: false,
    };
  }

  componentWillMount = () => {
    const token = window.localStorage.getItem('jwt');
    if (token != null) {
      httpClient.Users.current()
        .then((response) => {
          this.setLogged(true, response);
        })
        .catch((error) => {});
    }
  };

  setLogged = (isLogged, data) => {
    if (data === null) {
      let loggedUser = this.state.user;
      loggedUser.id = null;
      loggedUser.firstName = null;
      loggedUser.lastName = null;
      loggedUser.usersCompanyDetails = [];
      loggedUser.admin = false;
      this.setState({
        logged: isLogged,
        user: loggedUser,
      });
      window.localStorage.removeItem('jwt');
    } else {
      let loggedUser = this.state.user;
      loggedUser.id = data.id;
      loggedUser.firstName = data.firstName;
      loggedUser.lastName = data.lastName;
      loggedUser.usersCompanyDetails = data.usersCompanyDetails;
      loggedUser.admin = data.role === 'Admin' ? true : false;
      this.setState({
        user: loggedUser,
        logged: isLogged,
      });
      window.localStorage.setItem('jwt', data.token);
    }
  };

  setAccountMode = (mode) => {
    this.setState({
      accountMode: mode,
    });
  };

  setContactMode = (mode) => {
    this.setState({
      contactMode: mode,
    });
  };

  setCartMode = (mode) => {
    this.setState({
      cartMode: mode,
    });
  };

  clearNavbar = () => {
    this.setState({
      accountMode: false,
      contactMode: false,
      cartMode: false,
    });
  };

  updateCompanyDetails = (values) => {
    let loggedUser = this.state.user;
    loggedUser.usersCompanyDetails = values;
    this.setState({
      user: loggedUser,
    });
  };

  setFilterString = (filter) => {
    this.setState({
      filterString: filter,
    });
  };

  render() {
    return (
      <div className='fp-wrapper'>
        <div className='sidebar'>
          <PropertiesSidebar
            updateCompanyDetails={this.updateCompanyDetails}
            accountMode={this.state.accountMode}
            user={this.state.user}
            onSetFilterString={this.setFilterString}
            logged={this.state.logged}
          />
        </div>
        <div className='fp-panel-main'>
          <Container fluid className='ias-py-3 ias-mx-1'>
            <Main
              user={this.state.user}
              amount={this.state.amount}
              currency={this.state.currency}
              clearNavbar={this.clearNavbar}
              accountMode={this.state.accountMode}
              onAccountMode={this.setAccountMode}
              contactMode={this.state.contactMode}
              onContactMode={this.setContactMode}
              cartMode={this.state.cartMode}
              onCartMode={this.setCartMode}
              filterString={this.state.filterString}
              setLogged={this.setLogged}
              logged={this.state.logged}
            />
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
