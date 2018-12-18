import { storeNews,getNews,getNewsDetail,getApiNewsCategories } from '@/services/api';
import { notification } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'news',

  state: {
    categories: [],
    news:[],
    detail:{
      logs:[]
    },
  },

  effects: {
    *categoryApi({ payload }, { call, put }) {
      const response = yield call(getApiNewsCategories, payload);
      yield put({
        type: 'saveCategories',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(getNews,payload);
      yield put({
        type: 'saveNews',
        payload: Array.isArray(response.data.list) ? response.data : [],
      });
    },
    *detail({ payload }, { call, put }) {
      const response = yield call(getNewsDetail,payload);
      yield put({
        type: 'saveDetail',
        payload: response.data ? response.data : [],
      });
    },
    *store({ payload }, { call, put }) {
      const response = yield call(storeNews,payload);
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
        categories: action.payload,
      };
    },
    saveNews(state, action) {
      return {
        ...state,
        news: action.payload,
      };
    },
    saveDetail(state, action) {
      return {
        ...state,
        detail: action.payload,
      };
    },
  },
};
