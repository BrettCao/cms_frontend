import { getCategories, getleaveList } from '@/services/api';

export default {
  namespace: 'leave',

  state: {
    categories: [],
    leave: [],
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
      const response = yield call(getleaveList, payload);
      yield put({
        type: 'saveleave',
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
    saveleave(state, action) {
      return {
        ...state,
        leave: action.payload,
      };
    },
  },
};
