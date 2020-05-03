import React, { useState, useContext, useEffect } from 'react';
import styles from './index.less';
import { Typography, Form } from 'antd';
import { ReducerContext } from '../ReducerWrapper';
import { factory } from './config';
import { ComponentInstance } from './rules';

const defaultComp: ComponentInstance = {
  _id: '',
  type: '',
  ele: {},
};

const Config = () => {
  const [form] = Form.useForm();
  // 当前操作的组件
  const [curComp, setCurComp] = useState<ComponentInstance>(defaultComp);
  const { state, dispatch } = useContext(ReducerContext);
  const { data, cur } = state;

  useEffect(() => {
    const conf = data.find(item => item._id === cur) || defaultComp;
    setCurComp(conf);
    // 选中组件后给配置项表单赋值
    form.setFieldsValue(conf.ele);
  }, [cur]);

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const handleFormChange = (changedValues: object, allValues: object): void => {
    dispatch({
      type: 'update',
      payload: {
        ...curComp,
        ele: { ...allValues },
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <Typography.Title level={4}>配置</Typography.Title>
      <Form {...layout} form={form} onValuesChange={handleFormChange}>
        {curComp &&
          Object.keys(curComp.ele).map(item => {
            const info = factory(item);
            return (
              info && (
                <Form.Item key={item} label={info.label} name={item}>
                  {info.render}
                </Form.Item>
              )
            );
          })}
      </Form>
    </div>
  );
};

export default Config;
