import axios from 'axios';
import appConfig from '../Config/config.json';

axios.defaults.baseURL = appConfig.apiConnectionUrl;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Devices = {
  list: () => requests.get('/devices'),
  listWithFilters: (filters) => requests.get('/devices?' + filters),
};

const Filters = {
  list: () => requests.get('/filters'),
};

const Laptops = {
  create: (laptop) => requests.post(`/laptops`, laptop),
  update: (laptop) => requests.put(`/laptops/${laptop.id}`, laptop),
  delete: (id) => requests.delete(`/laptops/${id}`),
};

const Monitors = {
  create: (monitor) => requests.post(`/monitors`, monitor),
  update: (monitor) => requests.put(`/monitors/${monitor.id}`, monitor),
  delete: (id) => requests.delete(`/monitors/${id}`),
};

const PCs = {
  create: (pc) => requests.post(`/pcs`, pc),
  update: (pc) => requests.put(`/pcs/${pc.id}`, pc),
  delete: (id) => requests.delete(`/pcs/${id}`),
};

const Storages = {
  list: () => requests.get('/storages'),
  listOne: (id) => requests.get(`/storages/${id}`),
  create: (storage) => requests.post('/storages', storage),
  update: (storage) => requests.put(`/storages/${storage.id}`, storage),
  delete: (id) => requests.delete(`/storages/${id}`),
};

const Locations = {
  list: () => requests.get('/locations'),
  listOne: (id) => requests.get(`/locations/${id}`),
  create: (location) => requests.post('/locations', location),
  update: (location) => requests.put(`/locations/${location.id}`, location),
  delete: (id) => requests.delete(`/locations/${id}`),
};

const OtherDevices = {
  create: (otherDevice) => requests.post(`/otherdevices`, otherDevice),
  update: (otherDevice) =>
    requests.put(`/otherdevices/${otherDevice.id}`, otherDevice),
  delete: (id) => requests.delete(`/otherdevices/${id}`),
};

const Purchases = {
  list: () => requests.get('/purchase'),
  finalize: (items) => requests.post(`/cart`, items),
};

const Users = {
  current: () => requests.get('/user'),
  login: (user) => requests.post('/user/login', user),
  register: (user) => requests.post('/user/register', user),
  adminRegister: (user) => requests.post('/user/admin/register', user),
  updateCompanyDetails: (id, details) =>
    requests.put(`/user/${id}/companydetails`, details),
};

export default {
  Devices,
  Laptops,
  Monitors,
  PCs,
  OtherDevices,
  Filters,
  Users,
  Purchases,
  Storages,
  Locations,
};
