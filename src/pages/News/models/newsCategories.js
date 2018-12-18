import { getNewsCategories,getApiNewsCategories,storeCategory } from '@/services/api';
import { notification } from 'antd';
import router from 'umi/router';


export default {
  namespace: 'newsCategories',

  state: {
    data: {
      list:[]
    },
    api: [

    ]
  },

  effects: {
    *categoryApi({ payload }, { call, put }) {
      const response = yield call(getApiNewsCategories, payload);
      yield put({
        type: 'saveCategoriesApi',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(getNewsCategories, payload);
      yield put({
        type: 'saveCategories',
        payload: Array.isArray(response.data.list) ? response.data : [],
      });
    },
    *store({ payload }, { call, put }) {
      const response = yield call(storeCategory, payload);
      if (response.code === "success"){
        notification.success({
          message: response.data.default
        });
      } else {
        notification.error({
          message: response.data.default
        });
      }
      if (response.url){
        setTimeout(()=>{
          router.push(response.url);
        }, 1000);
      }
    },
  },

  reducers: {
    saveCategories(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveCategoriesApi(state, action) {
      return {
        ...state,
        api: action.payload,
      };
    },
  },
};
