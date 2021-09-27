import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class AccountSection extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header
              as='h2'
              className='ias-pt-1 ias-pl-1 ias-flex ias-flex-ai-center'
              dividing
            >
              {this.props.icon}
              <Header
                as='p'
                className='ias-pl-1 ias-thin ias-capitalize ias-lighter'
              >
                {this.props.title}
              </Header>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns='equal' className='ias-pl-2 ias-pt-0'>
          <Grid columns={this.props.columns}>
            {this.props.options.map((opt) => (
              <Grid.Column key={opt.link} className='ias-px-0'>
                <Link to={opt.link}>
                  <Header as='span' className='ias-orange-fg ias-thin ias-lh-2'>
                    {opt.name}
                  </Header>
                </Link>
              </Grid.Column>
            ))}
          </Grid>
        </Grid.Row>
      </Grid>
    );
  }
}

export default AccountSection;
