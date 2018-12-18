import { getCategories, getsolveList } from '@/services/api';

export default {
  namespace: 'solve',

  state: {
    categories: [],
    solve: [],
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
      const response = yield call(getsolveList, payload);
      yield put({
        type: 'savesolve',
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
    savesolve(state, action) {
      return {
        ...state,
        solve: action.payload,
      };
    },
  },
};
