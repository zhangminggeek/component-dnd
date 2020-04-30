import { CompType } from '../Lib/libs';
import { v4 as uuidv4 } from 'uuid';

interface ConfigInterface {
  field?: string; // 字段名 // TODO: 分离 Form/FormItem 组件后，该属性移动到 FormItem 中
  type?: string; // 组件类型
  label?: string; // 表单 label // TODO: 分离 Form/FormItem 组件后，该属性移动到 FormItem 中
  required?: boolean; // 必填
}

interface Rules {
  [key: string]: ConfigInterface;
}

const rules: Rules = {
  [CompType.INPUT]: {
    field: '',
    type: CompType.INPUT,
    label: '',
    required: false,
  },
  [CompType.RADIO]: {
    field: '',
    type: CompType.RADIO,
    label: '',
    required: false,
  },
  [CompType.CHECKBOX]: {
    field: '',
    type: CompType.CHECKBOX,
    label: '',
    required: false,
  },
  [CompType.BUTTON]: {
    field: '',
    type: CompType.BUTTON,
    label: '',
    required: false,
  },
};

export default function createComponent(type: string): object {
  return {
    ...rules[type],
    _id: uuidv4(),
  };
}
