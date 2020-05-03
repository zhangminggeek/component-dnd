import { StateInterface } from './state';
import createComponent, { ComponentInstance } from '../components/Config/rules';

interface ActionInterface {
  type: string;
  payload?: any;
}

const updateComp = (
  origin: Array<ComponentInstance>,
  values: ComponentInstance
) => {
  const index = origin.findIndex(item => item._id === values._id);
  const newData = [...origin];
  newData.splice(index, 1, values);
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
    case 'reset':
      return {
        ...state,
        data: [],
        cur: '',
      };
    case 'setCurrentComponent': // 修改当前操作组件
      return {
        ...state,
        cur: action.payload,
      };
    default:
      throw new Error('Unexpected action');
  }
}
