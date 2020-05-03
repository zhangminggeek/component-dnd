import React, { useContext } from 'react';
import styles from './index.less';
import { Typography } from 'antd';
import { ReducerContext } from '../ReducerWrapper';
import { ComponentInstance } from '../Config/rules';
import classnames from 'classnames';

interface ItemProps {
  data: ComponentInstance;
}

const Item: React.FC<ItemProps> = props => {
  const { state, dispatch } = useContext(ReducerContext);

  const { data } = props;
  const { label, type, _id } = data;

  const handleChoose = (id: string) =>
    dispatch({ type: 'setCurrentComponent', payload: id });

  return (
    <div
      className={classnames(styles.item, {
        [styles.current]: state.cur === _id,
      })}
      onClick={() => handleChoose(_id)}
    >
      {label && <Typography.Title level={4}>{label}</Typography.Title>}
      {type && <Typography.Text>{type}</Typography.Text>}
    </div>
  );
};

export default Item;
