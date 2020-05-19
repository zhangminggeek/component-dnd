import React, { useContext, useRef } from 'react';
import styles from './index.less';
import { Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { ReducerContext } from '../ReducerWrapper';
import { ComponentInstance } from '../Config/rules';
import { CompType } from '../Lib/libs';

interface ItemProps {
  data: ComponentInstance;
  index: number;
  children?: React.ReactNode;
  move: (dragIndex: number, hoverIndex: number) => void;
  onDrop: (dragItem: ComponentInstance, targetId: string) => void;
}

export interface DropItem {
  type: string;
  index: number;
  data: ComponentInstance;
}

const Item: React.FC<ItemProps> = props => {
  const { state, dispatch } = useContext(ReducerContext);
  const ref = useRef<HTMLDivElement>(null);

  const { data, index, children, move, onDrop } = props;
  const { type, _id } = data;

  const [{ isOverCurrent }, drop] = useDrop({
    accept: Object.values(CompType),
    hover(item: DropItem, monitor: DropTargetMonitor) {
      if (!ref.current) return;

      const dragIndex = item.index; // TODO: 使用id
      const hoverIndex = index;

      // 如果放置位置与初始位置相同则不处理
      if (dragIndex === hoverIndex) return;

      // hover 元素
      const hoverBoundingRect = ref.current!.getBoundingClientRect();
      // 计算 hover 元素中间高度
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      // 边界值
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      move(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
    drop(item: DropItem, monitor: DropTargetMonitor) {
      onDrop(item.data, data._id);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOverCurrent: monitor.isOver(),
    }),
  });

  // 拖拽处理
  const [{ isDragging }, drag] = useDrag({
    item: { type, index, data },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // 选中组件
  const handleChoose = (id: string) =>
    dispatch({ type: 'setCurrentComponent', payload: id });

  // 移除组件
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
      style={{ opacity, backgroundColor: isOverCurrent ? 'green' : '#ffffff' }}
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
      {children}
    </div>
  );
};

export default Item;
