import React from 'react';
import { Menu, Grid, Checkbox, Container, Form } from 'semantic-ui-react';

class CheckboxFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    if (this.props.filterProp === 'diagonal') {
      this.elements.forEach(
        (name, index) => (this.elements[index] = Number(this.elements[index]))
      );
    }
  };

  elements = [];

  onChange = (e, data) => {
    if (data.checked === true) {
      this.elements.push(data.value);
    } else {
      this.elements = this.elements.filter((item) => item !== data.value);
    }
    this.props.onChangeFilter(this.props.filterProp, this.elements);
  };

  handleSubmit = (e) => {
    this.props.onChangeFilter(this.props.filterProp, null);
  };

  render() {
    return (
      <Menu.Item as='span' className='ias-py-0'>
        <Grid container>
          <Form onSubmit={this.handleSubmit} className='ias-w-100'>
            <Grid.Row
              columns={1}
              textAlign='left'
              className='ias-checkbox-sidebar-caption ias-mb-1'
            >
              <Grid.Column>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column textAlign='left'>
                      <p>{this.props.title}</p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Container fluid textAlign='left'>
                {this.props.options.map((option) => (
                  <Checkbox
                    key={`${option.value}`}
                    label={
                      this.props.databaseGenerated === true
                        ? option.value
                        : option.text
                    }
                    value={option.value}
                    name='checkbox'
                    onChange={this.onChange}
                    className='ias-checkbox-sidebar ias-input-primary'
                  />
                ))}
              </Container>
            </Grid.Row>
          </Form>
        </Grid>
      </Menu.Item>
    );
  }
}

export default CheckboxFilter;
