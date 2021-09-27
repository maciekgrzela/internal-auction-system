import React from 'react';
import '../Styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import ProductList from './Products/List/ProductList';
import Contact from './Contact/Contact';
import Cart from './Cart/Cart';
import Account from './Account/Account';
import Navbar from './Navbar/Navbar';
import ProductInfo from './SingleProduct/ProductInfo';
import LoginPage from './Access/LoginPage';
import RegistrationPage from './Access/RegistrationPage';
import Invoice from './Purchase/Invoice';
import FailurePage from './Purchase/FailurePage';
import SuccessPage from './Purchase/SuccessPage';
import AddProduct from './Products/Add/AddProduct';
import RemoveProduct from './Products/Remove/RemoveProduct';
import ModifyProduct from './Products/Modify/ModifyProduct';
import ModifyProductForm from './Products/Modify/ModifyProductForm';
import MyPurchases from './Purchases/MyPurchases';
import AddLocation from './Locations/Add/AddLocation';
import ListLocation from './Locations/List/ListLocation';
import ModifyLocation from './Locations/Modify/ModifyLocation';
import ListStorage from './Storages/ListStorage';
import AddStorage from './Storages/Add/AddStorage';
import ModifyStorage from './Storages/Modify/ModifyStorage';

class Main extends React.Component {
  state = {
    productsCart: [],
    productsIn: 0,
    totalPrice: 0,
    outOfQuantity: false,
    invoiceDisabled: true,
    additionOccured: false,
  };

  setOutOfQuantity = () => {
    this.setState((prevState) => ({
      outOfQuantity: !prevState.outOfQuantity,
    }));
  };

  refreshProductList = () => {
    this.setState((prevState) => ({
      additionOccured: !prevState.additionOccured,
    }));
  };

  globalChange = (productsToCart) => {
    let productsInBusket = 0;
    this.state.productsCart.map(
      (product) => (productsInBusket = productsInBusket + product['amount'])
    );

    let totalPrice = 0;
    this.state.productsCart.map(
      (product) => (totalPrice = totalPrice + product['amount'] * product.price)
    );

    if (
      this.state.productsCart.some(
        (product) => product.name === productsToCart.name
      )
    ) {
      const indexToChange = this.state.productsCart.findIndex(
        (product) => product.name === productsToCart.name
      );
      const newProducts = this.state.productsCart;
      if (newProducts[indexToChange].amount + 1 <= productsToCart.quantity) {
        newProducts[indexToChange].amount =
          newProducts[indexToChange].amount + 1;

        productsInBusket = productsInBusket + 1;
        totalPrice = totalPrice + productsToCart.price;

        this.setState({
          productsCart: newProducts,
          productsIn: productsInBusket,
          totalPrice: totalPrice,
          invoiceDisabled: false,
        });
      } else {
        this.setState({
          outOfQuantity: true,
        });
      }
    } else {
      productsToCart['amount'] = 1;
      productsInBusket = productsInBusket + 1;
      totalPrice = totalPrice + productsToCart.price;

      this.setState({
        productsCart: [...this.state.productsCart, productsToCart],
        productsIn: productsInBusket,
        totalPrice: totalPrice,
        invoiceDisabled: false,
      });
    }
  };

  handleNewAmount = (productWithNewAmount) => {
    const indexToChange = this.state.productsCart.findIndex(
      (product) => product === productWithNewAmount
    );

    const newProducts = this.state.productsCart;
    newProducts[indexToChange] = productWithNewAmount;

    let productsInBusket = 0;
    newProducts.map(
      (product) => (productsInBusket = productsInBusket + product['amount'])
    );

    let totalPrice = 0;
    newProducts.map(
      (product) => (totalPrice = totalPrice + product['amount'] * product.price)
    );

    this.setState({
      productsCart: newProducts,
      productsIn: productsInBusket,
      totalPrice: totalPrice,
      invoiceDisabled: false,
    });
  };

  deleteProductFromBasket = (productToDelete) => {
    const indexToDelete = this.state.productsCart.findIndex(
      (product) => product === productToDelete
    );
    let newProducts = this.state.productsCart;

    newProducts.splice(indexToDelete, 1);

    let productsInBusket = 0;
    newProducts.map(
      (product) => (productsInBusket = productsInBusket + product['amount'])
    );

    let totalPrice = 0;
    newProducts.map(
      (product) => (totalPrice = totalPrice + product['amount'] * product.price)
    );

    if (newProducts.length === 0) {
      this.setState({
        productsCart: newProducts,
        productsIn: productsInBusket,
        totalPrice: totalPrice,
        invoiceDisabled: true,
      });
    } else {
      this.setState({
        productsCart: newProducts,
        productsIn: productsInBusket,
        totalPrice: totalPrice,
        invoiceDisabled: false,
      });
    }
  };

