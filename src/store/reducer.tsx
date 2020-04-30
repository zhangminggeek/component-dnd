import { StateInterface } from './state';

interface ActionInterface {
  type: string;
  payload?: Object;
}

export default function reducer(
  state: StateInterface,
  action: ActionInterface
): StateInterface {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        data: [...state.data, action.payload],
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
