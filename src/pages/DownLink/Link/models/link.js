import { getCategories, getlinkList } from '@/services/api';

export default {
  namespace: 'link',

  state: {
    categories: [],
    link: [],
  },

  effects: {
    *categories({ payload }, { call, put }) {
      const response = yield call(getCategories, payload);
      yield put({
        type: 'saveCategories',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(getlinkList, payload);
      yield put({
        type: 'savelink',
        payload: Array.isArray(response.data.list) ? response.data : [],
      });
    },
  },

  reducers: {
    saveCategories(state, action) {
      return {
        ...state,
        categories: action.payload,
      };
    },
    savelink(state, action) {
      return {
        ...state,
        link: action.payload,
      };
    },
  },
};
