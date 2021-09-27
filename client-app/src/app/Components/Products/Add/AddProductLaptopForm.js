import React from 'react';
import { Field } from 'react-final-form';
import { Grid, Header } from 'semantic-ui-react';
import TextInput from '../../Forms/Common/TextInput';
import { ToggleInput } from '../../Forms/Common/ToggleInput';
import consts from '../../../Consts/consts.json';

export const AddProductLaptopForm = (props) => {
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
                    required={false}
                    defaultValue={props.product !== undefined ? props.product.graphicsCard : ''}
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
                    required={true}
                    defaultValue={props.product !== undefined ? props.product.diskDrive : ''}
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    Rozdzielczosc ekranu
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='screenResolution'
                    placeholder='Okresl rodzielczosc ekranu'
                    type='text'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.screenResolution : ''}
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
                    placeholder='Podaj OS laptopa'
                    type='text'
                    defaultValue={props.product !== undefined ? props.product.operatingSystem : ''}
                    className='ias-input-primary ias-rounded'
                    required={false}
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    Dotykowy ekran
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='hasTouchScreen'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.hasTouchScreen : false}
                    required={false}
                    component={ToggleInput}
                    type='checkbox'
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
