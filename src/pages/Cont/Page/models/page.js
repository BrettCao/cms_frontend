import { getCategories, getpageList } from '@/services/api';

export default {
  namespace: 'page',

  state: {
    categories: [],
    page: [],
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
      const response = yield call(getpageList, payload);
      yield put({
        type: 'savepage',
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
    savepage(state, action) {
      return {
        ...state,
        page: action.payload,
      };
    },
  },
};
