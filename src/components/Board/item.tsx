import React from 'react';
import styles from './index.less';
import { Typography } from 'antd';

interface ItemProps {
  label?: string;
  type?: string;
}

const Item: React.FC<ItemProps> = props => {
  const { label, type } = props;

  return (
    <div className={styles.item}>
      {label && <Typography.Title level={4}>{label}</Typography.Title>}
      {type && <Typography.Text>{type}</Typography.Text>}
    </div>
  );
};

export default Item;
