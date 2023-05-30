import axios from 'axios';
import Cookies from 'js-cookie';

class API {
  constructor(tokenName = 'token') {
    this.url = process.env.REACT_APP_API_URL || '';
    // this.url = 'http://api.meeting-point.asap-lp.ru' || '';
    this.tokenName = tokenName;
  }

  handleSuccess = (response) => response;

  handleError = (error) => {
    switch (error.response.status) {
      case 401:
        Cookies.remove('token', { path: '/' });
        // window.location.href = SERVICES_URLS.auth;
        break;

      default:
        break;
    }
    return Promise.reject(error);
  };

  create = (headers) => {
    const cancel = axios.CancelToken.source();
    const token = Cookies.get(this.tokenName);
    const headerAuth = token && { Authorization: `Bearer ${token}` };
    const service = axios.create({
      headers: {
        ...headers,
        ...headerAuth
      },
      cancelToken: cancel.token
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    return service;
  };

  get = (path = '', params, headers) => {
    const service = this.create(headers);
    return service.request({
      method: 'GET',
      url: `${this.url}${path}`,
      params
    });
  };

  post = (path = '', data = {}, headers) => {
    const service = this.create(headers);
    return service.request({
      method: 'POST',
      url: `${this.url}${path}`,
      data
    });
  };

  put = (path = '', data = {}, headers) => {
    const service = this.create(headers);
    return service.request({
      method: 'PUT',
      url: `${this.url}${path}`,
      data
    });
  };

  delete = (path = '', params, headers) => {
    const service = this.create(headers);
    return service.request({
      method: 'DELETE',
      url: `${this.url}${path}`,
      params
    });
  };
}

export default new API();
