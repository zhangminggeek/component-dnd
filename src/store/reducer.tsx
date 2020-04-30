import { StateInterface } from './state';
import createComponent from '../components/Config/rules';

interface ActionInterface {
  type: string;
  payload?: any;
}

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
    case 'reset':
      return {
        ...state,
        data: [],
      };
    default:
      throw new Error('Unexpected action');
  }
}
