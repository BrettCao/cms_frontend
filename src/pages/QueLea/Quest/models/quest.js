import { getCategories, getquestList } from '@/services/api';

export default {
  namespace: 'quest',

  state: {
    categories: [],
    quest: [],
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
      const response = yield call(getquestList, payload);
      yield put({
        type: 'savequest',
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
    savequest(state, action) {
      return {
        ...state,
        quest: action.payload,
      };
    },
  },
};
