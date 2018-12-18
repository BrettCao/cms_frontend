import { getCategories, getadvertList } from '@/services/api';

export default {
  namespace: 'advert',

  state: {
    categories: [],
    advert: [],
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
      const response = yield call(getadvertList, payload);
      yield put({
        type: 'saveadvert',
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
    saveadvert(state, action) {
      return {
        ...state,
        advert: action.payload,
      };
    },
  },
};
