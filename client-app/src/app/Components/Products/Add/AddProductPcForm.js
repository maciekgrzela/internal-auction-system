import React from 'react';
import { Field } from 'react-final-form';
import { Grid, Header } from 'semantic-ui-react';
import TextInput from '../../Forms/Common/TextInput';
import consts from '../../../Consts/consts.json';

export const AddProductPcForm = (props) => {
  return (
    <>
      <Header
        as='h2'
        className='ias-thin ias-capitalize ias-mb-2 ias-orange-fg'
        dividing
      >
        {consts.typesParameters}
      </Header>
      <Grid className='ias-pb-3'>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    Procesor*
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='processor'
                    placeholder='Wprowadz model procesora oraz jego czestotliwosc taktowania'
                    type='text'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.processor : ''}
                    required={true}
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    Pamiec ram (gb)*
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='memoryAmount'
                    placeholder='Okresl ilosc pamieci operacyjnej w GB'
                    type='number'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.memoryAmount : ''}
                    required={true}
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    Karta graficzna
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='graphicsCard'
                    placeholder='Okresl model karty graficznej'
                    type='text'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.graphicsCard : ''}
                    required={false}
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    Dysk twardy*
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='diskDrive'
                    placeholder='Wprowadz dane dotyczace dysku twardego'
                    type='text'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.diskDrive : ''}
                    required={true}
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    Karty rozszerzen
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='extensionsCards'
                    placeholder='Karty rozszerzen'
                    type='text'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.extensionsCards : ''}
                    required={false}
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    System operacyjny
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='operatingSystem'
                    placeholder='OS Komputera'
                    type='text'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.operatingSystem : ''}
                    required={false}
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
