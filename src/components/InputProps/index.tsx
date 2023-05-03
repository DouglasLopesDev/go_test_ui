import React, { CSSProperties } from "react"
import { Col, Input, Form, InputNumber, Select, Row } from "antd"
import { IInputProps } from "./generics"
import createProjectInputsProps from "./project";
import { IProject } from "@/pages/projects/data";
import colors from "@/models/colors";

const { TextArea } = Input;
const { Option } = Select;

interface CreateInputsProps {
  formType?: "project" | "scenario"
  mode?: "new" | "edit";
  inputValue?: IProject;// | proximaInterface;
  readonly?: boolean;
  selectOptions?: { name: string, options?: SelectOption[] }[];
  rowStyle?: CSSProperties;
}

export interface SelectOption {
  key?: string
  value: string
}

export const createOptions = (options?: SelectOption[]) => {
  if (options) {
    return options.map((option: SelectOption) => <Option key={option.key} value={option.value}>{option.value}</Option>)
  }
  return []
}

export const CreateInputs: React.FunctionComponent<CreateInputsProps> = (componentProps) => {
  var props

  switch (componentProps.formType) {
    case 'project':
      props = createProjectInputsProps(componentProps.inputValue as IProject)
      break;

    default:
      break;
  }


  const inputFactory = (prop: IInputProps) => {
    switch (prop.type) {
      case 'string':
        return <Input
          style={{ width: "100%", borderRadius: '5px' }}
          disabled={(prop.readOnly && componentProps.mode === "edit") || componentProps.readonly}
          onKeyPress={prop.onKeyPress}
          maxLength={prop.maxLength}
          autoComplete="off"
        />
      case 'number':
        return (
          <InputNumber
            precision={prop.precision}
            style={{ width: '100%', borderRadius: '5px' }}
            decimalSeparator={prop.decimalSeparator}
            disabled={prop.readOnly && componentProps.mode === 'edit' || componentProps.readonly}
            onKeyDown={prop.onKeyDown}
            autoComplete="off"
            min={prop.min}
            max={prop.max}
          />
        );
      case 'text':
        return (
          <TextArea
            style={{ width: '100%', borderRadius: '5px', height: '100px' }}
            disabled={prop.readOnly && componentProps.mode === 'edit' || componentProps.readonly}
            onKeyPress={prop.onKeyPress}
          />
        );
      case 'combo':
        const options = componentProps.selectOptions?.find(option => option.name === prop.name)?.options

        return (
          <Select loading={!options}
            style={{ borderRadius: '5px' }}
            disabled={prop.readOnly && componentProps.mode === 'edit' || componentProps.readonly}
            defaultValue={prop.initialValue}
          >
            {createOptions(options)}
          </Select>
        );
      default:
        return <></>;
    }
  };

  return (
    <Row
      justify={'start'}
      align={'top'}
      style={{ backgroundColor: colors.white, padding: '20px', ...componentProps.rowStyle }}
    >
      {props?.map((prop) => (
        <Col
          xs={prop.span.xs ? prop.span.xs : 24}
          sm={prop.span.sm ? prop.span.sm : 24}
          md={prop.span.md ? prop.span.md : 24}
          lg={prop.span.lg ? prop.span.lg : 24}
        >
          <Form.Item
            style={{ display: 'flex', width: '100%', margin: '2px', padding: '4px' }}
            label={prop.label}
            name={prop.name}
            initialValue={prop.initialValue}
            // rules={prop.rules}
            rules={(prop.readOnly && componentProps.mode === "edit") || componentProps.readonly ? undefined : prop.rules}
          >
            {inputFactory(prop)}
          </Form.Item>
        </Col>
      ))}
    </Row>
  );
};

export default CreateInputs;
