import React from 'react';
import {
  Grid,
  Card,
  Header,
  Accordion,
  Image,
  Button,
} from 'semantic-ui-react';
import '../../Styles/App.css';
import consts from '../../Consts/consts.json';
import MonitorTable from './MonitorTable';
import PCTable from './PCTable';
import LaptopTable from './LaptopTable';
import OtherDeviceTable from './OtherDeviceTable';
import { FiChevronsDown, FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ShowTable = (props) => {
  const product = props.product;
  const productType = product.type;
  switch (productType) {
    case consts.device.type.monitor.typename:
      return <MonitorTable product={product} />;
    case consts.device.type.pc.typename:
      return <PCTable product={product} />;
    case consts.device.type.laptop.typename:
      return <LaptopTable product={product} />;
    case consts.device.type.otherdevice.typename:
      return <OtherDeviceTable product={product} />;
    default:
      return <></>;
  }
};

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
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

  render() {
    const { activeIndex } = this.state;
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
                    className='ias-thin ias-2x ias-flex ias-flex-ai-center ias-capitalize ias-pt-1'
                    dividing
                  >
                    <Link to='/'>
                      <Button className='ias-mr-1 ias-white-bg ias-orange-fg ias-orange-border ias-rounded'>
                        <FiHome />
                      </Button>
                    </Link>
                    {consts.productDetails}
                  </Header>
                </Card.Header>{' '}
                <br />
                <div className='chosenProductDetails'>
                  <Image
                    src={
                      '/assets/images/' + product.type.toLowerCase() + '.svg'
                    }
                    size='small'
                  />
                  <p className='chosenProductDetails'>
                    <span>{product.name}</span>
                  </p>
                </div>{' '}
                <br />
                <Card.Content>
                  <b className='ias-capitalize ias-pr-1'>{consts.type} </b>
                  {this.prepareType(product.type)}
                </Card.Content>
                <Card.Content>
                  <b className='ias-capitalize ias-pr-1'>{consts.cost}: </b>
                  {product.price} zl
                </Card.Content>
                <Card.Content>
                  <b className='ias-capitalize ias-pr-1'>{consts.location}:</b>
                  {product.storage === null
                    ? 'Brak informacji'
                    : product.storage.name +
                      ', ' +
                      product.storage.location.city}
                </Card.Content>
                <Card.Content>
                  <b className='ias-capitalize ias-pr-1'>
                    {consts.deviceStatus}:
                  </b>
                  {product.destination == null
                    ? 'Brak informacji'
                    : product.destination.description}
                </Card.Content>
                <Card.Content>
                  <b className='ias-capitalize ias-pr-1'>
                    {consts.connectors}:
                  </b>
                  {product.interfacePorts}
                </Card.Content>
                <Card.Content>
                  <b className='ias-capitalize ias-pr-1'>{consts.quantity}:</b>
                  {product.quantity + 'szt'}
                </Card.Content>
                <br />
                <Accordion fluid className='ias-rounded' styled>
                  <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={this.handleClick}
                    className='chosenProductDetails'
                  >
                    <FiChevronsDown className='ias-my-1' />
                    Szczegolowa specyfikacja produktu
                    <FiChevronsDown className='ias-my-1' />
                  </Accordion.Title>

                  <Accordion.Content active={activeIndex === 0}>
                    <ShowTable product={product} />
                  </Accordion.Content>
                </Accordion>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ProductInfo;
