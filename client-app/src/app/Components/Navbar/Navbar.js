import React from 'react';
import { Grid, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {
  FiSettings,
  FiPhone,
  FiShoppingBag,
  FiShoppingCart,
  FiLogOut,
} from 'react-icons/fi';
import consts from '../../Consts/consts.json';

class Navbar extends React.Component {
  handleLogout = () => {
    this.props.setLogged(false, null);
  };

  render() {
    if (this.props.logged === true) {
      return (
        <Grid>
          <Grid.Row className='ias-mb-2'>
            <Grid.Column floated='left' width={1}></Grid.Column>
            <Grid.Column floated='right' width={15} textAlign='right'>
              <Button
                className='ias-rounded ias-shadow'
                size='large'
                color='red'
              >
                <Container fluid className='ias-flex ias-flex-ai-center'>
                  <FiLogOut onClick={this.handleLogout} />
                </Container>
              </Button>
              <Button
                className='ias-orange-bg ias-white-fg ias-rounded ias-shadow'
                size='large'
              >
                <Container fluid className='ias-flex ias-flex-ai-center'>
                  {this.props.accountMode === false ? (
                    <>
                      <Link
                        to='/account'
                        onClick={() => {
                          this.props.onAccountMode(true);
                          this.props.onContactMode(false);
                          this.props.onCartMode(false);
                        }}
                        className='ias-inverted ias-thin'
                      >
                        <FiSettings />
                      </Link>
                    </>
                  ) : (
                    <>
                      <FiShoppingCart />
                      <Link
                        to='/'
                        onClick={() => {
                          this.props.onAccountMode(false);
                          this.props.onContactMode(false);
                          this.props.onCartMode(false);
                        }}
                        className='ias-inverted ias-thin ias-py-1'
                      >
                        {consts.goToShopping}
                      </Link>
                    </>
                  )}
                </Container>
              </Button>
              <Button
                className='ias-orange-bg ias-white-fg ias-rounded ias-shadow'
                size='large'
              >
                <Container fluid className='ias-flex ias-flex-ai-center'>
                  {this.props.contactMode === false ? (
                    <Link
                      to='/contact'
                      onClick={() => {
                        this.props.onContactMode(true);
                        this.props.onAccountMode(false);
                        this.props.onCartMode(false);
                      }}
                      className='ias-inverted ias-thin'
                    >
                      <FiPhone />
                    </Link>
                  ) : (
                    <>
                      <FiShoppingCart />
                      <Link
                        to='/'
                        onClick={() => {
                          this.props.onContactMode(false);
                          this.props.onAccountMode(false);
                          this.props.onCartMode(false);
                        }}
                        className='ias-inverted ias-thin ias-py-1'
                      >
                        {consts.goToShopping}
                      </Link>
                    </>
                  )}
                </Container>
              </Button>
              <Button
                className='ias-orange-bg ias-white-fg ias-rounded ias-shadow'
                size='large'
              >
                <Container fluid className='ias-flex ias-flex-ai-center'>
                  {this.props.cartMode === false ? (
                    <>
                      <FiShoppingBag />
                      <Link
                        to='/cart'
                        className='ias-inverted ias-thin ias-pl-1'
                        onClick={() => {
                          this.props.onCartMode(true);
                          this.props.onContactMode(false);
                          this.props.onAccountMode(false);
                        }}
                      >
                        {this.props.totalPrice.toFixed(2) + ' PLN'}
                      </Link>
                    </>
                  ) : (
                    <>
                      <FiShoppingCart />
                      <Link
                        to='/'
                        onClick={() => {
                          this.props.onContactMode(false);
                          this.props.onAccountMode(false);
                          this.props.onCartMode(false);
                        }}
                        className='ias-inverted ias-thin ias-py-1'
                      >
                        {consts.goToShopping}
                      </Link>
                    </>
                  )}
                </Container>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return <></>;
    }
  }
}

export default Navbar;
