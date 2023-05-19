import { history } from 'umi';
import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { login } from '@/services/user';

export const namespace = 'user';
export const loginEffect = `${namespace}/login`; // 登录

export type modelsType = {
  namespace: string;
  state: any;
  reducers: {};
  effects: {
    login: Effect;
  };
};

const models: modelsType = {
  namespace,
  state: {},
  reducers: {},
  effects: {
    *login({ payload, callback }, { call, put }): any {
      const response = yield call(login, payload);
      if (response.success) {
        message.destroy();
        message.success('登录成功！');
        if (!history) return;
        history.push('/');
        return;
      }
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
  },
};

export default models;
