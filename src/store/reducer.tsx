import { StateInterface } from './state';
import createComponent, { ComponentInstance } from '../components/Config/rules';
import _ from 'lodash';
import { move } from '../utils';

interface ActionInterface {
  type: string;
  payload?: any;
}

// 更新当前操作组件数据
const updateComp = (
  origin: Array<ComponentInstance>,
  values: ComponentInstance
) => {
  const index = origin.findIndex(item => item._id === values._id);
  const newData = _.cloneDeep(origin);
  newData.splice(index, 1, values);
  return newData;
};

// 移动组件
const moveComp = (
  origin: Array<ComponentInstance>,
  dragIndex: number,
  targetIndex: number
) => {
  const newData = _.cloneDeep(origin);
  move(newData, dragIndex, targetIndex);
  return newData;
};

export default function reducer(
  state: StateInterface,
  action: ActionInterface
): StateInterface {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        data: [...state.data, createComponent(action.payload)],
      };
    case 'update':
      return {
        ...state,
        data: updateComp(state.data, action.payload),
      };
    case 'move':
      return {
        ...state,
        data: moveComp(
          state.data,
          action.payload.dragIndex,
          action.payload.targetIndex
        ),
      };
    case 'reset':
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
    case 'remove':
      return {
        ...state,
        cur: action.payload === state.cur ? null : state.cur,
        data: state.data.filter(item => item._id !== action.payload),
      };
    default:
      throw new Error('Unexpected action');
  }
}
