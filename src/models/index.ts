import { message } from 'antd';
import { history } from 'umi';
import type { Effect, Reducer } from 'umi';
import { queryCurrentUser } from '@/services/user';

/** 命名空间 */
export const namespace = 'app';
export const queryCurrentUserEffect = `${namespace}/queryCurrentUser`; // 查询当前用户

export type modelsType = {
  namespace: string;
  state: any;
  effects: {
    /** 查询当前用户信息 */
    queryCurrentUser: Effect;
  };
  reducers: {
    setCurrentUserReducers?: Reducer<any>;
  };
};

const models: modelsType = {
  namespace,
  state: {
    currentUserInfo: {},
  },
  reducers: {
    /** 存储当前用户信息 */
    setCurrentUserReducers(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *queryCurrentUser({ payload, callback }, { call, put }): any {
      const response = yield call(queryCurrentUser, payload);
      if (response.success) {
        yield put({
          type: 'setCurrentUserReducers',
          payload: response.data,
        });
      } else {
        history.push('/user/login');
      }
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
  },
};

export default models;
