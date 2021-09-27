import React from 'react';
import SearchInput from '../Forms/Filters/SearchInput';
import DropdownInput from '../Forms/Filters/DropdownInput';
import CheckboxFilter from '../Forms/Filters/CheckboxFilter';
import InputRangeFilter from '../Forms/Filters/InputRangeFilter';
import ToggleFilter from '../Forms/Filters/ToggleFilter';
import { Sidebar, Menu, Button } from 'semantic-ui-react';
import consts from '../../Consts/consts.json';
import Logo from '../Logo/Logo';
import httpClient from '../../API/httpClient';

const qs = require('query-string');

const deviceTypes = [
  { key: 'laptop', text: 'Laptop', value: 'laptop' },
  { key: 'monitor', text: 'Monitor', value: 'monitor' },
  { key: 'pc', text: 'Komputer stacjonarny', value: 'pc' },
  { key: 'otherdevice', text: 'Pozostałe', value: 'otherdevice' },
];

const locations = [
  { key: 1, text: 'Wroclaw', value: 5 },
  { key: 2, text: 'Rzeszow', value: 4 },
  { key: 3, text: 'Gdansk', value: 3 },
  { key: 4, text: 'Frankfurt', value: 2 },
  { key: 5, text: 'Londyn', value: 1 },
];

const destinations = [
  { key: 1, text: 'Sprzedaz', value: 3 },
  { key: 2, text: 'Do oddania', value: 2 },
  { key: 3, text: 'Elektrosmieci', value: 1 },
];

const interests = [
  { key: 1, text: 'Zadne', value: 4 },
  { key: 2, text: 'Male', value: 3 },
  { key: 3, text: 'Srednie', value: 2 },
  { key: 4, text: 'Duze', value: 1 },
];

class FilterSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
    };
  }

  filters = {
    name: null,
    type: [],
    minPrice: null,
    maxPrice: null,
    locationIds: [],
    destinationIds: [],
    interestIds: [],
    interfacePorts: [],
    screenResolution: [],
    hasTouchScreen: null,
    hasSpeakers: null,
    matrix: [],
    diagonal: null,
    refreshing: [],
    contrast: [],
    extensionsCards: [],
  };

  setFilters = (filtersArr) => {
    this.setState({
      filters: filtersArr,
    });
  };

  changeFilter = (property, value, instantChange = null) => {
    console.log(property, value);
    let filters = this.filters;
    filters[property] = value;
    this.filters = filters;
    if (instantChange !== null) {
      this.applyFilter();
    }
  };

  applyFilter = () => {
    console.log(this.filters);
    let queryString = qs.stringify(this.filters, {
      skipNull: true,
      encode: false,
    });
    this.props.onSetFilterString(queryString);
  };

  groupBy = (arr, prop) => {
    const map = new Map(Array.from(arr, (obj) => [obj[prop], []]));
    arr.forEach((obj) => map.get(obj[prop]).push(obj));
    return Array.from(map.values());
  };

  componentDidMount() {
    httpClient.Filters.list().then((response) => {
      let filters = [];
      response.forEach((filter) => {
        filters.push(filter);
      });
      filters = this.groupBy(filters, 'name');
      this.setFilters(filters);
    });
  }

  render() {
    return (
      <Sidebar.Pusher>
        <Sidebar
          as={Menu}
          animation='push'
          direction='left'
          icon='labeled'
          visible={true}
          vertical
          width='thin'
        >
          <Logo filename='logo.svg' />
          <SearchInput
            placeholder={consts.device.search}
            onChangeFilter={this.changeFilter}
            filterProp='name'
          />
          <DropdownInput
            placeholder={consts.device.type.name}
            options={deviceTypes}
            onChangeFilter={this.changeFilter}
            filterProp='type'
          />
          <CheckboxFilter
            title={consts.device.location}
            options={locations}
            onChangeFilter={this.changeFilter}
            filterProp='locationIds'
            databaseGenerated={false}
          />
          <InputRangeFilter
            title={consts.device.priceRange}
            onChangeFilter={this.changeFilter}
            filterPropOne='minPrice'
            filterPropTwo='maxPrice'
          />
          <CheckboxFilter
            title={consts.device.destination}
            options={destinations}
            onChangeFilter={this.changeFilter}
            filterProp='destinationIds'
            databaseGenerated={false}
          />
          <CheckboxFilter
            title={consts.device.interest}
            options={interests}
            onChangeFilter={this.changeFilter}
            filterProp='interestIds'
            databaseGenerated={false}
          />
          {this.state.filters.map((filter) => {
            if (filter[0].value === null) {
              return (
                <ToggleFilter
                  title={filter[0].name}
                  checked={false}
                  onChangeFilter={this.changeFilter}
                  filterProp={Object.keys(consts.filterTranslates).find(
                    (key) => consts.filterTranslates[key] === filter[0].name
                  )}
                />
              );
            } else {
              return (
                <CheckboxFilter
                  title={filter[0].name}
                  options={filter}
                  onChangeFilter={this.changeFilter}
                  filterProp={Object.keys(consts.filterTranslates).find(
                    (key) => consts.filterTranslates[key] === filter[0].name
                  )}
                  databaseGenerated={true}
                />
              );
            }
          })}
          <Menu.Item>
            <Button
              onClick={this.applyFilter}
              basic
              color='orange'
              className='ias-mx-1 ias-rounded'
              fluid
            >
              {consts.apply}
            </Button>
          </Menu.Item>
        </Sidebar>
      </Sidebar.Pusher>
    );
  }
}

export default FilterSidebar;
