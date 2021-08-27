import axios from 'axios';

const setHeaders = () => {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
};

export default setHeaders;
