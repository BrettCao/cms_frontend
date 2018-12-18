import { getCategories, getdownList } from '@/services/api';

export default {
  namespace: 'down',

  state: {
    categories: [],
    down: [],
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
      const response = yield call(getdownList, payload);
      yield put({
        type: 'savedown',
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
    savedown(state, action) {
      return {
        ...state,
        down: action.payload,
      };
    },
  },
};
