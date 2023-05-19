import React, { useState } from 'react';
import { useModel, useDispatch, history } from 'umi';
import { Form, Input, Checkbox, Button, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { loginEffect } from './models/index';

import styles from './index.less';
import logo from '../../../../public/curry.jpg';

const UserLogin: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  /**
   * 记住密码
   */
  const savePassWord = (e: any) => {
    if (e.target.checked) {
      localStorage.setItem('password', form.getFieldValue('password'));
    } else {
      localStorage.removeItem('password');
    }
  };

  /**
   * 登录接口
   * @returns
   */
  const Login = () => {
    const { initialState, setInitialState } = useModel('@@initialState');
    const [userLoginState, setUserLoginState] = useState({});

    const fetchUserInfo = async () => {
      const userInfo = await initialState?.fetchUserInfo?.();

      if (userInfo) {
        await setInitialState((s: any) => ({ ...s, currentUser: userInfo }));
      }
    };
  };

  /**
   * 登录
   */
  const handleLogin = async (values: any) => {
    message.loading('正在登录中，请稍后...');
    dispatch({
      type: loginEffect,
      payload: values,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div style={{ width: 328, margin: '60px auto 0' }}>
          <div className={styles.login_title}>
            <div className={styles.login_title_header}>
              <div className={styles.login_title_header_avatar}>
                <img alt="logo" width={44} src={logo} />
              </div>
              <div className={styles.login_title_header_name}>
                <span>博客后台管理系统</span>
              </div>
            </div>
            <div className={styles.login_title_sub_title}>
              <span>后台管理系统</span>
            </div>
          </div>
          <div className={styles.login_main}>
            <Form form={form} layout="vertical" onFinish={handleLogin}>
              <Form.Item
                name="email"
                rules={[{ required: true, message: '请输入邮箱！' }]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="邮箱"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码！' }]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="密码"
                />
              </Form.Item>
              <div
                style={{
                  marginBottom: 24,
                }}
              >
                <Checkbox name="autoLogin" onChange={savePassWord}>
                  自动登录
                </Checkbox>
              </div>
              <div className={styles.login_main_btn}>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  登录
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
