import { proxy, subscribe } from 'valtio';
import { subscribeKey } from 'valtio/utils';

const localStorageKey = 'socialAppData';
// const data = localStorage.getItem(localStorageKey);

const initialState = {
  token: '',
  user: {},
  posts: [],
};

export const clearState = () => {
  state.token = '';
  state.user = {};
  state.posts = [];
};

const state = proxy(initialState);
export default state;
