import { CompType } from '../Lib/libs';

interface ConfigInterface {
  field: string; // 字段名
  type: string; // 组件类型
  label?: string; // 表单 label // TODO: 分离 Form/FormItem 组件后，该属性移动到 FormItem 中
  required?: boolean; // 必填
}

export const initInput: ConfigInterface = {
  field: '',
  type: CompType.INPUT,
  label: '',
  required: false,
};
