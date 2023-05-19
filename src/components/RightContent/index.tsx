import { Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const GlobalHeaderRight = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return null;
};

export default GlobalHeaderRight;
