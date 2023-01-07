import axios from 'axios';
import state from './state.service';

const client = axios.create({
  baseURL: 'http://10.0.2.2:8000/api',
  // baseURL: 'http://192.168.18.3:8000/api',
  // timeout: 2500,
  ContentType: 'applicaton/json',
});

export const login = async (user) => {
  try {
    console.log('inside try block');
    const result = await client.post('/auth/login', user);
    console.log('result', result.data);

    // now set the state ...
    state.user = result.data.user;
    state.token = result.data.accessToken;

    // now get user posts and set it to the state

    state.posts = await getMyPosts();

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${state.token}` } };
};

export const getMyPosts = async () => {
  const result = await client.get('/posts', getAuthHeader());
  if (result.status === 200) {
    console.log(result.data);
    return result.data;
  }
};
