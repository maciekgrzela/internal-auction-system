import React from 'react';
import { Field } from 'react-final-form';
import { Grid, Header } from 'semantic-ui-react';
import { TextAreaInput } from '../../Forms/Common/TextAreaInput';
import consts from '../../../Consts/consts.json';

export const AddProductOtherDeviceForm = (props) => {
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
                    Opis*
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='description'
                    placeholder='Krotki opis urzadzenia'
                    type='text'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.description : ''}
                    required={true}
                    component={TextAreaInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    Funkcjonalnosci*
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='features'
                    placeholder='Jakie funkcje posiada urzadzenie?'
                    type='text'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.features : ''}
                    required={true}
                    component={TextAreaInput}
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
