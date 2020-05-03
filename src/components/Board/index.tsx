import React, { useContext } from 'react';
import styles from './index.less';
import { ReducerContext } from '../ReducerWrapper';
import Item from './item';

const Board = () => {
  const { state } = useContext(ReducerContext);

  return (
    <div className={styles.wrapper}>
      {state.data.map(item => (
        <Item key={item._id} data={item} />
      ))}
    </div>
  );
};

export default Board;
