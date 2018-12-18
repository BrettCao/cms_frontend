import { getCategories, getprodList } from '@/services/api';

export default {
  namespace: 'prod',

  state: {
    categories: [],
    prod: [],
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
      const response = yield call(getprodList, payload);
      yield put({
        type: 'saveprod',
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
    saveprod(state, action) {
      return {
        ...state,
        prod: action.payload,
      };
    },
  },
};
