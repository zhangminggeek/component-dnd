import React, { useContext, useCallback } from 'react';
import styles from './index.less';
import { ReducerContext } from '../ReducerWrapper';
import Item from './item';

const Board = () => {
  const { state, dispatch } = useContext(ReducerContext);

  const move = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch({
        type: 'move',
        payload: {
          dragIndex,
          targetIndex: hoverIndex,
        },
      });
    },
    [state.data]
  );

  return (
    <div className={styles.wrapper}>
      {state.data.map((item, index) => (
        <Item key={item._id} data={item} index={index} move={move} />
      ))}
    </div>
  );
};

export default Board;
