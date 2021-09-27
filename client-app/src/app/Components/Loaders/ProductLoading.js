import React from 'react';
import { Item, Placeholder } from 'semantic-ui-react';
import '../../Styles/App.css';

class ProductLoading extends React.Component {
  render() {
    return (
      <Item>
        <Placeholder>
          <Placeholder.Image style={{ width: 150, height: 150 }} />
        </Placeholder>
        <Item.Content className='ias-ml-3'>
          <Item.Header as='h2'>
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          </Item.Header>
          <Item.Meta>
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          </Item.Meta>
          <Item.Description>
            <Placeholder>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder>
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}

export default ProductLoading;
