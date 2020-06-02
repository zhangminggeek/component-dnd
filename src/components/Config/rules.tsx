import { CompType } from '../Lib/libs';
import { v4 as uuidv4 } from 'uuid';

export interface ConfigInterface {
  field?: string; // 字段名 // TODO: 分离 Form/FormItem 组件后，该属性移动到 FormItem 中
  label?: string; // 表单 label // TODO: 分离 Form/FormItem 组件后，该属性移动到 FormItem 中
  required?: boolean; // 必填
}

interface Rules {
  [key: string]: ConfigInterface;
}

const rules: Rules = {
  [CompType.INPUT]: {
    field: 'input field',
    label: 'input label',
    required: false,
  },
  [CompType.RADIO]: {
    field: 'radio field',
    label: 'radio label',
    required: false,
  },
  [CompType.CHECKBOX]: {
    field: 'checkbox field',
    label: 'checkbox label',
    required: false,
  },
  [CompType.BUTTON]: {
    field: '',
    label: '',
    required: false,
  },
};

export interface ComponentInstance extends ConfigInterface {
  _id: string;
  type: string;
  ele: ConfigInterface;
  children?: Array<ComponentInstance>;
  parentId: string | null;
  level: number;
}

export default function createComponent(type: string): ComponentInstance {
  return {
    _id: uuidv4(),
    type,
    ele: { ...rules[type] },
    children: [],
    parentId: null,
    level: 1,
  };
}
