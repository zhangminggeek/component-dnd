import React, { useContext, useCallback } from 'react';
import styles from './index.less';
import { ReducerContext } from '../ReducerWrapper';
import Item from './item';
import { ComponentInstance } from '../Config/rules';

const Board = () => {
  const { state, dispatch } = useContext(ReducerContext);

  // 拖拽移动排序
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

  // 拖拽放置
  const handleDrop = useCallback(
    (dragItem: ComponentInstance, targetId: string) => {
      if (!targetId || dragItem._id === targetId) return;

      dispatch({
        type: 'drop',
        payload: { dragItem, targetId },
      });
    },
    [state.data]
  );

  const renderComp = (list: Array<ComponentInstance>) => {
    if (!(list instanceof Array)) return null;
    return list.map((item, index) => (
      <Item
        key={item._id}
        data={item}
        index={index}
        move={handleMove}
        onDrop={handleDrop}
      >
        {item.children && renderComp(item.children)}
      </Item>
    ));
  };

  return <div className={styles.wrapper}>{renderComp(state.data)}</div>;
};

export default Board;
