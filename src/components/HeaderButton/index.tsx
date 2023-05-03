import React from "react"
import { Col, Button, Upload, Tooltip } from "antd"
import { ButtonProps } from "antd/lib/button";
import { Link } from 'react-router-dom';
import { UploadProps } from "antd/es/upload/interface";
import { LoadingOutlined } from "@ant-design/icons";
import { ColProps } from "antd/es/grid/col";

interface HeaderButtonProps {
  color?: string;
  link?: string;
  loading?: boolean;
  icon?: JSX.Element;
  label?: JSX.Element | string;
  labelOnLoading?: JSX.Element | string;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  uploadProps?: UploadProps;
  hidden?: boolean;
  tooltip?: string;
  circle?: boolean;
  form?: string;
  htmlType?: "button" | "submit" | "reset";
  colPros?: ColProps;
  buttonStyle?: any;
  buttonPros?: ButtonProps;
}

export const HeaderButton: React.FunctionComponent<HeaderButtonProps> = props => {
  const uploadReference = React.createRef<HTMLElement>();

  return (
    <Col xs={24} sm={12} md={8} lg={6}
      style={{
        padding: '10px',
        display: props.hidden ? 'none' : ''
      }} {...props.colPros}
    >
      <Tooltip title={props.tooltip ? props.tooltip : ''}>
        <Button
          style={!props.circle ? {
            width: '100%',
            backgroundColor: props.color,
            color: 'white',
            borderRadius: '5px',
            ...props.buttonStyle
          } : {}}
          shape={props.circle ? "circle" : undefined}
          type="primary"
          form={props.form}
          onClick={props.uploadProps ? () => uploadReference?.current?.click() : props.onClick}
          htmlType={props.htmlType}
          {...props.buttonPros}
        >
          {props.link ?
            <Link to={props.link}>
              {!props.loading ? <span style={{ marginRight: props.label ? '10px' : '0px' }}>{props.icon}</span> : <LoadingOutlined style={{ marginRight: props.label ? '10px' : '0px' }} />}
              {props.loading && props.labelOnLoading ? props.labelOnLoading : props.label}
            </Link> :
            <>
              {!props.loading ? <span style={{ marginRight: props.label ? '10px' : '0px' }}>{props.icon}</span> : <LoadingOutlined style={{ marginRight: props.label ? '10px' : '0px' }} />}
              {props.loading && props.labelOnLoading ? props.labelOnLoading : props.label}
            </>
          }
        </Button>
      </Tooltip>
      <Upload {...props.uploadProps}>
        <Button ref={uploadReference} style={{ display: 'none' }} />
      </Upload>
    </Col>
  );
};

export default HeaderButton;
