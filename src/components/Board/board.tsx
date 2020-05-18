import React, { useContext, useCallback } from 'react';
import styles from './index.less';
import { ReducerContext } from '../ReducerWrapper';
import Item from './item';
import { ComponentInstance } from '../Config/rules';

const Board = () => {
  const { state, dispatch } = useContext(ReducerContext);

  const handleMove = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch({
        type: 'sort',
        payload: {
          dragIndex,
          targetIndex: hoverIndex,
        },
      });
    },
    [state.data]
  );

  const handleDrop = useCallback(
    (dragItem: ComponentInstance, targetId: string) => {
      dispatch({
        type: 'drop',
        payload: { dragItem, targetId },
      });
    },
    [state.data]
  );

  return (
    <div className={styles.wrapper}>
      {state.data.map((item, index) => (
        <Item
          key={item._id}
          data={item}
          index={index}
          move={handleMove}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default Board;
