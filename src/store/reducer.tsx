import { StateInterface } from './state';
import createComponent, { ComponentInstance } from '../components/Config/rules';
import _ from 'lodash';
import { move, traverseNodes, traverseFilterNodes } from '../utils';

interface ActionInterface {
  type: string;
  payload?: any;
}

function removeComp(origin: Array<ComponentInstance>, id: string) {
  const newData = _.cloneDeep(origin);
  traverseFilterNodes(newData, '_id')(id);
  return newData;
}

// 更新当前操作组件数据
function updateComp(
  origin: Array<ComponentInstance>,
  values: ComponentInstance
) {
  const index = origin.findIndex(item => item._id === values._id);
  const newData = _.cloneDeep(origin);
  newData.splice(index, 1, values);
  return newData;
}

// 移动组件
function moveComp(
  origin: Array<ComponentInstance>,
  dragIndex: number,
  targetIndex: number
) {
  const newData = _.cloneDeep(origin);
  move(newData, dragIndex, targetIndex);
  return newData;
}

// 放置组件
function dropComp(
  origin: Array<ComponentInstance>,
  dragItem: ComponentInstance,
  target: ComponentInstance
) {
  let newData = _.cloneDeep(origin);
  newData = removeComp(newData, dragItem._id);
  // 递归找到放置节点后往 children 中加入拖拽节点
  traverseNodes(newData)((node: ComponentInstance) => {
    if (node._id === target._id) {
      // 修改父id
      dragItem.parentId = target._id || null;
      // 修改层级
      dragItem.level = (target.level || 0) + 1;
      node.children && node.children.push(dragItem);
    }
  });
  return newData;
}

export default function reducer(
  state: StateInterface,
  action: ActionInterface
): StateInterface {
  switch (action.type) {
    case 'add': // 添加
      return {
        ...state,
        data: [...state.data, createComponent(action.payload)],
      };
    case 'update': // 更新配置
      return {
        ...state,
        data: updateComp(state.data, action.payload),
      };
    case 'sort': // 排序
      return {
        ...state,
        data: moveComp(
          state.data,
          action.payload.dragIndex,
          action.payload.targetIndex
        ),
      };
    case 'drop': // 放置
      return {
        ...state,
        data: dropComp(
          state.data,
          action.payload.dragItem,
          action.payload.target
        ),
      };
    case 'reset': // 重置
      return {
        ...state,
        data: [],
        cur: null,
      };
    case 'setCurrentComponent': // 修改当前操作组件
      return {
        ...state,
        cur: action.payload,
      };
    case 'remove': // 移除组件
      return {
        ...state,
        cur: action.payload === state.cur ? null : state.cur,
        data: removeComp(state.data, action.payload),
      };
    default:
      throw new Error('Unexpected action');
  }
}
