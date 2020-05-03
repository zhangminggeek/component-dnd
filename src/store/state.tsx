import { ComponentInstance } from '../components/Config/rules';

export interface StateInterface {
  data: Array<ComponentInstance>;
  cur?: string; // 当前操作组件 id
}

export default {
  data: [],
  cur: '',
};
