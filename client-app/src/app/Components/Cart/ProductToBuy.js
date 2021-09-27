import React from 'react';
import { Grid, Button, Image } from 'semantic-ui-react';
import '../../Styles/App.css';
import consts from '../../Consts/consts.json';

class ProductToBuy extends React.Component {
  state = { minusDisabled: false, plusDisabled: false };

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

  handlePlus = () => {
    if (this.props.product.amount + 1 === this.props.product.quantity) {
      this.setState({
        plusDisabled: true,
      });
    }
    if (this.props.product.amount + 1 > 0) {
      this.setState({
        minusDisabled: false,
      });
    }
    let newAmount = this.props.product.amount;
    newAmount = newAmount + 1;

    let productWithNewAmount = this.props.product;
    productWithNewAmount.amount = newAmount;
    this.props.handleNewAmount(productWithNewAmount);
  };

  handleMinus = () => {
    if (this.props.product.amount - 2 === 0) {
      this.setState({
        minusDisabled: true,
      });
    }
    if (this.props.product.amount - 2 < this.props.product.quantity) {
      this.setState({
        plusDisabled: false,
      });
    }
    let newAmount = this.props.product.amount;
    newAmount = newAmount - 1;

    if (newAmount > 0) {
      let productWithNewAmount = this.props.product;
      productWithNewAmount.amount = newAmount;
      this.props.handleNewAmount(productWithNewAmount);
    }
  };

  handleDelete = () => {
    this.props.deleteProductFromBasket(this.props.product);
  };

  render() {
    return (
      <Grid columns='equal'>
        <Grid.Row className='mb-1'>
          <Grid.Column textAlign='center'>
            <Image
              className='ias-p-1'
              src={
                '/assets/images/' +
                this.props.product.type.toLowerCase() +
                '.svg'
              }
              size='small'
              verticalAlign='middle'
            />
          </Grid.Column>

          <Grid.Column textAlign='left' verticalAlign='middle'>
            <Grid.Row>
              <p className='nameToBuy'> {this.props.product.name} </p>
            </Grid.Row>

            <Grid.Row>
              <b className='ias-capitalize ias-pr-1'>{consts.type}</b>
              {this.prepareType(this.props.product.type)}
            </Grid.Row>
            <Grid.Row>
              <b className='ias-capitalize ias-pr-1'>{consts.connectors}</b>
              {this.props.product.interfacePorts}
            </Grid.Row>
            <Grid.Row>
              <b className='ias-capitalize ias-pr-1'>{consts.specification}</b>
              {this.prepareSpecification(this.props.product)}
            </Grid.Row>
          </Grid.Column>

          <Grid.Column textAlign='center' verticalAlign='middle'>
            <div>
              <p>{this.props.product.amount}</p>
              <p>
                {this.props.product.quantity > 1 ? (
                  <>
                    <Button
                      className='ias-orange-bg ias-white-fg'
                      onClick={this.handleMinus}
                      circular
                      disabled={this.state.minusDisabled}
                      icon='minus'
                      size='mini'
                    />
                    <Button
                      className='ias-orange-bg ias-white-fg'
                      onClick={this.handlePlus}
                      circular
                      disabled={this.state.plusDisabled}
                      icon='plus'
                      size='mini'
                    />
                  </>
                ) : (
                  <></>
                )}
                <Button
                  onClick={this.handleDelete}
                  color='red'
                  className='ias-m-0 deleteIcon ias-white-fg'
                  icon='trash'
                  circular
                  size='mini'
                />
              </p>
            </div>
          </Grid.Column>

          <Grid.Column textAlign='center' verticalAlign='middle'>
            <p className='price'>
              {(this.props.product.amount * this.props.product.price).toFixed(
                2
              )}
              {this.props.currency}
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ProductToBuy;
