import React, { useContext } from 'react';
import styles from './index.less';
import { Button, Typography } from 'antd';
import { CompType } from './libs';
import { ReducerContext } from '../ReducerWrapper';

const Libs = () => {
  const { dispatch } = useContext(ReducerContext);

  const handleChoose = (type: string) => {
    dispatch({
      type: 'add',
      payload: type,
    });
  };

  return (
    <div className={styles.wrapper}>
      <Typography.Title level={4}>请选择组件</Typography.Title>
      {Object.keys(CompType).map(item => (
        <Button key={item} onClick={() => handleChoose(CompType[item])}>
          {CompType[item]}
        </Button>
      ))}
    </div>
  );
};

export default Libs;
