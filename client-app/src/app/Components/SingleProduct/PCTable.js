import React from 'react';
import '../../Styles/App.css';
import consts from '../../Consts/consts.json';
import { Table } from 'semantic-ui-react';

const PCTable = (props) => {
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
          <Table.Cell>{consts.device.processor}</Table.Cell>
          <Table.Cell>{product.processor}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.memoryAmount}</Table.Cell>
          <Table.Cell>{product.memoryAmount}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.graphicsCard}</Table.Cell>
          <Table.Cell>{product.graphicsCard}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.diskDrive}</Table.Cell>
          <Table.Cell>{product.diskDrive}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.extensionsCards}</Table.Cell>
          <Table.Cell>{product.extensionsCards}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.operatingSystem}</Table.Cell>
          <Table.Cell>{product.operatingSystem}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{consts.device.created}</Table.Cell>
          <Table.Cell>{new Date(product.created).toLocaleString()}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default PCTable;
