import React, { useContext } from 'react';
import styles from './index.less';
import { Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ReducerContext } from '../ReducerWrapper';
import { ComponentInstance } from '../Config/rules';
import classnames from 'classnames';

interface ItemProps {
  data: ComponentInstance;
}

const Item: React.FC<ItemProps> = props => {
  const { state, dispatch } = useContext(ReducerContext);

  const { data } = props;
  const { ele, type, _id } = data;

  const handleChoose = (id: string) =>
    dispatch({ type: 'setCurrentComponent', payload: id });

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch({ type: 'removeComponent', payload: id });
  };

  return (
    <div
      className={classnames(styles.item, {
        [styles.current]: state.cur === _id,
      })}
      onClick={() => handleChoose(_id)}
    >
      {ele.label && <Typography.Title level={4}>{ele.label}</Typography.Title>}
      {type && <Typography.Text>{type}</Typography.Text>}
      <CloseCircleOutlined
        className={styles.close}
        onClick={e => handleRemove(e, _id)}
      />
    </div>
  );
};

export default Item;
