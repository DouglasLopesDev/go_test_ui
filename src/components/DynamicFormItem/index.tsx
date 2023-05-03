import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Col, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import colors from '@/models/colors';
import { ColProps } from 'antd/lib/col';
import { Rule } from 'antd/es/form';

export interface DynamicFormItemProps {
  values: string[];
  setValues: (newValues: string[]) => void;
  buttonText: string;
  formListName: string;
  readonly?: boolean;
  fieldsTitle?: string;
  placeholderInput?: string;
  colPros?: ColProps;
  rules?: Rule[];
}

const DynamicFormItem: React.FC<DynamicFormItemProps> = (props) => {
  const { setValues } = props;
  const [values, setValuesDynamic] = useState<string[]>(props.values);

  useEffect(() => {
    if(values)
      setValuesDynamic([...values])
  },[props.values])

  const updateValues = (values: string[]) => {
    setValues(values);
    setValuesDynamic(values);
  };


  const addValues = (index?: number, value?: string) => {
    if (values) {
      if (index !== undefined && index >= 0 && value !== undefined) {
        values[index] = value;
        return updateValues([...values])
      }
      return updateValues([...values, '']);
    }
    return;
  };

  return (

    <Row
      justify={'start'}
      align={'top'}
      style={{
        padding: '20px',
        backgroundColor: colors.white
      }}
    >

      <Col xs={24} sm={24} md={24} lg={24}{...props.colPros}>
        <Form.List name={props.formListName}>
          {(fields, { add, remove }) => {
            if (fields && fields.length === 0) {
              if (values && values.length > 0)
                values.map((value) => add(value));
            }
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item label={index === 0 ? props.fieldsTitle : ''} required={false} key={field.key}>
                    <Form.Item {...field} rules={props.rules} validateTrigger={['onChange', 'onBlur']} noStyle>
                      <Input
                        placeholder={props.placeholderInput}
                        style={{ margin: '0px', width: '100%' }}
                        onChange={(event) => addValues(field.name, event.target.value)}
                        disabled={props.readonly}
                      />
                    </Form.Item>
                    {fields.length > 0 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        style={{
                          position: 'absolute',
                          left: '98%',
                          bottom: '80%',
                          color: colors.red,
                          backgroundColor: colors.white,
                          display: props.readonly ? 'none' : '',
                        }}
                        onClick={() => {
                          remove(field.name);
                          updateValues(values.filter((_, index) => field.name !== index));
                        }}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => {
                      add();
                      addValues();
                    }}
                    style={{
                      display: props.readonly ? 'none' : '',
                      margin: fields.length ? '0px' : '20px 0px',
                      width: '100%',
                      color: colors.green,
                      backgroundColor: colors.white,
                      border: `1px solid ${colors.green}`,
                    }}
                  >
                    <PlusOutlined /> {props.buttonText}
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Col>
    </Row>
  );
};

export default DynamicFormItem;
