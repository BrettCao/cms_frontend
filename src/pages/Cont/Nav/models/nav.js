import { getNavList } from '@/services/api';

export default {
  namespace: 'nav',

  state: {
    navData: [],
  },

  effects: {
    // *categories({ payload }, { call, put }) {
    //   const response = yield call(getCategories, payload);
    //   yield put({
    //     type: 'saveCategories',
    //     payload: Array.isArray(response.data) ? response.data : [],
    //   });
    // },
    *getNavMng(_, { call, put }) {
      const response = yield call(getNavList);
      console.log('navtable............................................', response.data.list);
      yield put({
        type: 'saveNav',
        payload: response.data,
      });
    },
  },

  reducers: {
    // saveCategories(state, action) {
    //   return {
    //     ...state,
    //     categories: action.payload,
    //   };
    // },
    saveNav(state, action) {
      console.log('payload', action.payload);
      return {
        ...state,
        navData: action.payload,
      };
    },
  },
};
