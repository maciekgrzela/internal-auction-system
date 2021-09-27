import React from 'react';
import {
  Grid,
  Header,
  Item,
  Label,
  Button,
  Container,
  Segment,
} from 'semantic-ui-react';
import '../../../Styles/App.css';
import { FiShoppingCart } from 'react-icons/fi';
import consts from '../../../Consts/consts.json';
import { Link } from 'react-router-dom';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inCart: 0,
    };
  }

  prepareSpecification = (device) => {
    let specs = '';
    switch (device.type.toLowerCase()) {
      case consts.device.type.laptop.typename:
        specs += device.processor === null ? '' : device.processor + '/';
        specs +=
          device.memoryAmount === null ? '' : device.memoryAmount + 'GB/';
        specs += device.diskDrive === null ? '' : device.diskDrive + '/';
        specs +=
          device.operatingSystem === null ? '' : device.operatingSystem + '/';
        break;
      case consts.device.type.pc.typename:
        specs += device.processor === null ? '' : device.processor + '/';
        specs +=
          device.memoryAmount === null ? '' : device.memoryAmount + 'GB/';
        specs += device.diskDrive === null ? '' : device.diskDrive + '/';
        specs +=
          device.operatingSystem === null ? '' : device.operatingSystem + '/';
        specs +=
          device.extensionsCards === null ? '' : device.extensionsCards + '/';
        break;
      case consts.device.type.monitor.typename:
        specs +=
          device.screenResolution === null ? '' : device.screenResolution + '/';
        specs += device.diagonal === null ? '' : device.diagonal + '/';
        specs += device.matrix === null ? '' : device.matrix + '/';
        specs += device.refreshing === null ? '' : device.refreshing + 'Hz/';
        specs += device.contrast === null ? '' : device.contrast + '/';
        break;
      case consts.device.type.otherdevice.typename:
        specs = device.features === null ? '' : device.features;
        break;
      default:
        specs = '';
        break;
    }
    return specs;
  };

  prepareType(type) {
    let returnedType = null;
    switch (type.toLowerCase()) {
      case consts.device.type.laptop.typename:
        returnedType = consts.device.type.laptop.displayName;
        break;
      case consts.device.type.monitor.typename:
        returnedType = consts.device.type.monitor.displayName;
        break;
      case consts.device.type.pc.typename:
        returnedType = consts.device.type.pc.displayName;
        break;
      case consts.device.type.otherdevice.typename:
        returnedType = consts.device.type.otherdevice.displayName;
        break;
      default:
        returnedType = consts.device.type.otherdevice.displayName;
    }
    return returnedType;
  }

  componentDidMount = () => {
    let foundInCart = this.props.cart.find(
      (product) => product.name === this.props.product.name
    );
    if (foundInCart !== undefined) {
      this.setState({
        inCart: foundInCart.amount,
      });
    }
  };

  addToBuy = () => {
    this.props.change(this.props.product);
    if (this.state.inCart < this.props.product.quantity) {
      this.setState((prevState) => ({
        inCart: prevState.inCart + 1,
      }));
    }
  };

  render() {
    return (
      <Item>
        <Item.Image
          className='ias-p-2 ias-mr-2'
          src={
            '/assets/images/' + this.props.product.type.toLowerCase() + '.svg'
          }
        />
        <div className='ias-absolute'>
          <Label circular className='ias-orange-bg ias-white-fg'>
            <span className='ias-m-1'>
              Pozostało: {this.props.product.quantity - this.state.inCart}
            </span>
          </Label>
        </div>
        <div className='ias-absolute ias-mt-2'>
          <Label
            circular
            className='ias-white-bg ias-orange-fg ias-orange-border'
          >
            <span className='ias-m-1'>Wybrałeś: {this.state.inCart}</span>
          </Label>
        </div>
        <Item.Content>
          <Item.Header>
            <Link
              to={{
                pathname: `/product/info/${this.props.product.type}/${this.props.product.id}`,
                state: {
                  product: this.props.product,
                },
              }}
            >
              {this.props.product.name}
            </Link>
          </Item.Header>
          <Item.Meta>
            <span className='cinema'>
              {consts.type} {this.prepareType(this.props.product.type)}
            </span>
          </Item.Meta>
          <Item.Description>
            <Grid>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Header.Subheader>
                    <b className='ias-capitalize ias-pr-1'>{consts.location}</b>
                    {this.props.product.storage === null
                      ? 'Brak informacji'
                      : this.props.product.storage.name +
                        ', ' +
                        this.props.product.storage.location.city}
                  </Header.Subheader>
                  <Header.Subheader>
                    <b className='ias-capitalize ias-pr-1'>
                      {consts.deviceStatus}
                    </b>
                    {this.props.product.destination == null
                      ? 'Brak informacji'
                      : this.props.product.destination.description}
                  </Header.Subheader>
                  <Header.Subheader>
                    <b className='ias-capitalize ias-pr-1'>
                      {consts.connectors}
                    </b>
                    {this.props.product.interfacePorts}
                  </Header.Subheader>
                  <Header.Subheader>
                    <b className='ias-capitalize ias-pr-1'>
                      {consts.specification}
                    </b>
                    {this.prepareSpecification(this.props.product)}
                  </Header.Subheader>
                  <Header.Subheader>
                    <b className='ias-capitalize ias-pr-1'>Dodano:</b>
                    {new Date(this.props.product.created).toLocaleString()}
                  </Header.Subheader>
                  {this.props.product.comment !== null ? (
                    <Item.Extra>
                      <Segment
                        className='ias-rounded ias-italic ias-dark-fg'
                        color='orange'
                      >
                        {'Komentarz pracownika: "' +
                          this.props.product.comment +
                          '"'}
                      </Segment>
                    </Item.Extra>
                  ) : (
                    <></>
                  )}
                  {this.props.user.admin === true &&
                  this.props.product.adminsToDo !== null ? (
                    <Item.Extra>
                      <Segment
                        className='ias-rounded ias-italic ias-dark-fg'
                        color='red'
                      >
                        {'Przed sprzedaza: "' +
                          this.props.product.adminsToDo +
                          '"'}
                      </Segment>
                    </Item.Extra>
                  ) : (
                    <></>
                  )}
                </Grid.Column>
                <Grid.Column width={4}>
                  <Grid>
                    <Grid.Row className='ias-px-0'>
                      <Grid.Column>
                        <Header
                          textAlign='center'
                          size='huge'
                          className='ias-thin'
                        >
                          {this.props.product.price + ' ' + this.props.currency}
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column textAlign='center'>
                        <Button
                          className='ias-orange-bg ias-white-fg ias-rounded ias-capitalize ias-thin ias-shadow'
                          onClick={this.addToBuy}
                        >
                          <Container
                            fluid
                            className='ias-flex ias-flex-ai-center'
                          >
                            <span className='ias-pr-1'>
                              {consts.toShoppingCart}
                            </span>
                            <FiShoppingCart />
                          </Container>
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Item.Description>
          <Item.Extra>
            <Label
              className='ias-rounded'
              icon='chart line'
              content={
                this.props.product.interest == null
                  ? 'Zainteresowanie: Brak informacji'
                  : 'Zainteresowanie: ' +
                    this.props.product.interest.description
              }
            />
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default Product;
