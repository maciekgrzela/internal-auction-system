import React from 'react';
import '../../Styles/App.css';
import consts from '../../Consts/consts.json';
import { Table } from 'semantic-ui-react';

const MonitorTable = (props) => {
  const product = props.product;

  return (
    <Table unstackable className='ias-rounded' celled>
      <Table.Header className='ias-rounded'>
        <Table.Row>
          <Table.HeaderCell className='ias-rounded-top-left ias-flex ias-flex-ai-center'>
            {consts.parameter}
          </Table.HeaderCell>
          <Table.HeaderCell className='ias-rounded-top-right ias-flex-ai-center'>
            {consts.technicalData}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>{consts.device.producer}</Table.Cell>
          <Table.Cell>{product.producer}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.saleReason}</Table.Cell>
          <Table.Cell>{product.saleReason}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.tested}</Table.Cell>
          <Table.Cell>{product.tested === false ? 'NIE' : 'TAK'}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.serviceTag}</Table.Cell>
          <Table.Cell>{product.serviceTag}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.interfacePorts}</Table.Cell>
          <Table.Cell>{product.interfacePorts}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.weight}</Table.Cell>
          <Table.Cell>{product.weight}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.length}</Table.Cell>
          <Table.Cell>{product.length}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.height}</Table.Cell>
          <Table.Cell>{product.height}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.screenResolution}</Table.Cell>
          <Table.Cell>{product.screenResolution}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.hasTouchScreen}</Table.Cell>
          <Table.Cell>
            {product.hasTouchScreen === false ? 'NIE' : 'TAK'}
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.hasSpeakers}</Table.Cell>
          <Table.Cell>
            {product.hasSpeakers === false ? 'NIE' : 'TAK'}
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.diagonal}</Table.Cell>
          <Table.Cell>{product.diagonal}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.matrix}</Table.Cell>
          <Table.Cell>{product.matrix}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.refreshing}</Table.Cell>
          <Table.Cell>{product.refreshing}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.contrast}</Table.Cell>
          <Table.Cell>{product.contrast}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.created}</Table.Cell>
          <Table.Cell>{new Date(product.created).toLocaleString()}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default MonitorTable;
