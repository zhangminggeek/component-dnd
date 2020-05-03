import React from 'react';
import { Input, Radio } from 'antd';

interface Info {
  label: string;
  render: React.ReactNode;
}

export function factory(type: string): Info | undefined {
  switch (type) {
    case 'field':
      return {
        label: '字段名',
        render: <Input autoComplete="off" />,
      };
    case 'label':
      return {
        label: '标题',
        render: <Input autoComplete="off" />,
      };
    case 'required':
      return {
        label: '是否必填',
        render: (
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        ),
      };
    default:
      break;
  }
}