  clearAll = () => {
    const newProducts = [];
    const productsNumber = 0;
    const total = 0;

    this.setState({
      productsCart: newProducts,
      productsIn: productsNumber,
      totalPrice: total,
      invoiceDisabled: true,
    });
  };

  render() {
    return (
      <Router>
        <Navbar
          totalPrice={this.state.totalPrice}
          accountMode={this.props.accountMode}
          onAccountMode={this.props.onAccountMode}
          contactMode={this.props.contactMode}
          onContactMode={this.props.onContactMode}
          cartMode={this.props.cartMode}
          onCartMode={this.props.onCartMode}
          user={this.props.user}
          amount={this.props.amount}
          currency={this.props.currency}
          quantity={this.state.productsIn}
          logged={this.props.logged}
          setLogged={this.props.setLogged}
        />
        <Switch>
          <Route exact path='/'>
            {this.props.logged === true ? (
              <ProductList
                clearNavbar={this.props.clearNavbar}
                cart={this.state.productsCart}
                user={this.props.user}
                currency={this.props.currency}
                loading={this.props.loading}
                setOutOfQuantity={this.setOutOfQuantity}
                outOfQuantity={this.state.outOfQuantity}
                filterString={this.props.filterString}
                productsCart={this.state.productsCart}
                globalChange={this.globalChange}
                increaseAmount={this.increaseAmount}
                additionOccured={this.state.additionOccured}
              />
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/cart'>
            {this.props.logged === true ? (
              <Cart
                products={this.state.productsCart}
                currency={this.props.currency}
                invoiceDisabled={this.state.invoiceDisabled}
                user={this.props.user}
                totalPrice={this.state.totalPrice}
                handleNewAmount={this.handleNewAmount}
                deleteProductFromBasket={this.deleteProductFromBasket}
                clearAll={this.clearAll}
              />
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/successfulPurchase'>
            {this.props.logged === true ? (
              <SuccessPage />
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/failure'>
            {this.props.logged === true ? (
              <FailurePage />
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/invoice'>
            {this.props.logged === true ? (
              <Invoice
                cart={this.state.productsCart}
                clearCart={this.clearAll}
                user={this.props.user}
              />
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/product/info' component={ProductInfo}></Route>
          <Route path='/product/edit' component={ModifyProductForm}></Route>
          <Route path='/product/add'>
            {this.props.logged === true ? (
              this.props.user.admin === true ? (
                <AddProduct />
              ) : (
                <Redirect to={{ pathname: '/' }} />
              )
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/product/remove'>
            {this.props.logged === true ? (
              this.props.user.admin === true ? (
                <RemoveProduct />
              ) : (
                <Redirect to={{ pathname: '/' }} />
              )
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/product/modify'>
            {this.props.logged === true ? (
              this.props.user.admin === true ? (
                <ModifyProduct />
              ) : (
                <Redirect to={{ pathname: '/' }} />
              )
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/location/add'>
            {this.props.logged === true ? (
              this.props.user.admin === true ? (
                <AddLocation />
              ) : (
                <Redirect to={{ pathname: '/' }} />
              )
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/location/modify'>
            {this.props.logged === true ? (
              this.props.user.admin === true ? (
                <ListLocation />
              ) : (
                <Redirect to={{ pathname: '/' }} />
              )
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/location/edit' component={ModifyLocation}></Route>
          <Route path='/location/remove'>
            {this.props.logged === true ? (
              this.props.user.admin === true ? (
                <ListLocation />
              ) : (
                <Redirect to={{ pathname: '/' }} />
              )
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/storage/list'>
            {this.props.logged === true ? (
              this.props.user.admin === true ? (
                <ListStorage />
              ) : (
                <Redirect to={{ pathname: '/' }} />
              )
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/storage/add'>
            {this.props.logged === true ? (
              this.props.user.admin === true ? (
                <AddStorage />
              ) : (
                <Redirect to={{ pathname: '/' }} />
              )
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/storage/modify' component={ModifyStorage}></Route>
          <Route path='/account'>
            {this.props.logged === true ? (
              this.props.accountMode === true ? (
                <Account user={this.props.user} />
              ) : (
                <Redirect to={{ pathname: '/' }} />
              )
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/login'>
            {this.props.logged === true ? (
              <Redirect to={{ pathname: '/' }} />
            ) : (
              <LoginPage setLogged={this.props.setLogged} />
            )}
          </Route>
          <Route path='/registration'>
            {this.props.logged === true ? (
              <Redirect to={{ pathname: '/' }} />
            ) : (
              <RegistrationPage setLogged={this.props.setLogged} />
            )}
          </Route>
          <Route path='/contact'>
            {this.props.logged === true ? (
              <Contact user={this.props.user} />
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
          <Route path='/purchase/list'>
            {this.props.logged === true ? (
              <MyPurchases user={this.props.user} />
            ) : (
              <Redirect to={{ pathname: '/login' }} />
            )}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Main;
