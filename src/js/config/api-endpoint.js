import Config from '../config/config';

const ApiEndpoint = {
  REGISTER: `${Config.BASE_URL}/register`,
  LOGIN: `${Config.BASE_URL}/login`,

  GET_ALL_TRANSACTION: `${Config.BASE_URL}/story`,
  GET_BY_ID_TRANSACTION: (id) => `${Config.BASE_URL}/story/${id}`,
  STORE_TRANSACTION: `${Config.BASE_URL}/story`,
  UPDATE_TRANSACTION: (id) => `${Config.BASE_URL}/story/${id}`,
  DESTROY_TRANSACTION: (id) => `${Config.BASE_URL}/story/${id}`,
};

export default ApiEndpoint;
