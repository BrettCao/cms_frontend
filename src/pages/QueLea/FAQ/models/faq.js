import { getCategories, getfaqList } from '@/services/api';

export default {
  namespace: 'faq',

  state: {
    categories: [],
    faq: [],
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
      const response = yield call(getfaqList, payload);
      yield put({
        type: 'savefaq',
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
    savefaq(state, action) {
      return {
        ...state,
        faq: action.payload,
      };
    },
  },
};
