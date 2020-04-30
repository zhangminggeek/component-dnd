import React, { useReducer } from 'react';
import { reducer, initState, StateInterface } from '../store';

interface ContextInterface {
  state: StateInterface;
  dispatch: any;
}

const context: ContextInterface = {
  state: {
    data: [],
  },
  dispatch: () => {},
};

export const ReducerContext = React.createContext(context);

interface ReducerWrapperProps {
  children?: React.ReactNode;
}

const ReducerWrapper: React.FC<ReducerWrapperProps> = props => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ReducerContext.Provider>
  );
};

export default ReducerWrapper;
