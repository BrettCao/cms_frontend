import { getCategories, getpictureList } from '@/services/api';

export default {
  namespace: 'picture',

  state: {
    categories: [],
    picture: [],
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
      const response = yield call(getpictureList, payload);
      yield put({
        type: 'savepicture',
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
    savepicture(state, action) {
      return {
        ...state,
        picture: action.payload,
      };
    },
  },
};
