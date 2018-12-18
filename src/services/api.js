import { stringify } from 'qs';
import request from '@/utils/request';

export const baseUrl = 'https://www.easy-mock.com/mock/5be40b3914760c3efb7213dc/cms/';
export const apiUrl = `${baseUrl}api/`;

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(
    `https://www.easy-mock.com/mock/5bb9f10aee260752eafc9347/gw/query?${stringify(params)}`
  );
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function getHomeBannerList() {
  return request('https://www.easy-mock.com/mock/5bb9f10aee260752eafc9347/gw/home');
}

export async function getNewsCategories(params) {
  return request(`${baseUrl}news/category?${stringify(params)}`);
}

export async function getNews(params) {
  return request(`${baseUrl}news?${stringify(params)}`);
}

export async function getNewsDetail(params) {
  return request(`${baseUrl}news/${params.id}/detail`);
}

export async function getApiNewsCategories(params) {
  return request(`${apiUrl}news/category?${stringify(params)}`);
}

export async function storeNews(params) {
  return request(`${baseUrl}news/store`, {
    method: 'POST',
    body: params,
  });
}

export async function storeCategory(params) {
  return request(`${baseUrl}news/category/store`, {
    method: 'POST',
    body: params,
  });
}

// mike
export async function getNavList() {
  return request(`${baseUrl}alldatalist`);
}
