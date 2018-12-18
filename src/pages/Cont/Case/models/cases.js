import { getCategories, getcasesList } from '@/services/api';

export default {
  namespace: 'cases',

  state: {
    categories: [],
    cases: [],
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
      const response = yield call(getcasesList, payload);
      yield put({
        type: 'savecases',
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
    savecases(state, action) {
      return {
        ...state,
        cases: action.payload,
      };
    },
  },
};
