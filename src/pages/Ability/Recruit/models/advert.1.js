import { getCategories, getrecruitList } from '@/services/api';

export default {
  namespace: 'recruit',

  state: {
    categories: [],
    recruit: [],
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
      const response = yield call(getrecruitList, payload);
      yield put({
        type: 'saverecruit',
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
    saverecruit(state, action) {
      return {
        ...state,
        recruit: action.payload,
      };
    },
  },
};
