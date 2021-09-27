import React from 'react';
import { Item, Grid, Header, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import consts from '../../Consts/consts.json';
import httpClient from '../../API/httpClient';

export const ProductBrief = (props) => {
  const prepareSpecification = (device) => {
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

  const removeProduct = () => {
    switch (props.product.type) {
      case consts.device.type.laptop.typename:
        httpClient.Laptops.delete(props.product.id)
          .then(() => {
            props.handleRemoveSuccess(props.product.id);
          })
          .catch((error) => {
            if (error.response) {
              props.handleRemoveError(consts.prompts.addElement.error.client);
            } else if (error.request) {
              props.handleRemoveError(consts.prompts.addElement.error.server);
            } else {
              props.handleRemoveError(consts.prompts.addElement.error.client);
            }
          });
        break;
      case consts.device.type.monitor.typename:
        httpClient.Monitors.delete(props.product.id)
          .then(() => {
            props.handleRemoveSuccess(props.product.id);
          })
          .catch((error) => {
            if (error.response) {
              props.handleRemoveError(consts.prompts.addElement.error.client);
            } else if (error.request) {
              props.handleRemoveError(consts.prompts.addElement.error.server);
            } else {
              props.handleRemoveError(consts.prompts.addElement.error.client);
            }
          });
        break;
      case consts.device.type.pc.typename:
        httpClient.PCs.delete(props.product.id)
          .then(() => {
            props.handleRemoveSuccess(props.product.id);
          })
          .catch((error) => {
            if (error.response) {
              props.handleRemoveError(consts.prompts.addElement.error.client);
            } else if (error.request) {
              props.handleRemoveError(consts.prompts.addElement.error.server);
            } else {
              props.handleRemoveError(consts.prompts.addElement.error.client);
            }
          });
        break;
      case consts.device.type.otherdevice.typename:
        httpClient.OtherDevices.delete(props.product.id)
          .then(() => {
            props.handleRemoveSuccess(props.product.id);
          })
          .catch((error) => {
            if (error.response) {
              props.handleRemoveError(consts.prompts.addElement.error.client);
            } else if (error.request) {
              props.handleRemoveError(consts.prompts.addElement.error.server);
            } else {
              props.handleRemoveError(consts.prompts.addElement.error.client);
            }
          });
        break;
      default:
        break;
    }
  };

  return (
    <Item>
      <Item.Image
        className='ias-p-2 ias-mr-2'
        src={'/assets/images/' + props.product.type.toLowerCase() + '.svg'}
      />
      <Item.Content className='ias-pt-1'>
        <Item.Header>
          <Link
            to={{
              pathname: `/product/info/${props.product.type}/${props.product.id}`,
              state: {
                product: props.product,
              },
            }}
          >
            {props.product.name}
          </Link>
        </Item.Header>
        <Item.Meta></Item.Meta>
        <Item.Description>
          <Grid>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column width={12}>
                <Header.Subheader>
                  <b className='ias-capitalize ias-pr-1'>{consts.location}</b>
                  {props.product.storage === null
                    ? 'Brak informacji'
                    : props.product.storage.name +
                      ', ' +
                      props.product.storage.location.city}
                </Header.Subheader>
                <Header.Subheader>
                  <b className='ias-capitalize ias-pr-1'>
                    {consts.deviceStatus}
                  </b>
                  {props.product.destination == null
                    ? 'Brak informacji'
                    : props.product.destination.description}
                </Header.Subheader>
                <Header.Subheader>
                  <b className='ias-capitalize ias-pr-1'>{consts.connectors}</b>
                  {props.product.interfacePorts}
                </Header.Subheader>
                <Header.Subheader>
                  <b className='ias-capitalize ias-pr-1'>
                    {consts.specification}
                  </b>
                  {prepareSpecification(props.product)}
                </Header.Subheader>
                <Header.Subheader>
                  <b className='ias-capitalize ias-pr-1'>Dodano:</b>
                  {new Date(props.product.created).toLocaleString()}
                </Header.Subheader>
                <Header.Subheader>
                  <b className='ias-capitalize ias-pr-1'>Kwota:</b>
                  {props.product.price + 'PLN'}
                </Header.Subheader>
              </Grid.Column>
              <Grid.Column width={4}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column textAlign='center'>
                      {props.removeMode === true ? (
                        <Button
                          color='red'
                          className='ias-rounded ias-capitalize ias-thin ias-shadow'
                          onClick={removeProduct}
                        >
                          <Container
                            fluid
                            className='ias-flex ias-flex-ai-center'
                          >
                            <span className='ias-pr-1'>
                              {consts.removeProduct}
                            </span>
                            <FiTrash2 />
                          </Container>
                        </Button>
                      ) : (
                        <Link
                          to={{
                            pathname: `/product/edit/${props.product.type}/${props.product.id}`,
                            state: {
                              product: props.product,
                            },
                          }}
                        >
                          <Button className='ias-orange-bg ias-white-fg ias-mb-1 ias-rounded ias-capitalize ias-thin ias-shadow'>
                            <Container
                              fluid
                              className='ias-flex ias-flex-ai-center'
                            >
                              <span className='ias-pr-1'>
                                {consts.modifyProduct}
                              </span>
                              <FiEdit />
                            </Container>
                          </Button>
                        </Link>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Item.Description>
      </Item.Content>
    </Item>
  );
};
