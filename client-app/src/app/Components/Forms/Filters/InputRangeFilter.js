import React from 'react';
import { Menu, Grid, Form } from 'semantic-ui-react';
import consts from '../../../Consts/consts.json';
import '../../../Styles/App.css';

class InputRangeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChangeFrom = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
    this.props.onChangeFilter(this.props.filterPropOne, e.currentTarget.value);
  };

  onChangeTo = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
    this.props.onChangeFilter(this.props.filterPropTwo, e.currentTarget.value);
  };

  handleSubmit = () => {
    this.props.onChangeFilter(this.props.filterPropOne, null);
    this.props.onChangeFilter(this.props.filterPropTwo, null);
    this.setState({ from: '', to: '' });
  };
  render() {
    const { from, to } = this.state;

    return (
      <Menu.Item as='span' className='ias-py-0'>
        <Grid container>
          <Form onSubmit={this.handleSubmit}>
            <Grid.Row
              columns={1}
              textAlign='left'
              className='ias-checkbox-sidebar-caption'
            >
              <Grid.Column>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column textAlign='left'>
                      <p>{this.props.title}</p>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      <Form.Button
                        content={consts.clear}
                        className='ias-clear-btn'
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Form.Group widths='equal'>
                <Form.Field
                  className='ias-input-primary input-range ias-rounded'
                  control='input'
                  type='number'
                  name='from'
                  value={from}
                  placeholder='Od'
                  onChange={this.onChangeFrom}
                />
                <Form.Field
                  className='ias-input-primary input-range ias-rounded'
                  control='input'
                  name='to'
                  value={to}
                  type='number'
                  placeholder='Do'
                  onChange={this.onChangeTo}
                />
              </Form.Group>
            </Grid.Row>
          </Form>
        </Grid>
      </Menu.Item>
    );
  }
}

export default InputRangeFilter;
