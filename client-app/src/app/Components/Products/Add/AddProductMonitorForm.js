import React from 'react';
import { Field } from 'react-final-form';
import { Grid, Header } from 'semantic-ui-react';
import TextInput from '../../Forms/Common/TextInput';
import { ToggleInput } from '../../Forms/Common/ToggleInput';
import consts from '../../../Consts/consts.json';

export const AddProductMonitorForm = (props) => {
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
                    Rozdzielczosc ekranu*
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='screenResolution'
                    placeholder='Rozdzielczosc ekranu monitora'
                    type='text'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.screenResolution : null}
                    required={true}
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    Przekatna*
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='diagonal'
                    placeholder='Przekatna ekranu monitora'
                    type='number'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.diagonal : null}
                    required={true}
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    Rodzaj matrycy
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='matrix'
                    placeholder='Technologia wykonania matrycy'
                    className='ias-input-primary ias-rounded'
                    required={false}
                    defaultValue={props.product !== undefined ? props.product.matrix : ''}
                    type='text'
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    Czestotliwosc odswiezania
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='refreshing'
                    placeholder='Czestotliwosc odswiezania podana w Hz'
                    className='ias-input-primary ias-rounded'
                    required={false}
                    defaultValue={props.product !== undefined ? props.product.refreshing : null}
                    type='number'
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    Kontrast
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Field
                    name='contrast'
                    placeholder='Kontrast ekranu'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.contrast : ''}
                    required={false}
                    type='text'
                    component={TextInput}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Header as='label' className='ias-capitalize'>
                    Wbudowane glosniki
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  
                  <Field
                    name='hasSpeakers'
                    className='ias-input-primary ias-rounded'
                    defaultValue={props.product !== undefined ? props.product.hasSpeakers : false}
                    required={false}
                    component={ToggleInput}
                    type='checkbox'
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
