import React, { useContext } from 'react';
import styles from './index.less';
import { ReducerContext } from '../ReducerWrapper';
import Item from './item';

const Board = () => {
  const { state, dispatch } = useContext(ReducerContext);

  return (
    <div className={styles.board}>
      {state.data.map(item => (
        <Item key={item._id} type={`${item.type} ${item._id}`} />
      ))}
    </div>
  );
};

export default Board;
