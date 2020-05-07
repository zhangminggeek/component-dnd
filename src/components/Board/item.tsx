import React, { useContext, useRef } from 'react';
import styles from './index.less';
import { Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ReducerContext } from '../ReducerWrapper';
import { ComponentInstance } from '../Config/rules';
import classnames from 'classnames';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';

interface ItemProps {
  data: ComponentInstance;
  index: number;
  move: (dragIndex: number, hoverIndex: number) => void;
}

interface DropItem {
  type: string;
  index: number;
}

const Item: React.FC<ItemProps> = props => {
  const { state, dispatch } = useContext(ReducerContext);
  const ref = useRef<HTMLDivElement>(null);

  const { data, index, move } = props;
  const { type, _id } = data;
  console.log(type);

  const [, drop] = useDrop({
    accept: 'type',
    hover(item: DropItem, monitor: DropTargetMonitor) {
      if (!ref.current) return;

      const dragIndex = item.index; // TODO: 使用id
      const hoverIndex = index;

      // 如果放置位置与初始位置相同则不处理
      if (dragIndex === hoverIndex) return;

      // hover元素
      const hoverBoundingRect = ref.current!.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      move(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  // 拖拽处理
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'type', index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleChoose = (id: string) =>
    dispatch({ type: 'setCurrentComponent', payload: id });

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch({ type: 'remove', payload: id });
  };

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={classnames(styles.item, {
        [styles.current]: state.cur === _id,
      })}
      style={{ opacity }}
      onClick={() => handleChoose(_id)}
    >
      {type && (
        <Typography.Text>
          {type}
          {_id}
        </Typography.Text>
      )}
      <CloseCircleOutlined
        className={styles.close}
        onClick={e => handleRemove(e, _id)}
      />
    </div>
  );
};

export default Item;
