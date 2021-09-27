import React from 'react';
import '../../Styles/App.css';
import FilterSidebar from './FilterSidebar';
import AccountSidebar from './AccountSidebar';
import BlankSidebar from './BlankSidebar';

class PropertiesSidebar extends React.Component {
  onSetFilterString = (queryString) => {
    this.props.onSetFilterString(queryString);
  };

  onUpdateCompanyDetails = (values) => {
    this.props.updateCompanyDetails(values);
  };

  render() {
    if (this.props.accountMode === true && this.props.logged === true) {
      return (
        <AccountSidebar
          user={this.props.user}
          updateCompanyDetails={this.onUpdateCompanyDetails}
        />
      );
    } else if (this.props.accountMode === false && this.props.logged === true) {
      return <FilterSidebar onSetFilterString={this.onSetFilterString} />;
    } else {
      return <BlankSidebar />;
    }
  }
}

export default PropertiesSidebar;
