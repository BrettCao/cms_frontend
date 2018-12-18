import { getCategories, getwebList } from '@/services/api';

export default {
  namespace: 'web',

  state: {
    categories: [],
    web: [],
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
      const response = yield call(getwebList, payload);
      yield put({
        type: 'saveweb',
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
    saveweb(state, action) {
      return {
        ...state,
        web: action.payload,
      };
    },
  },
};
